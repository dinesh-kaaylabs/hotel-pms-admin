
import React from 'react';
import { Skeleton } from './Skeleton';

export const FilterSkeleton: React.FC = () => {
  return (
    <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 bg-white">
      <div className="flex flex-1 items-center gap-3">
        <Skeleton className="h-10 flex-1 max-w-md rounded-xl" />
        <div className="h-10 w-px bg-slate-50 hidden md:block" />
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>
      <Skeleton className="h-10 w-28 rounded-xl" />
    </div>
  );
};
