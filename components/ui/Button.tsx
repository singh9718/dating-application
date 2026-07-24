'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed',
          variant === 'primary' &&
            'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:-translate-y-0.5 active:translate-y-0',
          variant === 'outline' &&
            'border-2 border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400',
          variant === 'ghost' && 'text-pink-600 hover:bg-pink-50',
          size === 'sm' && 'px-4 py-2 text-sm',
          size === 'md' && 'px-6 py-3 text-base',
          size === 'lg' && 'px-8 py-4 text-lg',
          className,
        )}
        {...props}
      >
        {loading ? (
          <>
            <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            <span>Planning...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
