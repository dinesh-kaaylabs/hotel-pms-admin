
import React from 'react';
import { BookingStatus } from '../bookings.types';

const DEFAULT_STYLES: Record<BookingStatus, string> = {
  [BookingStatus.CONFIRMED]: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  [BookingStatus.CHECKED_IN]: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  [BookingStatus.CHECKED_OUT]: 'bg-slate-100 text-slate-600 border-slate-200',
  [BookingStatus.CANCELLED]: 'bg-rose-50 text-rose-700 border-rose-100',
  [BookingStatus.PENDING]: 'bg-amber-50 text-amber-700 border-amber-100',
};

interface BookingStatusBadgeProps {
  status: BookingStatus;
  variantMap?: Partial<Record<BookingStatus, string>>;
}

export const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({ status, variantMap }) => {
  const label = status.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  const appliedStyle = variantMap?.[status] || DEFAULT_STYLES[status];
  
  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-black border uppercase tracking-wider ${appliedStyle}`}>
      {label}
    </span>
  );
};
