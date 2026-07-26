export type QuestionType =
  | 'text'
  | 'date'
  | 'time_select'
  | 'card_select'
  | 'chip_select'
  | 'range'
  | 'textarea';

export interface QuestionOption {
  value: string;
  label: string;
  emoji?: string;
  description?: string;
}

export interface Question {
  id: string;
  label: string;
  placeholder?: string;
  type: QuestionType;
  required: boolean;
  options?: QuestionOption[];
  min?: number;
  max?: number;
  step?: number;
  maxLength?: number;
  unit?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}
