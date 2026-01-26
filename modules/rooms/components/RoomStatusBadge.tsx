
import React from 'react';
import { RoomStatus } from '../rooms.types';

const STYLES: Partial<Record<RoomStatus, string>> = {
  AVAILABLE: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  BOOKED: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  BLOCKED: 'bg-rose-50 text-rose-700 border-rose-100',
  CLEAN: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  DIRTY: 'bg-amber-50 text-amber-700 border-amber-100',
  OCCUPIED: 'bg-blue-50 text-blue-700 border-blue-100',
  MAINTENANCE: 'bg-slate-100 text-slate-600 border-slate-300',
};

export const RoomStatusBadge: React.FC<{ status?: RoomStatus }> = ({ status }) => {
  // Default to AVAILABLE if status is undefined or not a valid string
  const safeStatus = (status && typeof status === 'string') ? status : 'AVAILABLE';
  const label = safeStatus.charAt(0) + safeStatus.slice(1).toLowerCase();
  const styles = STYLES[safeStatus] || STYLES.AVAILABLE;
  
  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${styles}`}>
      {label}
    </span>
  );
};
