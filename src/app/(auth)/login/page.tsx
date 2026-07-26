import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { AuthForm } from '@/features/auth/components/AuthForm';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Sign in' };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-muted/30">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href={ROUTES.home} className="inline-flex items-center gap-2 font-bold text-foreground mb-6">
            <Heart className="size-5 fill-rose-500 text-rose-500" />
            <span className="text-xl">DateFlow</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to manage your date sessions.</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <AuthForm />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By signing in you agree to our{' '}
          <Link href="/" className="underline hover:text-foreground">Terms</Link>{' '}
          and{' '}
          <Link href="/" className="underline hover:text-foreground">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
