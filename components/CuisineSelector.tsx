'use client';

import { cn } from '@/lib/utils';

const CUISINES = [
  { value: 'Indian', emoji: '🍛' },
  { value: 'Italian', emoji: '🍝' },
  { value: 'Chinese', emoji: '🥢' },
  { value: 'Japanese', emoji: '🍱' },
  { value: 'Mexican', emoji: '🌮' },
  { value: 'Street Food', emoji: '🌯' },
  { value: 'Anything', emoji: '🤍' },
];

interface CuisineSelectorProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

export default function CuisineSelector({ value, onChange, error }: CuisineSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {CUISINES.map((c) => {
          const selected = value === c.value;
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => onChange(c.value)}
              aria-pressed={selected}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400',
                selected
                  ? 'border-pink-500 bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200'
                  : 'border-gray-200 bg-white/80 text-gray-600 hover:border-pink-300 hover:text-pink-600',
              )}
            >
              <span>{c.emoji}</span>
              <span>{c.value}</span>
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
