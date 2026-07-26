import type { Metadata } from 'next';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { SessionForm } from '@/features/session/components/SessionForm';
import { ErrorState } from '@/components/shared/ErrorState';
import { createClient } from '@/lib/supabase/server';
import { SessionRepository } from '@/repositories/sessionRepository';
import { ResponseRepository } from '@/repositories/responseRepository';
import { SessionService } from '@/services/sessionService';

export const metadata: Metadata = { title: 'Date Preferences' };

interface PageProps {
  params: Promise<{ code: string }>;
}

export default async function PublicSessionPage({ params }: PageProps) {
  const { code } = await params;
  const supabase = await createClient();
  const service = new SessionService(
    new SessionRepository(supabase),
    new ResponseRepository(supabase),
  );
  const result = await service.getByCode(code);

  return (
    <>
      <Navbar />
      <main className="flex-1 container max-w-2xl py-12 px-4">
        {result.code === 'not_found' ? (
          <ErrorState title="Session not found" message="This link is invalid or has been removed." />
        ) : result.code === 'forbidden' ? (
          <ErrorState title="Session expired" message="This date planning session has expired." />
        ) : result.code !== 'success' || !result.data ? (
          <ErrorState title="Something went wrong" message="Unable to load the session. Please try again." />
        ) : result.data.status === 'submitted' ? (
          <ErrorState
            title="Already submitted"
            message="A response has already been submitted for this session."
          />
        ) : result.data.status === 'closed' ? (
          <ErrorState title="Session closed" message="This session is no longer accepting responses." />
        ) : (
          <div>
            <div className="text-center mb-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-rose-500 mb-2">
                Date planning
              </p>
              <h1 className="text-3xl font-bold text-foreground mb-3">{result.data.title}</h1>
              {result.data.description && (
                <p className="text-muted-foreground">{result.data.description}</p>
              )}
            </div>
            <SessionForm sessionCode={code} />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
