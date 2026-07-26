'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

const FAQS = [
  {
    q: 'Does my partner need to create an account?',
    a: 'No. Your partner never needs to sign up or log in. They simply open the unique link you share and fill in the form.',
  },
  {
    q: 'Is the data secure?',
    a: 'Yes. Responses are stored securely in your account. Only you (the session creator) can view the submitted responses.',
  },
  {
    q: 'Can the form be filled more than once?',
    a: "Each session accepts one response. Once submitted, the session is marked as complete. You can always create a new session if you'd like a fresh form.",
  },
  {
    q: 'Can I customise the questions?',
    a: 'The current default template covers all the key date-planning questions. Custom templates are coming soon.',
  },
  {
    q: 'Does the link expire?',
    a: 'You can optionally set an expiry date when creating a session. If no expiry is set, the link stays active until it receives a response or you close it.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container max-w-2xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-500 mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Common questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map(({ q, a }, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                aria-expanded={open === i}
              >
                {q}
                <ChevronDown
                  className={cn('size-4 shrink-0 text-muted-foreground transition-transform duration-200', open === i && 'rotate-180')}
                  aria-hidden="true"
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
