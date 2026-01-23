
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wrench, AlertTriangle, Loader2 } from 'lucide-react';
import { useCreateMaintenance } from '../maintenance.api';
import { useHousekeepingRooms } from '../../housekeeping/housekeeping.api';
import { useToast } from '../../../components/ui/Toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateMaintenanceDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const { success, error } = useToast();
  const [roomId, setRoomId] = useState('');
  const [reason, setReason] = useState('');
  const [blockedFrom, setBlockedFrom] = useState(new Date().toISOString().split('T')[0]);
  const [blockedTo, setBlockedTo] = useState('');

  const { data: rooms } = useHousekeepingRooms();
  const createMutation = useCreateMaintenance();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync({
        roomId,
        reason,
        blockedFrom,
        blockedTo: blockedTo || undefined,
      });
      success('Room marked as Out-of-Order. Inventory updated.');
      onClose();
      // Reset form
      setRoomId('');
      setReason('');
      setBlockedTo('');
    } catch (e) {
      error('Failed to block room. Ensure room is not already occupied.');
    }
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
                  <Wrench size={20} className="text-indigo-600" /> Block Room (OOO)
                </h2>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">Maintenance Request</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3 mb-4">
                <AlertTriangle size={20} className="text-amber-600 shrink-0" />
                <p className="text-[10px] text-amber-800 leading-relaxed font-bold uppercase tracking-tight">
                  Blocking a room removes it from available inventory. It will be marked as "Out of Order" on all distribution channels immediately.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Select Room</label>
                  <select
                    required
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                  >
                    <option value="">Select a room...</option>
                    {rooms?.filter(r => r.status !== 'OUT_OF_SERVICE').map(room => (
                      <option key={room.id} value={room.id}>
                        {room.roomNumber} - {room.roomType} (Floor {room.floor})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Reason for Maintenance</label>
                  <textarea
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    placeholder="e.g. Plumbing issue in bathroom, broken AC unit..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Start Date</label>
                    <input
                      type="date"
                      required
                      value={blockedFrom}
                      onChange={(e) => setBlockedFrom(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Est. Resolution Date</label>
                    <input
                      type="date"
                      value={blockedTo}
                      onChange={(e) => setBlockedTo(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={createMutation.isPending || !roomId}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-black disabled:opacity-50 transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  {createMutation.isPending ? <Loader2 className="animate-spin" size={20} /> : 'Block Room & Save'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
