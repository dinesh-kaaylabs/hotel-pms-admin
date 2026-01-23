
import React from 'react';
import { SettlementStatus } from '../settlements.types';

const STYLES: Record<SettlementStatus, string> = {
  PENDING: 'bg-amber-50 text-amber-700 border-amber-100',
  PROCESSING: 'bg-blue-50 text-blue-700 border-blue-100',
  SETTLED: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  FAILED: 'bg-rose-50 text-rose-700 border-rose-100',
};

export const SettlementStatusBadge: React.FC<{ status: SettlementStatus }> = ({ status }) => {
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${STYLES[status]}`}>
      {status}
    </span>
  );
};
