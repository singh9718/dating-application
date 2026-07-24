'use client';

import { cn } from '@/lib/utils';

const MOODS = [
  { value: 'Romantic', emoji: '🌹', color: 'from-pink-50 to-rose-50', selected: 'border-rose-500' },
  { value: 'Chill', emoji: '🌊', color: 'from-sky-50 to-blue-50', selected: 'border-blue-400' },
  { value: 'Fun', emoji: '🎉', color: 'from-yellow-50 to-amber-50', selected: 'border-yellow-500' },
  { value: 'Adventure', emoji: '🏔️', color: 'from-green-50 to-emerald-50', selected: 'border-green-500' },
  { value: 'Surprise', emoji: '🎁', color: 'from-purple-50 to-lavender-50', selected: 'border-purple-400' },
];

interface MoodSelectorProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

export default function MoodSelector({ value, onChange, error }: MoodSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {MOODS.map((m) => {
          const selected = value === m.value;
          return (
            <button
              key={m.value}
              type="button"
              onClick={() => onChange(m.value)}
              aria-pressed={selected}
              className={cn(
                'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400',
                selected
                  ? `${m.selected} bg-gradient-to-br ${m.color} shadow-md`
                  : 'border-gray-200 bg-white/60 hover:border-pink-300 hover:bg-pink-50/40',
              )}
            >
              <span className="text-2xl">{m.emoji}</span>
              <span className={cn('text-sm font-semibold', selected ? 'text-gray-800' : 'text-gray-600')}>
                {m.value}
              </span>
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
