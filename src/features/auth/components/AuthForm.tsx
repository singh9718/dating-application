'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { SocialAuthButtons } from './SocialAuthButtons';
import { signInWithEmail } from '@/actions/authActions';

export function AuthForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    const result = await signInWithEmail(email);
    setLoading(false);
    if (result.code === 'success') {
      setSent(true);
    } else {
      setError(result.message);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-6">
        <div className="flex size-14 items-center justify-center rounded-full bg-rose-100 mx-auto mb-4">
          <Mail className="size-7 text-rose-600" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">Check your email</h3>
        <p className="text-sm text-muted-foreground">
          We sent a magic link to <strong>{email}</strong>. Click it to sign in.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SocialAuthButtons />

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">or continue with email</span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
        <Button type="submit" className="w-full" variant="gradient" loading={loading}>
          <Mail className="size-4" />
          Send magic link
        </Button>
      </form>
    </div>
  );
}
