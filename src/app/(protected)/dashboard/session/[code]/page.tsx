import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { SessionRepository } from '@/repositories/sessionRepository';
import { ResponseRepository } from '@/repositories/responseRepository';
import { SessionService } from '@/services/sessionService';
import { ResponseService } from '@/services/responseService';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyLinkButton } from '@/components/shared/CopyLinkButton';
import { EmptyState } from '@/components/shared/EmptyState';
import { ResponseCard } from '@/features/dashboard/components/ResponseCard';
import type { SessionStatus } from '@/types/session';
import { formatDate } from '@/utils/dates';
import { buildShareUrl } from '@/utils/sessionCode';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Session Details' };

const STATUS_VARIANT: Record<SessionStatus, 'draft' | 'shared' | 'submitted' | 'closed' | 'expired'> = {
  draft: 'draft', shared: 'shared', submitted: 'submitted', closed: 'closed', expired: 'expired',
};

interface PageProps {
  params: Promise<{ code: string }>;
}

export default async function SessionDetailPage({ params }: PageProps) {
  const { code } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const sessionRepo = new SessionRepository(supabase);
  const responseRepo = new ResponseRepository(supabase);
  const sessionService = new SessionService(sessionRepo, responseRepo);
  const responseService = new ResponseService(sessionRepo, responseRepo);

  const [sessionResult, responsesResult] = await Promise.all([
    sessionService.getSessionDetail(code, user.id),
    responseService.getBySession(code, user.id),
  ]);

  if (sessionResult.code === 'not_found' || sessionResult.code === 'forbidden') notFound();
  if (sessionResult.code !== 'success' || !sessionResult.data) notFound();

  const session = sessionResult.data;
  const responses = responsesResult.code === 'success' ? (responsesResult.data ?? []) : [];
  const shareUrl = buildShareUrl(session.code);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" aria-label="Back to dashboard">
          <Link href={ROUTES.dashboard}><ArrowLeft className="size-4" /></Link>
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={STATUS_VARIANT[session.status]}>
              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
            </Badge>
            <span className="text-xs text-muted-foreground">{formatDate(session.created_at)}</span>
          </div>
          <h1 className="text-xl font-bold text-foreground truncate">{session.title}</h1>
          {session.description && (
            <p className="text-sm text-muted-foreground mt-0.5">{session.description}</p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-muted/30 p-5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Share link</p>
        <div className="font-mono text-sm text-muted-foreground break-all mb-3">{shareUrl}</div>
        <div className="flex gap-2">
          <CopyLinkButton url={shareUrl} />
          <Button asChild variant="outline" size="sm">
            <a href={shareUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-3.5" />
              Open form
            </a>
          </Button>
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-foreground mb-4">
          Responses <span className="text-muted-foreground font-normal">({responses.length})</span>
        </h2>
        {responses.length === 0 ? (
          <EmptyState
            icon="⏳"
            title="Waiting for a response"
            description="Share the link with your partner. Their answers will appear here once submitted."
          />
        ) : (
          <div className="space-y-4">
            {responses.map((r) => (
              <ResponseCard key={r.id} response={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
