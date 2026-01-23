
import React, { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import { UsersTable } from '../components/UsersTable';
import { UserDrawer } from '../components/UserDrawer';
import { useUsers } from '../settings.api';
import { PageTransition } from '../../../app/layout/PageTransition';
import { TableSkeleton } from '../../../components/ui/TableSkeleton';
import { EmptyState } from '../../../components/ui/EmptyState';

export const UsersPage: React.FC = () => {
  const { data, isLoading } = useUsers();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const hasData = data && data.length > 0;

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Team Members</h2>
            <p className="text-xs text-slate-500 mt-1 uppercase font-black tracking-widest">Active System Operators</p>
          </div>
          <button 
            onClick={() => setDrawerOpen(true)}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2"
          >
            <Plus size={18} /> Add User
          </button>
        </div>

        {isLoading ? (
          <TableSkeleton rows={5} cols={5} />
        ) : !hasData ? (
          <EmptyState 
            icon={Users}
            title="No Users Registered"
            description="You haven't added any team members yet. Invite your staff to manage the property."
            action={{
              label: "Invite Staff",
              onClick: () => setDrawerOpen(true)
            }}
          />
        ) : (
          <UsersTable data={data || []} isLoading={false} />
        )}
        
        <UserDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setDrawerOpen(false)} 
        />
      </div>
    </PageTransition>
  );
};
