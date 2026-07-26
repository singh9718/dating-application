import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { signOut } from '@/actions/authActions';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Settings' };

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const name = (user.user_metadata?.full_name as string | undefined) ?? '';
  const avatar = user.user_metadata?.avatar_url as string | undefined;
  const initials = name.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toUpperCase() || '?';

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
          <CardDescription>Your account information.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar className="size-14">
            {avatar && <AvatarImage src={avatar} alt={name} />}
            <AvatarFallback className="bg-rose-100 text-rose-700 text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div>
            {name && <p className="font-semibold text-foreground">{name}</p>}
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-base text-destructive">Sign out</CardTitle>
          <CardDescription>Sign out of your account on this device.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signOut}>
            <Button type="submit" variant="destructive" size="sm">Sign out</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
