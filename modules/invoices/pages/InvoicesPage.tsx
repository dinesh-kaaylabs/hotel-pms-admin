
import React, { useState } from 'react';
import { FileText, Download, Search, Filter, History, Loader2 } from 'lucide-react';
import { useInvoices, useExportInvoices } from '../invoices.api';
import { InvoicesTable } from '../components/InvoicesTable';
import { InvoicePreviewDrawer } from '../components/InvoicePreviewDrawer';
import { AdvancedDateRangeFilter } from '../components/AdvancedDateRangeFilter';
import { Invoice, InvoiceFilters, InvoiceStatus } from '../invoices.types';
import { PageTransition } from '../../../app/layout/PageTransition';
import { TableSkeleton } from '../../../components/ui/TableSkeleton';
import { EmptyState } from '../../../components/ui/EmptyState';
import { useToast } from '../../../components/ui/Toast';

export const InvoicesPage: React.FC = () => {
  const { success, error } = useToast();
  const [filters, setFilters] = useState<InvoiceFilters>({});
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const { data, isLoading } = useInvoices(filters);
  const hasData = data && data.length > 0;
  const exportMutation = useExportInvoices();

  const handleAdvancedDateRange = () => {
    setFilterOpen(true);
  };

  const handleExport = async () => {
    try {
      const result = await exportMutation.mutateAsync(filters);
      const link = document.createElement('a');
      link.href = result.downloadUrl;
      link.download = result.filename || `invoices-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      success('Invoices exported successfully');
    } catch (e: any) {
      error(e?.message || 'Failed to export invoices');
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="text-indigo-600" /> Invoices & GST
            </h1>
            <p className="text-slate-500 text-sm mt-1">Manage audit-safe financial records and tax compliance</p>
          </div>
          <div className="flex gap-2">
             <button 
              onClick={handleExport}
              disabled={exportMutation.isPending}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all shadow-lg disabled:opacity-50"
            >
              {exportMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Exporting...
                </>
              ) : (
                <>
                  <Download size={18} /> Bulk Export (GSTR-1)
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3 w-full">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search Invoice #, Guest or Booking"
                value={filters.search || ''}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>
            
            <select 
              value={filters.status || ''}
              onChange={(e) => setFilters({ ...filters, status: e.target.value as InvoiceStatus || undefined })}
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">All Statuses</option>
              <option value="ISSUED">Issued</option>
              <option value="DRAFT">Draft</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          
          <button 
            onClick={handleAdvancedDateRange}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Filter size={16} /> Advanced Date Range
          </button>
        </div>

        {isLoading ? (
          <TableSkeleton rows={10} cols={6} />
        ) : !hasData ? (
          <EmptyState 
            icon={History}
            title="No Invoices Found"
            description="We couldn't find any financial records matching your current filters."
            action={{
              label: "Reset Filters",
              onClick: () => setFilters({})
            }}
          />
        ) : (
          <InvoicesTable 
            data={data || []} 
            isLoading={false} 
            onRowClick={setSelectedInvoice} 
          />
        )}

        <InvoicePreviewDrawer 
          invoice={selectedInvoice} 
          onClose={() => setSelectedInvoice(null)} 
        />

        <AdvancedDateRangeFilter
          isOpen={isFilterOpen}
          onClose={() => setFilterOpen(false)}
          filters={filters}
          onApply={setFilters}
        />
      </div>
    </PageTransition>
  );
};
