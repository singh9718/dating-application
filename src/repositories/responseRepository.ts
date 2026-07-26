import type { SupabaseClient } from '@supabase/supabase-js';
import type { Response, ResponseAnswers } from '@/types/response';

export class ResponseRepository {
  constructor(private readonly db: SupabaseClient) {}

  async submit(sessionId: string, answers: ResponseAnswers): Promise<Response> {
    const { data, error } = await this.db
      .from('responses')
      .insert({ session_id: sessionId, answers })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Response;
  }

  async findBySession(sessionId: string): Promise<Response[]> {
    const { data, error } = await this.db
      .from('responses')
      .select('*')
      .eq('session_id', sessionId)
      .order('submitted_at', { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as Response[];
  }

  async findById(id: string): Promise<Response | null> {
    const { data, error } = await this.db
      .from('responses')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data as Response | null;
  }
}
