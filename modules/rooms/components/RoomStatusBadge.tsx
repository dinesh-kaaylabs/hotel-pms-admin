
import React from 'react';
import { RoomStatus } from '../rooms.types';

const STYLES: Record<RoomStatus, string> = {
  AVAILABLE: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  BOOKED: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  BLOCKED: 'bg-rose-50 text-rose-700 border-rose-100',
};

export const RoomStatusBadge: React.FC<{ status: RoomStatus }> = ({ status }) => {
  const label = status.charAt(0) + status.slice(1).toLowerCase();
  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${STYLES[status]}`}>
      {label}
    </span>
  );
};
