export type SessionStatus = 'draft' | 'shared' | 'submitted' | 'closed' | 'expired';

export interface Session {
  id: string;
  user_id: string;
  code: string;
  title: string;
  description: string | null;
  status: SessionStatus;
  expires_at: string | null;
  created_at: string;
}

export interface CreateSessionInput {
  title: string;
  description?: string;
  expires_at?: string;
}

export interface UpdateSessionInput {
  title?: string;
  description?: string;
  status?: SessionStatus;
  expires_at?: string;
}

export interface SessionWithResponseCount extends Session {
  response_count: number;
}
