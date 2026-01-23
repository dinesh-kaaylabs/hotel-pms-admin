
import React from 'react';
import { UserRole } from '../../../auth/auth.types';

const ROLE_STYLES: Record<UserRole, string> = {
  [UserRole.SUPER_ADMIN]: 'bg-purple-50 text-purple-700 border-purple-100',
  [UserRole.HOTEL_ADMIN]: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  [UserRole.STAFF]: 'bg-slate-50 text-slate-600 border-slate-200',
};

export const RoleBadge: React.FC<{ role: UserRole }> = ({ role }) => {
  const label = role.replace('_', ' ');
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${ROLE_STYLES[role]}`}>
      {label}
    </span>
  );
};
