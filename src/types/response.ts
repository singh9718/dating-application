export type ResponseAnswers = Record<string, string | number | null>;

export interface Response {
  id: string;
  session_id: string;
  answers: ResponseAnswers;
  submitted_at: string;
}

export interface SubmitResponseInput {
  session_code: string;
  answers: ResponseAnswers;
}
