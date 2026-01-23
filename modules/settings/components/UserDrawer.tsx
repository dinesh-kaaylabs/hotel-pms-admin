
import React, { useState } from 'react';
import { X, Loader2, UserPlus, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserRole } from '../../../auth/auth.types';
import { useCreateUser } from '../settings.api';
import { useToast } from '../../../components/ui/Toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const UserDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const { success, error } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: UserRole.STAFF,
  });

  const createMutation = useCreateUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync(formData);
      success(`Invitation sent to ${formData.email}`);
      onClose();
      setFormData({ name: '', email: '', role: UserRole.STAFF });
    } catch (e) {
      error('Failed to create user. Please try again.');
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
                  <UserPlus className="text-indigo-600" size={24} /> Add New User
                </h2>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">Team Member Invitation</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                    placeholder="e.g. Robert Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                    placeholder="robert@luxestay.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <Shield size={14} className="text-slate-400" /> Assign Organization Role
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[UserRole.HOTEL_ADMIN, UserRole.STAFF].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setFormData({ ...formData, role })}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                          formData.role === role
                            ? 'bg-indigo-50 border-indigo-500'
                            : 'bg-white border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <p className={`text-sm font-bold ${formData.role === role ? 'text-indigo-900' : 'text-slate-900'}`}>
                          {role.replace('_', ' ')}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter font-black">
                          {role === UserRole.HOTEL_ADMIN ? 'Full Property Access' : 'Operational Access Only'}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {createMutation.isPending ? (
                    <><Loader2 className="animate-spin" size={20} /> Sending Invite...</>
                  ) : 'Send Invite'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
