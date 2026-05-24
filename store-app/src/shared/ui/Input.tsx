import React from 'react';
import { cn } from '../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-');

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-[#151c27]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5b4038]">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full bg-white border rounded-lg px-4 py-2.5 text-[#151c27] placeholder-[#8f7067]/60',
              'transition-all duration-200 outline-none',
              'focus:ring-2 focus:ring-[#ae3200] focus:border-[#ae3200]',
              error
                ? 'border-[#ba1a1a] focus:ring-[#ba1a1a]'
                : 'border-[#e4beb3]',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5b4038]">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p className="text-xs text-[#ba1a1a] font-medium">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-[#5b4038]">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
