
import React, { useMemo } from 'react';
import { Booking, PaymentStatus } from '../bookings.types';
import { BookingStatusBadge } from './BookingStatusBadge';
import { MoreVertical, Loader2, Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useCurrency } from '../../../providers/CurrencyProvider';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TableProps {
  bookings: Booking[];
  onRowClick: (booking: Booking) => void;
  isLoading: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
}

export const BookingsTable: React.FC<TableProps> = ({ 
  bookings, 
  onRowClick, 
  isLoading,
  page,
  pageSize,
  totalCount
}) => {
  const { format } = useCurrency();

  if (isLoading && bookings.length === 0) {
    return (
      <div className="h-[500px] flex flex-col items-center justify-center bg-white border-t border-slate-200">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
        <p className="text-slate-500 font-medium animate-pulse uppercase tracking-widest text-[10px]">Fetching real-time inventory...</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col bg-white overflow-hidden border-t border-slate-200">
      {/* Table Header - Kept sticky for context during scroll */}
      <div className="flex items-center px-6 py-4 bg-slate-50/80 backdrop-blur-md border-b border-slate-200 z-20 sticky top-0">
        <div className="w-[12%] text-[10px] font-black text-slate-400 uppercase tracking-widest">Ref #</div>
        <div className="w-[20%] text-[10px] font-black text-slate-400 uppercase tracking-widest">Guest Profile</div>
        <div className="w-[15%] text-[10px] font-black text-slate-400 uppercase tracking-widest">Room Type</div>
        <div className="w-[20%] text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</div>
        <div className="w-[15%] text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</div>
        <div className="w-[13%] text-[10px] font-black text-slate-400 uppercase tracking-widest text-right px-2">Total Amount</div>
        <div className="w-[5%]"></div>
      </div>

      {/* Scrollable container for rows */}
      <div 
        className="overflow-auto max-h-[700px] scrollbar-hide"
        style={{ contain: 'layout' }}
      >
        {bookings.map((booking, index) => (
          <div
            key={booking.id}
            onClick={() => onRowClick(booking)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onRowClick(booking);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View booking details for ${booking.guestName}, ${booking.bookingNumber}`}
            className={cn(
              "w-full flex items-center px-6 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset",
              index % 2 === 0 ? "bg-white" : "bg-slate-50/20"
            )}
          >
            <div className="w-[12%] text-sm font-bold text-slate-900 font-mono tracking-tighter">
              {booking.bookingNumber}
            </div>
            
            <div className="w-[20%] flex flex-col">
              <span className="text-sm font-bold text-slate-900 truncate pr-4 group-hover:text-indigo-600 transition-colors">
                {booking.guestName}
              </span>
              <span className="text-[9px] text-slate-400 font-black uppercase">Verified Identity</span>
            </div>

            <div className="w-[15%]">
               <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                 {booking.roomType}
               </span>
            </div>

            <div className="w-[20%] flex flex-col">
               <div className="text-[11px] font-bold text-slate-700">
                 {booking.checkInDate}
               </div>
               <div className="text-[9px] text-slate-400 flex items-center gap-1 font-bold">
                  UNTIL {booking.checkOutDate}
               </div>
            </div>

            <div className="w-[15%]">
              <div className="flex flex-col gap-1">
                <BookingStatusBadge status={booking.status} />
                {booking.paymentStatus && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    booking.paymentStatus === PaymentStatus.PAID ? 'bg-green-100 text-green-700' :
                    booking.paymentStatus === PaymentStatus.PARTIALLY_PAID ? 'bg-yellow-100 text-yellow-700' :
                    'bg-rose-100 text-rose-700'
                  }`}>
                    {booking.paymentStatus}
                  </span>
                )}
              </div>
            </div>

            <div className="w-[13%] text-right px-2">
              <div className="text-sm font-black text-slate-900">{format(booking.totalAmount)}</div>
              {booking.source && (
                <div className="text-[9px] text-slate-400 font-medium mt-0.5">{booking.source}</div>
              )}
              {booking.outstandingAmount !== undefined && booking.outstandingAmount > 0 && (
                <div className="text-[9px] text-rose-600 font-bold mt-0.5">Due: {format(booking.outstandingAmount)}</div>
              )}
            </div>

            <div className="w-[5%] text-right opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                className="p-1.5 hover:bg-white rounded-lg text-slate-400 shadow-sm border border-transparent hover:border-slate-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={`More options for booking ${booking.bookingNumber}`}
              >
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dataset Footer */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
           <Info size={12} className="text-indigo-400" />
           Records: {page === 1 ? '1' : (page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalCount)} of {totalCount.toLocaleString()}
        </div>
        {isLoading && (
          <div className="flex items-center gap-2">
             <Loader2 size={12} className="animate-spin text-indigo-500" />
             <span className="text-[9px] font-black text-indigo-500 uppercase tracking-tighter">Syncing...</span>
          </div>
        )}
      </div>
    </div>
  );
};
