
import React, { useState } from 'react';
import { Calendar, Zap, TrendingUp, Filter } from 'lucide-react';
import { usePricingCalendar, useRatePlans } from '../pricing.api';
import { useRoomTypes } from '../../rooms/rooms.api';
import { PricingTable } from '../components/PricingTable';
import { BulkPricingDrawer } from '../components/BulkPricingDrawer';

export const PricingCalendarPage: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [filters, setFilters] = useState({
    startDate: today,
    endDate: nextMonth,
    roomTypeId: ''
  });

  const [isBulkOpen, setBulkOpen] = useState(false);

  const { data: pricing, isLoading } = usePricingCalendar(filters);
  const { data: roomTypes } = useRoomTypes();
  const { data: ratePlans } = useRatePlans();

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="text-indigo-600" /> Pricing Calendar
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage daily rates and operational sell status</p>
        </div>
        <button 
          onClick={() => setBulkOpen(true)}
          className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-black transition-all shadow-lg flex items-center gap-2"
        >
          <Zap size={18} /> Bulk Update Rates
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-4 w-full">
          <div className="relative flex-1 max-w-[200px]">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div className="relative flex-1 max-w-[200px]">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <select 
            value={filters.roomTypeId}
            onChange={(e) => setFilters(prev => ({ ...prev, roomTypeId: e.target.value }))}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">All Categories</option>
            {roomTypes?.map(rt => <option key={rt.id} value={rt.id}>{rt.name}</option>)}
          </select>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
          <Filter size={16} /> Advanced Grid
        </button>
      </div>

      <PricingTable data={pricing || []} isLoading={isLoading} />

      <BulkPricingDrawer 
        ratePlans={ratePlans || []} 
        isOpen={isBulkOpen} 
        onClose={() => setBulkOpen(false)} 
      />
    </div>
  );
};
