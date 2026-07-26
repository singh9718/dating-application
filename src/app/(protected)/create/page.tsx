import type { Metadata } from 'next';
import { CreateSessionForm } from '@/features/dashboard/components/CreateSessionForm';

export const metadata: Metadata = { title: 'Create Session' };

export default function CreatePage() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Create a new session</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Fill in the details below. You&apos;ll get a shareable link to send to your partner.
        </p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <CreateSessionForm />
      </div>
    </div>
  );
}
