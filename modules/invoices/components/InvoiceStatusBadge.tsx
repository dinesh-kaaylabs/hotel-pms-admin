
import React from 'react';
import { InvoiceStatus } from '../invoices.types';

const STYLES: Record<InvoiceStatus, string> = {
  DRAFT: 'bg-slate-100 text-slate-600 border-slate-200',
  ISSUED: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  CANCELLED: 'bg-rose-50 text-rose-700 border-rose-100',
};

export const InvoiceStatusBadge: React.FC<{ status: InvoiceStatus }> = ({ status }) => {
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${STYLES[status]}`}>
      {status}
    </span>
  );
};
