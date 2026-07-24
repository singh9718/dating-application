'use server';

import { redirect } from 'next/navigation';

import { supabase } from '@/lib/supabase';
import { preferenceSchema } from '@/lib/validations';
import { PreferenceFormValues } from '@/lib/validations';

export async function submitPreference(data: PreferenceFormValues) {
  const parsed = preferenceSchema.safeParse(data);

  if (!parsed.success) {
    return { error: 'Invalid form data. Please check your inputs.' };
  }

  const { error } = await supabase.from('date_preferences').insert([
    {
      name: parsed.data.name,
      preferred_date: parsed.data.preferred_date,
      preferred_time: parsed.data.preferred_time,
      date_type: parsed.data.date_type,
      cuisine: parsed.data.cuisine,
      budget: parsed.data.budget,
      mood: parsed.data.mood,
      outfit: parsed.data.outfit,
      note: parsed.data.note ?? null,
    },
  ]);

  if (error) {
    return { error: 'Something went wrong. Please try again.' };
  }

  redirect('/thank-you');
}
