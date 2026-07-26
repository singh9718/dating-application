import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import { ROUTES } from '@/constants/routes';
import { UserMenu } from './UserMenu';

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="container flex h-16 items-center justify-between">
        <Link
          href={ROUTES.home}
          className="flex items-center gap-2 font-bold text-foreground"
          aria-label="DateFlow home"
        >
          <Heart className="size-5 fill-rose-500 text-rose-500" aria-hidden="true" />
          <span className="text-lg tracking-tight">DateFlow</span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <UserMenu />
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href={ROUTES.login}>Sign In</Link>
              </Button>
              <Button asChild variant="gradient" size="sm">
                <Link href={ROUTES.login}>Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
