import type { ResponseAnswers } from '@/types/response';
import type { Template } from '@/types/template';

export function formatAnswer(questionId: string, value: unknown, template: Template): string {
  const question = template.questions.find((q) => q.id === questionId);
  if (!question || value == null || value === '') return '—';

  if (question.type === 'range' && typeof value === 'number') {
    return `${question.unit ?? ''}${value.toLocaleString('en-IN')}`;
  }

  if (question.options && typeof value === 'string') {
    const option = question.options.find((o) => o.value === value);
    if (option) return option.emoji ? `${option.emoji} ${option.label}` : option.label;
  }

  return String(value);
}

export function parseAnswers(raw: unknown): ResponseAnswers {
  if (typeof raw !== 'object' || raw === null) return {};
  return raw as ResponseAnswers;
}
