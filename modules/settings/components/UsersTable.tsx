
import React from 'react';
import { AppUser } from '../settings.types';
import { RoleBadge } from './RoleBadge';
import { MoreVertical, UserX, UserCheck, Loader2 } from 'lucide-react';
import { useToggleUserStatus } from '../settings.api';

interface Props {
  data: AppUser[];
  isLoading: boolean;
}

export const UsersTable: React.FC<Props> = ({ data, isLoading }) => {
  const toggleMutation = useToggleUserStatus();

  if (isLoading) {
    return <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>;
  }

  return (
    <div className="overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Login</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <RoleBadge role={user.role} />
              </td>
              <td className="px-6 py-4">
                {user.active ? (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase border border-emerald-100">Active</span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded uppercase border border-slate-200">Disabled</span>
                )}
              </td>
              <td className="px-6 py-4 text-xs text-slate-500">
                {user.lastLogin || 'Never'}
              </td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={() => toggleMutation.mutate({ id: user.id, active: !user.active })}
                  disabled={toggleMutation.isPending}
                  className={`p-2 rounded-lg transition-all ${user.active ? 'text-rose-400 hover:bg-rose-50' : 'text-emerald-400 hover:bg-emerald-50'}`}
                  title={user.active ? 'Disable Account' : 'Enable Account'}
                >
                  {user.active ? <UserX size={18} /> : <UserCheck size={18} />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
