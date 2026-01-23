
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { PaymentFilters as IFilters, PaymentStatus, PaymentProvider } from '../payments.types';

interface Props {
  filters: IFilters;
  onFilterChange: (filters: IFilters) => void;
}

export const PaymentFilters: React.FC<Props> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex flex-1 items-center gap-3 w-full">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search Booking # or Payment ID"
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
          />
        </div>
        
        <select 
          value={filters.status || ''}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value as PaymentStatus || undefined })}
          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-100"
        >
          <option value="">All Statuses</option>
          <option value="CAPTURED">Captured</option>
          <option value="REFUNDED">Refunded</option>
          <option value="FAILED">Failed</option>
          <option value="AUTHORIZED">Authorized</option>
        </select>

        <select 
          value={filters.provider || ''}
          onChange={(e) => onFilterChange({ ...filters, provider: e.target.value as PaymentProvider || undefined })}
          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-100"
        >
          <option value="">All Providers</option>
          <option value="STRIPE">Stripe</option>
          <option value="RAZORPAY">Razorpay</option>
          <option value="CASH">Cash</option>
          <option value="OTA">OTA (Expedia/Booking)</option>
        </select>
      </div>
      
      <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
        <Filter size={16} /> Advanced Audit
      </button>
    </div>
  );
};
