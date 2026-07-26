export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const SESSION_CODE_LENGTH = 8;

export const SESSION_STATUS_LABELS = {
  draft: 'Draft',
  shared: 'Shared',
  submitted: 'Submitted',
  closed: 'Closed',
  expired: 'Expired',
} as const;

export const SESSION_STATUS_COLORS = {
  draft: 'bg-gray-100 text-gray-700',
  shared: 'bg-blue-100 text-blue-700',
  submitted: 'bg-green-100 text-green-700',
  closed: 'bg-orange-100 text-orange-700',
  expired: 'bg-red-100 text-red-700',
} as const;

export const DEFAULT_TEMPLATE_ID = 'date-planning-v1';
