'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { SessionRepository } from '@/repositories/sessionRepository';
import { ResponseRepository } from '@/repositories/responseRepository';
import { ResponseService } from '@/services/responseService';
import { dateResponseSchema } from '@/validations/responseSchema';
import type { ActionResult } from '@/types/result';
import { err } from '@/types/result';
import type { Response } from '@/types/response';

async function buildResponseService() {
  const supabase = await createClient();
  const sessionRepo = new SessionRepository(supabase);
  const responseRepo = new ResponseRepository(supabase);
  return new ResponseService(sessionRepo, responseRepo);
}

export async function submitResponseAction(
  sessionCode: string,
  answers: Record<string, unknown>,
): Promise<ActionResult<Response>> {
  const parsed = dateResponseSchema.safeParse(answers);
  if (!parsed.success) {
    return err('validation_error', parsed.error.errors[0].message);
  }

  const service = await buildResponseService();
  const result = await service.submit(sessionCode, parsed.data as Record<string, string | number | null>);

  if (result.code === 'success') {
    redirect(`/session/${sessionCode}/success`);
  }

  return result;
}

export async function getSessionResponsesAction(
  sessionCode: string,
): Promise<ActionResult<Response[]>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return err('unauthorized', 'You must be signed in.');

  const service = await buildResponseService();
  return service.getBySession(sessionCode, user.id);
}
