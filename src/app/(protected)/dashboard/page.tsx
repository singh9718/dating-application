import type { Metadata } from 'next';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { SessionRepository } from '@/repositories/sessionRepository';
import { ResponseRepository } from '@/repositories/responseRepository';
import { SessionService } from '@/services/sessionService';
import { SessionCard } from '@/components/shared/SessionCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const service = new SessionService(
    new SessionRepository(supabase),
    new ResponseRepository(supabase),
  );
  const result = await service.listByUser(user.id);
  const sessions = result.code === 'success' ? (result.data ?? []) : [];
  const name = (user.user_metadata?.full_name as string | undefined)?.split(' ')[0] ?? 'there';

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hey, {name} 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your date sessions below.</p>
        </div>
        <Button asChild variant="gradient" size="sm">
          <Link href={ROUTES.create}>
            <Plus className="size-4" />
            New session
          </Link>
        </Button>
      </div>

      {sessions.length === 0 ? (
        <EmptyState
          icon="💌"
          title="No sessions yet"
          description="Create your first session and share it with your partner."
          action={{ label: 'Create session', href: ROUTES.create }}
        />
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
}
