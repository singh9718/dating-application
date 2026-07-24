import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, label, error, id, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        className={cn(
          'w-full px-4 py-3 rounded-xl border bg-white/80 text-base text-gray-900 placeholder:text-gray-400 transition-all duration-150 resize-none',
          'focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent',
          error ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-200 hover:border-pink-300',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
