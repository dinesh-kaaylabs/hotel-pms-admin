
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, History, User } from 'lucide-react';
import { useCleaningLogs } from '../housekeeping.api';
import { CleaningLogStatusBadge } from './CleaningLogStatusBadge';

interface Props {
  roomId: string | null;
  roomNumber: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CleaningLogDrawer: React.FC<Props> = ({ roomId, roomNumber, isOpen, onClose }) => {
  const { data: logs, isLoading } = useCleaningLogs(roomId);

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
                  <History size={20} className="text-indigo-600" /> Cleaning History
                </h2>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">Room {roomNumber}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
                </div>
              ) : logs?.length ? (
                <div className="space-y-4">
                  {logs.map((log) => (
                    <div key={log.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex justify-between items-start mb-2">
                        <CleaningLogStatusBadge status={log.status} />
                        <span className="text-[10px] text-slate-400 font-bold">{log.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-700 mt-3">
                        <User size={14} className="text-slate-400" />
                        {log.staffName}
                      </div>
                      {log.note && (
                        <p className="text-xs text-slate-500 mt-2 italic bg-white p-2 rounded-lg border border-slate-100">
                          "{log.note}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-sm">No activity records found.</div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
