'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { ActionResult } from '@/types/result';
import { ok, err } from '@/types/result';
import { APP_URL } from '@/constants/config';

export async function signInWithGoogle(): Promise<ActionResult<{ url: string }>> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${APP_URL}/auth/callback` },
  });
  if (error) return err('internal_error', error.message);
  return ok({ url: data.url });
}

export async function signInWithGithub(): Promise<ActionResult<{ url: string }>> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: `${APP_URL}/auth/callback` },
  });
  if (error) return err('internal_error', error.message);
  return ok({ url: data.url });
}

export async function signInWithEmail(email: string): Promise<ActionResult<void>> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${APP_URL}/auth/callback` },
  });
  if (error) return err('internal_error', error.message);
  return ok(undefined, 'Check your email for a magic link.');
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}
