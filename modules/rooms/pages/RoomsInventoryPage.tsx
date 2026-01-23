
import React, { useState } from 'react';
import { Calendar, Filter, Zap, LayoutGrid } from 'lucide-react';
import { useRoomInventory, useRoomTypes } from '../rooms.api';
import { InventoryTable } from '../components/InventoryTable';
import { BulkEditDrawer } from '../components/BulkEditDrawer';

export const RoomsInventoryPage: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [filters, setFilters] = useState({
    startDate: today,
    endDate: nextWeek,
    roomTypeId: ''
  });

  const [isBulkOpen, setBulkOpen] = useState(false);

  const { data: inventory, isLoading } = useRoomInventory(filters);
  const { data: roomTypes } = useRoomTypes();

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <LayoutGrid className="text-emerald-600" /> Room Inventory
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage daily availability and sell status across categories</p>
        </div>
        <button 
          onClick={() => setBulkOpen(true)}
          className="bg-amber-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-amber-600 transition-all shadow-lg shadow-amber-100 flex items-center gap-2"
        >
          <Zap size={18} /> Bulk Adjustment
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
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div className="relative flex-1 max-w-[200px]">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <select 
            value={filters.roomTypeId}
            onChange={(e) => setFilters(prev => ({ ...prev, roomTypeId: e.target.value }))}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">All Room Types</option>
            {roomTypes?.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
          <Filter size={16} /> Advanced Filters
        </button>
      </div>

      <InventoryTable data={inventory || []} isLoading={isLoading} />

      <BulkEditDrawer 
        roomTypes={roomTypes || []} 
        isOpen={isBulkOpen} 
        onClose={() => setBulkOpen(false)} 
      />
    </div>
  );
};
