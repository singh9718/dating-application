import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';

export function CTA() {
  return (
    <section className="py-24">
      <div className="container max-w-3xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Ready to plan something special?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Create your first session in under a minute. Free to start, no credit card required.
        </p>
        <Button asChild variant="gradient" size="xl">
          <Link href={ROUTES.login}>
            Get started free
            <ArrowRight className="size-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
