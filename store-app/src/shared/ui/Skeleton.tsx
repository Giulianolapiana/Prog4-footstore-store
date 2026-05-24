import { cn } from '../lib/utils';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div
    className={cn(
      'animate-pulse bg-gradient-to-r from-[#e7eefe] via-[#f0f3ff] to-[#e7eefe] bg-[length:200%_100%] rounded-lg',
      className
    )}
    style={{ backgroundSize: '200% 100%', animation: 'skeleton-loading 1.5s ease-in-out infinite' }}
  />
);

export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-[#e4beb3]/40 p-0">
    <Skeleton className="w-full h-52" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <div className="flex justify-between items-center mt-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>
    </div>
  </div>
);
