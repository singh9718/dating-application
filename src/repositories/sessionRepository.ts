import type { SupabaseClient } from '@supabase/supabase-js';
import type { Session, CreateSessionInput, UpdateSessionInput } from '@/types/session';

export class SessionRepository {
  constructor(private readonly db: SupabaseClient) {}

  async create(userId: string, input: CreateSessionInput & { code: string }): Promise<Session> {
    const { data, error } = await this.db
      .from('sessions')
      .insert({
        user_id: userId,
        code: input.code,
        title: input.title,
        description: input.description ?? null,
        status: 'shared',
        expires_at: input.expires_at ?? null,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Session;
  }

  async findById(id: string): Promise<Session | null> {
    const { data, error } = await this.db
      .from('sessions')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data as Session | null;
  }

  async findByCode(code: string): Promise<Session | null> {
    const { data, error } = await this.db
      .from('sessions')
      .select('*')
      .eq('code', code)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data as Session | null;
  }

  async listByUser(userId: string): Promise<Session[]> {
    const { data, error } = await this.db
      .from('sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as Session[];
  }

  async update(id: string, input: UpdateSessionInput): Promise<Session> {
    const { data, error } = await this.db
      .from('sessions')
      .update(input)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Session;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.db.from('sessions').delete().eq('id', id);
    if (error) throw new Error(error.message);
  }
}
