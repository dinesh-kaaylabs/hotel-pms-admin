
import React, { useState } from 'react';
import { CreditCard, Download, Printer, Wallet } from 'lucide-react';
import { usePayments } from '../payments.api';
import { PaymentsTable } from '../components/PaymentsTable';
import { PaymentFilters } from '../components/PaymentFilters';
import { PaymentDetailsDrawer } from '../components/PaymentDetailsDrawer';
import { PaymentFilters as IFilters } from '../payments.types';
import { PageTransition } from '../../../app/layout/PageTransition';
import { TableSkeleton } from '../../../components/ui/TableSkeleton';
import { EmptyState } from '../../../components/ui/EmptyState';

export const PaymentsPage: React.FC = () => {
  const [filters, setFilters] = useState<IFilters>({});
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const { data, isLoading } = usePayments(filters);
  const hasData = data && data.length > 0;

  return (
    <PageTransition>
      <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="text-indigo-600" /> Payments & Transactions
            </h1>
            <p className="text-slate-500 text-sm mt-1">Audit-grade financial records and reconciliation</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 bg-white rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
              <Printer size={16} /> Print
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all">
              <Download size={18} /> Export CSV
            </button>
          </div>
        </div>

        <PaymentFilters filters={filters} onFilterChange={setFilters} />

        {isLoading ? (
          <TableSkeleton rows={8} cols={6} />
        ) : !hasData ? (
          <EmptyState 
            icon={Wallet}
            title="No Transactions"
            description="There are no transaction records matching your current filter criteria."
            action={{
              label: "Reset Search",
              onClick: () => setFilters({})
            }}
          />
        ) : (
          <PaymentsTable 
            data={data || []} 
            isLoading={false} 
            onRowClick={setSelectedPayment} 
          />
        )}

        <PaymentDetailsDrawer 
          payment={selectedPayment} 
          onClose={() => setSelectedPayment(null)} 
        />
      </div>
    </PageTransition>
  );
};
