'use client';

import { cn } from '@/lib/utils';

const OUTFITS = [
  { value: 'Casual', emoji: '👕', desc: 'Comfortable & easy' },
  { value: 'Dress Up', emoji: '✨', desc: 'Looking gorgeous' },
  { value: 'Surprise Me', emoji: '🎭', desc: 'Whatever you choose' },
];

interface OutfitSelectorProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

export default function OutfitSelector({ value, onChange, error }: OutfitSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {OUTFITS.map((o) => {
          const selected = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              aria-pressed={selected}
              className={cn(
                'flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400',
                selected
                  ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 shadow-lg shadow-pink-100'
                  : 'border-gray-200 bg-white/60 hover:border-pink-300 hover:bg-pink-50/40',
              )}
            >
              <span className="text-3xl">{o.emoji}</span>
              <div>
                <p className={cn('font-semibold', selected ? 'text-pink-600' : 'text-gray-800')}>{o.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{o.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
