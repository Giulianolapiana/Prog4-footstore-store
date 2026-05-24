import React from 'react';
import { cn } from '../lib/utils';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'neutral' | 'info';

const variantMap: Record<BadgeVariant, string> = {
  primary: 'bg-[#ffdbd0] text-[#541400]',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-[#ffdad6] text-[#93000a]',
  neutral: 'bg-[#e7eefe] text-[#151c27]',
  info: 'bg-blue-100 text-blue-800',
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ variant = 'neutral', children, className }: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono',
        variantMap[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
