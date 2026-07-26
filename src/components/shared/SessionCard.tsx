import Link from 'next/link';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SessionWithResponseCount, SessionStatus } from '@/types/session';
import { formatDate } from '@/utils/dates';
import { ROUTES } from '@/constants/routes';

const STATUS_VARIANT: Record<SessionStatus, 'draft' | 'shared' | 'submitted' | 'closed' | 'expired'> = {
  draft: 'draft',
  shared: 'shared',
  submitted: 'submitted',
  closed: 'closed',
  expired: 'expired',
};

interface SessionCardProps {
  session: SessionWithResponseCount;
}

export function SessionCard({ session }: SessionCardProps) {
  return (
    <Link href={ROUTES.dashboardSession(session.code)} className="group block">
      <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 border-border/60">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={STATUS_VARIANT[session.status]}>
                  {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                </Badge>
              </div>
              <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {session.title}
              </h3>
              {session.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  {session.description}
                </p>
              )}
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  {formatDate(session.created_at)}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="size-3.5" />
                  {session.response_count} {session.response_count === 1 ? 'response' : 'responses'}
                </span>
              </div>
            </div>
            <ArrowRight className="size-4 text-muted-foreground shrink-0 mt-1 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
