
import React, { useState } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBookings } from './bookings.api';
import { BookingsTable } from './components/BookingsTable';
import { BookingPagination } from './components/BookingPagination';
import { BookingDetailsDrawer } from './components/BookingDetailsDrawer';
import { BookingFilters } from './components/BookingFilters';
import { BookingStatus } from './bookings.types';
import { PageTransition } from '../../app/layout/PageTransition';
import { TableSkeleton } from '../../components/ui/TableSkeleton';
import { FilterSkeleton } from '../../components/ui/FilterSkeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { useAuth } from '../../auth/AuthContext';
import { useToast } from '../../components/ui/Toast';

export const BookingsPage: React.FC = () => {
  const { hasPermission } = useAuth();
  const navigate = useNavigate();
  const { success } = useToast();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('ALL');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const { data, isLoading, isPlaceholderData } = useBookings({
    page,
    pageSize,
    search: search || undefined,
    status: status === 'ALL' ? undefined : status
  });

  // Debug log to check data structure
  React.useEffect(() => {
    if (data) {
      console.log('Bookings data:', data);
    }
  }, [data]);

  const hasData = data && data.data && Array.isArray(data.data) && data.data.length > 0;
  const canCreate = hasPermission('bookings:update');

  const handleReset = () => {
    setSearch('');
    setStatus('ALL');
    setPage(1);
  };

  const handleCreateBooking = () => {
    // TODO: Replace with booking creation drawer/modal when implemented
    success('Booking creation flow coming soon. For now, bookings can be created through the check-in process.');
    // Future: navigate('/bookings/new') or open booking creation drawer
  };

  return (
    <PageTransition>
      <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Reservations</h1>
            <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Real-time management of property bookings</p>
          </div>
          {canCreate && (
            <button 
              onClick={handleCreateBooking}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
            >
              <Plus size={18} /> New Booking
            </button>
          )}
        </div>

        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
          {isLoading && !data ? (
            <FilterSkeleton />
          ) : (
            <BookingFilters 
              search={search}
              status={status}
              onSearchChange={(val) => { setSearch(val); setPage(1); }}
              onStatusChange={(val) => { setStatus(val); setPage(1); }}
            />
          )}

          {isLoading && !hasData ? (
            <TableSkeleton rows={10} cols={6} />
          ) : !hasData ? (
            <div className="p-8">
              <EmptyState 
                icon={BookOpen}
                title={search || status !== 'ALL' ? "No Bookings Found" : "Start Your Journey"}
                description={
                  search || status !== 'ALL' 
                    ? "We couldn't find any reservations matching your current filters." 
                    : "Your property doesn't have any bookings yet. Start by adding your first reservation."
                }
                action={{
                  label: search || status !== 'ALL' ? "Clear Filters" : (canCreate ? "Add Your First Booking" : "Contact Admin"),
                  onClick: search || status !== 'ALL' ? handleReset : (canCreate ? handleCreateBooking : undefined)
                }}
              />
            </div>
          ) : (
            <BookingsTable 
              bookings={data?.data || []} 
              isLoading={isLoading || isPlaceholderData} 
              onRowClick={(b) => setSelectedBooking(b)} 
              page={page}
              pageSize={pageSize}
              totalCount={data?.totalCount || 0}
            />
          )}

          {/* Pagination Footer */}
          {hasData && data && (
            <BookingPagination 
              currentPage={page}
              pageSize={pageSize}
              totalCount={data.totalCount}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
              }}
            />
          )}
        </div>

        <BookingDetailsDrawer 
          booking={selectedBooking} 
          onClose={() => setSelectedBooking(null)} 
        />
      </div>
    </PageTransition>
  );
};
