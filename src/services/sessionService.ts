import type { Session, CreateSessionInput, SessionWithResponseCount } from '@/types/session';
import type { ActionResult } from '@/types/result';
import { ok, err } from '@/types/result';
import type { SessionRepository } from '@/repositories/sessionRepository';
import type { ResponseRepository } from '@/repositories/responseRepository';
import { generateSessionCode, buildShareUrl } from '@/utils/sessionCode';
import { isExpired } from '@/utils/dates';

export interface CreateSessionResult {
  session: Session;
  shareUrl: string;
}

export class SessionService {
  constructor(
    private readonly sessions: SessionRepository,
    private readonly responses: ResponseRepository,
  ) {}

  async create(
    userId: string,
    input: CreateSessionInput,
  ): Promise<ActionResult<CreateSessionResult>> {
    try {
      const code = generateSessionCode();
      const session = await this.sessions.create(userId, { ...input, code });
      const shareUrl = buildShareUrl(code);
      return ok({ session, shareUrl });
    } catch {
      return err('internal_error', 'Failed to create session. Please try again.');
    }
  }

  async getByCode(code: string): Promise<ActionResult<Session>> {
    try {
      const session = await this.sessions.findByCode(code);
      if (!session) return err('not_found', 'Session not found.');
      if (isExpired(session.expires_at)) return err('forbidden', 'This session has expired.');
      return ok(session);
    } catch {
      return err('internal_error', 'Failed to load session.');
    }
  }

  async listByUser(userId: string): Promise<ActionResult<SessionWithResponseCount[]>> {
    try {
      const sessions = await this.sessions.listByUser(userId);
      const withCounts = await Promise.all(
        sessions.map(async (s) => {
          const responses = await this.responses.findBySession(s.id);
          return { ...s, response_count: responses.length };
        }),
      );
      return ok(withCounts);
    } catch {
      return err('internal_error', 'Failed to load sessions.');
    }
  }

  async getSessionDetail(
    code: string,
    userId: string,
  ): Promise<ActionResult<SessionWithResponseCount>> {
    try {
      const session = await this.sessions.findByCode(code);
      if (!session) return err('not_found', 'Session not found.');
      if (session.user_id !== userId) return err('forbidden', 'Access denied.');
      const responses = await this.responses.findBySession(session.id);
      return ok({ ...session, response_count: responses.length });
    } catch {
      return err('internal_error', 'Failed to load session.');
    }
  }

  async delete(id: string, userId: string): Promise<ActionResult<void>> {
    try {
      const session = await this.sessions.findById(id);
      if (!session) return err('not_found', 'Session not found.');
      if (session.user_id !== userId) return err('forbidden', 'Access denied.');
      await this.sessions.delete(id);
      return ok(undefined);
    } catch {
      return err('internal_error', 'Failed to delete session.');
    }
  }
}
