'use client';

interface BudgetSliderProps {
  value: number;
  onChange: (val: number) => void;
  error?: string;
}

export default function BudgetSlider({ value, onChange, error }: BudgetSliderProps) {
  const percent = ((value - 500) / (5000 - 500)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">₹500</span>
        <div className="px-5 py-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg shadow-md shadow-pink-200">
          ₹{value.toLocaleString('en-IN')}
        </div>
        <span className="text-sm text-gray-500">₹5,000</span>
      </div>

      <div className="relative py-2">
        <input
          type="range"
          min={500}
          max={5000}
          step={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="Budget slider"
          aria-valuemin={500}
          aria-valuemax={5000}
          aria-valuenow={value}
          className="w-full"
          style={{
            background: `linear-gradient(to right, #f43f7a ${percent}%, #e5e7eb ${percent}%)`,
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-400 px-1">
        {[500, 1500, 2500, 3500, 5000].map((v) => (
          <span key={v}>₹{v >= 1000 ? `${v / 1000}k` : v}</span>
        ))}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
