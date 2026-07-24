'use client';

import { cn } from '@/lib/utils';

const DATE_TYPES = [
  { value: 'Dinner', emoji: '🍽️', desc: 'Fine dining' },
  { value: 'Coffee', emoji: '☕', desc: 'Cosy & casual' },
  { value: 'Movie', emoji: '🎬', desc: 'Film & popcorn' },
  { value: 'Long Drive', emoji: '🚗', desc: 'Windows down' },
  { value: 'Park Walk', emoji: '🌿', desc: 'Fresh air' },
  { value: 'Surprise Me', emoji: '🎁', desc: 'Your choice!' },
];

interface DateTypeCardsProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

export default function DateTypeCards({ value, onChange, error }: DateTypeCardsProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {DATE_TYPES.map((dt) => {
          const selected = value === dt.value;
          return (
            <button
              key={dt.value}
              type="button"
              onClick={() => onChange(dt.value)}
              aria-pressed={selected}
              className={cn(
                'flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400',
                selected
                  ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 shadow-lg shadow-pink-100'
                  : 'border-gray-200 bg-white/60 hover:border-pink-300 hover:bg-pink-50/40',
              )}
            >
              <span className="text-3xl">{dt.emoji}</span>
              <div>
                <p className={cn('font-semibold text-sm', selected ? 'text-pink-600' : 'text-gray-800')}>{dt.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{dt.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
