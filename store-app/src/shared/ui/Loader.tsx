import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export const Loader = ({ size = 'md', className, text }: LoaderProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2 className={cn('animate-spin text-[#ae3200]', sizeMap[size])} />
      {text && <p className="text-sm text-[#5b4038] font-medium">{text}</p>}
    </div>
  );
};

export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#f9f9ff]">
    <Loader size="lg" text="Cargando..." />
  </div>
);
