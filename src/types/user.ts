export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface UpdateUserInput {
  name?: string;
  avatar_url?: string;
}
