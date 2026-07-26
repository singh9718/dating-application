import { SESSION_CODE_LENGTH } from '@/constants/config';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';

export function generateSessionCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(SESSION_CODE_LENGTH));
  return Array.from(bytes)
    .map((b) => ALPHABET[b % ALPHABET.length])
    .join('');
}

export function buildShareUrl(code: string): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  return `${appUrl}/session/${code}`;
}
