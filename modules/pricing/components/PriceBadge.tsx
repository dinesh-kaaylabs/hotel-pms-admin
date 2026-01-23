
import React from 'react';
import { useCurrency } from '../../../providers/CurrencyProvider';

interface PriceBadgeProps {
  amount: number;
  closed?: boolean;
}

export const PriceBadge: React.FC<PriceBadgeProps> = ({ amount, closed }) => {
  const { format } = useCurrency();
  
  if (closed) {
    return (
      <div className="flex flex-col items-center">
        <span className="text-xs font-bold text-rose-600 line-through opacity-50">{format(amount)}</span>
        <span className="text-[9px] font-black text-rose-700 bg-rose-50 px-1 rounded uppercase tracking-tighter">Closed</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm font-bold text-slate-900">{format(amount)}</span>
      <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-tighter">Open</span>
    </div>
  );
};
