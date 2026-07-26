import Link from 'next/link';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background py-10">
      <div className="container flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Heart className="size-4 fill-rose-500 text-rose-500" aria-hidden="true" />
          DateFlow
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Plan meaningful dates. Build lasting memories.
        </p>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/" className="hover:text-foreground transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
