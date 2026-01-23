
import React, { useEffect, useState } from 'react';
import { X, Loader2, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoomType } from '../rooms.types';
import { useCreateRoomType, useUpdateRoomType } from '../rooms.api';

interface Props {
  roomType: RoomType | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RoomTypeDrawer: React.FC<Props> = ({ roomType, isOpen, onClose }) => {
  const [formData, setFormData] = useState<Partial<RoomType>>({
    name: '',
    baseOccupancy: 2,
    maxOccupancy: 4,
    active: true
  });

  const createMutation = useCreateRoomType();
  const updateMutation = useUpdateRoomType();

  useEffect(() => {
    if (roomType) {
      setFormData(roomType);
    } else {
      setFormData({ name: '', baseOccupancy: 2, maxOccupancy: 4, active: true });
    }
  }, [roomType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (roomType) {
      await updateMutation.mutateAsync({ id: roomType.id, ...formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
    onClose();
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

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
                <h2 className="text-xl font-bold text-slate-900">
                  {roomType ? 'Edit Room Type' : 'Create Room Type'}
                </h2>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">Inventory Category</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Room Type Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                    placeholder="e.g. Deluxe Ocean Suite"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Base Occupancy</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formData.baseOccupancy}
                      onChange={(e) => setFormData({ ...formData, baseOccupancy: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Max Occupancy</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formData.maxOccupancy}
                      onChange={(e) => setFormData({ ...formData, maxOccupancy: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <input
                    type="checkbox"
                    id="active-status"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="active-status" className="text-sm font-bold text-slate-700">
                    Active for Reservations
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                >
                  {isPending ? <Loader2 className="animate-spin" size={20} /> : (
                    <><Save size={18} /> {roomType ? 'Update Room Type' : 'Create Category'}</>
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
