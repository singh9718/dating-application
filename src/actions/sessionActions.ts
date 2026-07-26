'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { SessionRepository } from '@/repositories/sessionRepository';
import { ResponseRepository } from '@/repositories/responseRepository';
import { SessionService } from '@/services/sessionService';
import { createSessionSchema } from '@/validations/sessionSchema';
import type { ActionResult } from '@/types/result';
import { err } from '@/types/result';
import type { CreateSessionResult } from '@/services/sessionService';
import type { SessionWithResponseCount } from '@/types/session';

async function buildSessionService() {
  const supabase = await createClient();
  const sessionRepo = new SessionRepository(supabase);
  const responseRepo = new ResponseRepository(supabase);
  return new SessionService(sessionRepo, responseRepo);
}

export async function createSessionAction(
  formData: FormData,
): Promise<ActionResult<CreateSessionResult>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return err('unauthorized', 'You must be signed in.');

  const raw = {
    title: formData.get('title') as string,
    description: formData.get('description') as string | undefined,
    expires_at: formData.get('expires_at') as string | undefined,
  };

  const parsed = createSessionSchema.safeParse(raw);
  if (!parsed.success) {
    return err('validation_error', parsed.error.errors[0].message);
  }

  const service = await buildSessionService();
  return service.create(user.id, parsed.data);
}

export async function listSessionsAction(): Promise<ActionResult<SessionWithResponseCount[]>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return err('unauthorized', 'You must be signed in.');

  const service = await buildSessionService();
  return service.listByUser(user.id);
}

export async function getSessionDetailAction(
  code: string,
): Promise<ActionResult<SessionWithResponseCount>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return err('unauthorized', 'You must be signed in.');

  const service = await buildSessionService();
  return service.getSessionDetail(code, user.id);
}

export async function deleteSessionAction(id: string): Promise<ActionResult<void>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return err('unauthorized', 'You must be signed in.');

  const service = await buildSessionService();
  const result = await service.delete(id, user.id);
  if (result.code === 'success') redirect('/dashboard');
  return result;
}
