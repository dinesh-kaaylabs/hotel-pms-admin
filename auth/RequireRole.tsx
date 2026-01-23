
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { AppPermission } from './auth.types';
import { Loader2, ShieldAlert } from 'lucide-react';
import { hasPermission } from './permissions';

interface RequireRoleProps {
  children: React.ReactNode;
  permission: AppPermission;
}

export const RequireRole: React.FC<RequireRoleProps> = ({ children, permission }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check centralized permission map
  const authorized = hasPermission(user?.role as any, permission);

  if (!authorized) {
    return (
      <div className="h-full w-full flex items-center justify-center min-h-[400px] flex-col p-8 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-4">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Access Restricted</h2>
        <p className="text-slate-500 mt-2 max-w-sm">
          Your account does not have the <strong>{permission}</strong> permission required to view this module.
        </p>
        <p className="text-xs text-slate-400 mt-4 italic">
          Please contact your Hotel Admin if you believe this is an error.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
