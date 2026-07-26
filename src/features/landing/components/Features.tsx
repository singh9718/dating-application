import { Link2, FormInput, Eye } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: FormInput,
    title: 'Create a session',
    description:
      'Sign in and create a date-planning session in seconds. Add a title, optional expiry, and get a unique link.',
  },
  {
    step: '02',
    icon: Link2,
    title: 'Share the link',
    description:
      'Send the link to your partner. No sign-up required on their end — they just open and fill the form.',
  },
  {
    step: '03',
    icon: Eye,
    title: 'See the results',
    description:
      'Once submitted, view your partner\'s preferences from your dashboard and start planning the perfect date.',
  },
];

export function Features() {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-500 mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Three steps to a perfect date</h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {STEPS.map(({ step, icon: Icon, title, description }) => (
            <div key={step} className="relative flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black text-border">{step}</span>
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
