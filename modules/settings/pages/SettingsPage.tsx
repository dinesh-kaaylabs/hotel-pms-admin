
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Settings, Building, Users, Mail, FileText, CheckCircle, CreditCard, Receipt, Globe } from 'lucide-react';
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

          <div className="pt-4 mt-4 border-t border-slate-200">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">Enterprise Features</p>
          </div>

          <NavLink
            to="/settings/subscription"
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
              ${isActive ? 'bg-white border border-slate-200 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}
            `}
          >
            <CreditCard size={18} /> Subscription
          </NavLink>

          <NavLink
            to="/settings/tax"
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
              ${isActive ? 'bg-white border border-slate-200 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}
            `}
          >
            <Receipt size={18} /> Tax Configuration
          </NavLink>

          <NavLink
            to="/settings/channel-manager"
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
              ${isActive ? 'bg-white border border-slate-200 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}
            `}
          >
            <Globe size={18} /> Channel Manager
          </NavLink>

          {/* Phase-2 Wave-1 Routes */}
          {hasPermission('settings:view') && (
            <>
              <div className="pt-4 mt-4 border-t border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">Phase-2 Features</p>
              </div>
              
              <NavLink
                to="/settings/phase2/communication"
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
                  ${isActive ? 'bg-white border border-slate-200 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}
                `}
              >
                <Mail size={18} /> Communication
              </NavLink>
              
              <NavLink
                to="/settings/phase2/audit"
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
                  ${isActive ? 'bg-white border border-slate-200 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}
                `}
              >
                <FileText size={18} /> Audit Logs
              </NavLink>
              
              <NavLink
                to="/settings/phase2/approval"
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
                  ${isActive ? 'bg-white border border-slate-200 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}
                `}
              >
                <CheckCircle size={18} /> Approvals
              </NavLink>
            </>
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
