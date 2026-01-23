
import React, { useState } from 'react';
import { X, Loader2, Zap, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoomType, RoomStatus } from '../rooms.types';
import { useBulkUpdateInventory } from '../rooms.api';

interface Props {
  roomTypes: RoomType[];
  isOpen: boolean;
  onClose: () => void;
}

export const BulkEditDrawer: React.FC<Props> = ({ roomTypes, isOpen, onClose }) => {
  const [payload, setPayload] = useState({
    startDate: '',
    endDate: '',
    roomTypeIds: [] as string[],
    status: 'AVAILABLE' as RoomStatus,
    totalRooms: 0
  });

  const bulkMutation = useBulkUpdateInventory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await bulkMutation.mutateAsync(payload);
    onClose();
  };

  const toggleRoomType = (id: string) => {
    setPayload(prev => ({
      ...prev,
      roomTypeIds: prev.roomTypeIds.includes(id) 
        ? prev.roomTypeIds.filter(rid => rid !== id)
        : [...prev.roomTypeIds, id]
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="text-amber-500" size={24} /> Bulk Update
                </h2>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">Quick Inventory Adjustment</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                      <Calendar size={14} /> Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={payload.startDate}
                      onChange={(e) => setPayload({ ...payload, startDate: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                      <Calendar size={14} /> End Date
                    </label>
                    <input
                      type="date"
                      required
                      value={payload.endDate}
                      onChange={(e) => setPayload({ ...payload, endDate: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Target Room Types</label>
                  <div className="flex flex-wrap gap-2">
                    {roomTypes.map(type => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => toggleRoomType(type.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          payload.roomTypeIds.includes(type.id)
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        {type.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Sell Status</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['AVAILABLE', 'BLOCKED'].map(status => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setPayload({ ...payload, status: status as RoomStatus })}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          payload.status === status
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                            : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Set Total Capacity (Optional)</label>
                  <input
                    type="number"
                    value={payload.totalRooms}
                    onChange={(e) => setPayload({ ...payload, totalRooms: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="Enter room count"
                  />
                  <p className="text-[10px] text-slate-400 mt-1 font-medium italic">Leave at 0 to keep existing capacity levels.</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={bulkMutation.isPending || payload.roomTypeIds.length === 0}
                  className="w-full py-3 bg-amber-500 text-white rounded-xl font-bold text-sm hover:bg-amber-600 disabled:opacity-50 transition-all shadow-lg shadow-amber-100 flex items-center justify-center gap-2"
                >
                  {bulkMutation.isPending ? <Loader2 className="animate-spin" size={20} /> : (
                    <><Zap size={18} /> Apply Changes Now</>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
