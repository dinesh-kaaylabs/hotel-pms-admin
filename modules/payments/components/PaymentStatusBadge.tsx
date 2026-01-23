
import React from 'react';
import { PaymentStatus } from '../payments.types';

const STYLES: Record<PaymentStatus, string> = {
  CREATED: 'bg-slate-100 text-slate-600 border-slate-200',
  AUTHORIZED: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  CAPTURED: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  FAILED: 'bg-rose-50 text-rose-700 border-rose-100',
  REFUNDED: 'bg-amber-50 text-amber-700 border-amber-100',
};

export const PaymentStatusBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => {
  const label = status.charAt(0) + status.slice(1).toLowerCase();
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${STYLES[status]}`}>
      {label}
    </span>
  );
};
