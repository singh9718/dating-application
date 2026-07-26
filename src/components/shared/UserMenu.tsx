import Link from 'next/link';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createClient } from '@/lib/supabase/server';
import { ROUTES } from '@/constants/routes';
import { signOut } from '@/actions/authActions';

export async function UserMenu() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const name = (user.user_metadata?.full_name as string | undefined) ?? user.email ?? '';
  const avatar = user.user_metadata?.avatar_url as string | undefined;
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n: string) => n[0])
    .join('')
    .toUpperCase() || '?';

  return (
    <div className="flex items-center gap-2">
      <Link
        href={ROUTES.dashboard}
        className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      >
        <LayoutDashboard className="size-4" />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>

      <form action={signOut}>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Sign out"
        >
          <LogOut className="size-4" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </form>

      <Avatar className="size-8">
        {avatar && <AvatarImage src={avatar} alt={name} />}
        <AvatarFallback className="bg-rose-100 text-rose-700 text-xs">{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
}
