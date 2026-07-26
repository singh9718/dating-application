import type { SupabaseClient } from '@supabase/supabase-js';
import type { User, UpdateUserInput } from '@/types/user';

export class UserRepository {
  constructor(private readonly db: SupabaseClient) {}

  async findById(id: string): Promise<User | null> {
    const { data, error } = await this.db
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data as User | null;
  }

  async upsert(user: Omit<User, 'created_at'>): Promise<User> {
    const { data, error } = await this.db
      .from('users')
      .upsert(user, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as User;
  }

  async update(id: string, input: UpdateUserInput): Promise<User> {
    const { data, error } = await this.db
      .from('users')
      .update(input)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as User;
  }
}
