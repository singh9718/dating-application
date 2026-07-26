import type { Response, ResponseAnswers } from '@/types/response';
import type { ActionResult } from '@/types/result';
import { ok, err } from '@/types/result';
import type { SessionRepository } from '@/repositories/sessionRepository';
import type { ResponseRepository } from '@/repositories/responseRepository';
import { isExpired } from '@/utils/dates';

export class ResponseService {
  constructor(
    private readonly sessions: SessionRepository,
    private readonly responses: ResponseRepository,
  ) {}

  async submit(
    sessionCode: string,
    answers: ResponseAnswers,
  ): Promise<ActionResult<Response>> {
    try {
      const session = await this.sessions.findByCode(sessionCode);
      if (!session) return err('not_found', 'Session not found.');
      if (isExpired(session.expires_at)) return err('forbidden', 'This session has expired.');
      if (session.status === 'closed') return err('forbidden', 'This session is closed.');
      if (session.status === 'submitted') return err('forbidden', 'A response has already been submitted.');

      const response = await this.responses.submit(session.id, answers);
      await this.sessions.update(session.id, { status: 'submitted' });
      return ok(response);
    } catch {
      return err('internal_error', 'Failed to submit response. Please try again.');
    }
  }

  async getBySession(
    sessionCode: string,
    userId: string,
  ): Promise<ActionResult<Response[]>> {
    try {
      const session = await this.sessions.findByCode(sessionCode);
      if (!session) return err('not_found', 'Session not found.');
      if (session.user_id !== userId) return err('forbidden', 'Access denied.');
      const responses = await this.responses.findBySession(session.id);
      return ok(responses);
    } catch {
      return err('internal_error', 'Failed to load responses.');
    }
  }
}
