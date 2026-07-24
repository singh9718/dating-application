'use client';

import { cn } from '@/lib/utils';

const TIME_OPTIONS = [
  { value: 'Breakfast', label: 'Breakfast', emoji: '🌅', time: '8 – 11 AM' },
  { value: 'Lunch', label: 'Lunch', emoji: '☀️', time: '12 – 3 PM' },
  { value: 'Evening', label: 'Evening', emoji: '🌆', time: '5 – 8 PM' },
  { value: 'Night', label: 'Night', emoji: '🌙', time: '8 PM+' },
];

interface TimeSelectorProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

export default function TimeSelector({ value, onChange, error }: TimeSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TIME_OPTIONS.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={selected}
              className={cn(
                'flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400',
                selected
                  ? 'border-pink-500 bg-pink-50 shadow-md shadow-pink-100'
                  : 'border-gray-200 bg-white/60 hover:border-pink-300 hover:bg-pink-50/50',
              )}
            >
              <span className="text-2xl">{opt.emoji}</span>
              <span className={cn('font-semibold text-sm', selected ? 'text-pink-600' : 'text-gray-700')}>
                {opt.label}
              </span>
              <span className="text-xs text-gray-400">{opt.time}</span>
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
