
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Loader2, Save } from 'lucide-react';
import { useAddGuestNote } from '../guests.api';
import { useToast } from '../../../components/ui/Toast';

interface Props {
  guestId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AddNoteDrawer: React.FC<Props> = ({ guestId, isOpen, onClose }) => {
  const [note, setNote] = useState('');
  const { success, error } = useToast();
  const addNoteMutation = useAddGuestNote(guestId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    try {
      await addNoteMutation.mutateAsync(note);
      success('Operational note added to guest profile.');
      setNote('');
      onClose();
    } catch (e) {
      error('Failed to add note. Session may have expired.');
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
                  <MessageSquare className="text-indigo-600" size={20} /> Internal Note
                </h2>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">Shift Handover & Preferences</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 p-6 flex flex-col">
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 mb-6">
                <p className="text-[10px] text-amber-700 leading-relaxed font-bold uppercase">
                  Important: Notes are internal only and never visible to the guest. Use them for preferences, incidents, or loyalty context.
                </p>
              </div>

              <textarea
                autoFocus
                required
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Prefers high floor, allergic to feathers, requested extra towels at 3 AM..."
                className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-3xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none resize-none"
              />

              <div className="pt-6 mt-auto">
                <button
                  type="submit"
                  disabled={addNoteMutation.isPending || !note.trim()}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
                >
                  {addNoteMutation.isPending ? <Loader2 className="animate-spin" size={20} /> : <><Save size={18} /> Save Internal Note</>}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
