
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Settings, Building, Users } from 'lucide-react';
import { useAuth } from '../../../auth/AuthContext';

export const SettingsPage: React.FC = () => {
  const { hasPermission } = useAuth();

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Settings className="text-slate-400" /> Organization Settings
        </h1>
        <p className="text-slate-500 text-sm mt-1">Configure property metadata and team member access</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sub-Nav */}
        <aside className="lg:w-64 space-y-1">
          <NavLink
            to="/settings/hotel"
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
              ${isActive ? 'bg-white border border-slate-200 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}
            `}
          >
            <Building size={18} /> Hotel Profile
          </NavLink>
          
          {hasPermission('users:manage') && (
            <NavLink
              to="/settings/users"
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
                ${isActive ? 'bg-white border border-slate-200 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}
              `}
            >
              <Users size={18} /> Team Members
            </NavLink>
          )}
        </aside>

        {/* Content Area */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
