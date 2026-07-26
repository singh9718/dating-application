import { formatDateTime } from '@/utils/dates';
import { formatAnswer } from '@/utils/responses';
import type { Response } from '@/types/response';
import { DATE_PLANNING_TEMPLATE } from '@/constants/templates';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ResponseCardProps {
  response: Response;
}

export function ResponseCard({ response }: ResponseCardProps) {
  const questions = DATE_PLANNING_TEMPLATE.questions;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Response submitted</CardTitle>
        <p className="text-xs text-muted-foreground">{formatDateTime(response.submitted_at)}</p>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {questions.map((q) => (
            <div key={q.id}>
              <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {q.label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {formatAnswer(q.id, response.answers[q.id], DATE_PLANNING_TEMPLATE)}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
