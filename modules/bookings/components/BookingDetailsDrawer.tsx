
import React, { useState } from 'react';
import { X, Calendar, DoorOpen, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Booking, BookingStatus } from '../bookings.types';
import { useUpdateBookingStatus } from '../bookings.api';
import { useProcessRefund } from '../checkin-checkout.api';
import { canPerform } from '../bookings.permissions';
import { useAuth } from '../../../auth/AuthContext';
import { BookingInvoicePanel } from './BookingInvoicePanel';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';
import { useToast } from '../../../components/ui/Toast';

interface DrawerProps {
  booking: Booking | null;
  onClose: () => void;
}

export const BookingDetailsDrawer: React.FC<DrawerProps> = ({ booking, onClose }) => {
  const { user } = useAuth();
  const { success, error } = useToast();
  const updateStatus = useUpdateBookingStatus();
  const processRefund = useProcessRefund();
  
  // State for confirmation dialogs
  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    status: BookingStatus;
    variant: 'danger' | 'primary';
  } | null>(null);
  
  // State for refund confirmation
  const [showRefundConfirm, setShowRefundConfirm] = useState(false);

  if (!booking) return null;

  const handleStatusUpdate = async (status: BookingStatus) => {
    await updateStatus.mutateAsync({ id: booking.id, status });
    setConfirmConfig(null);
    onClose();
  };

  const handleProcessRefund = async () => {
    try {
      const refundAmount = booking.paidAmount || booking.totalAmount;
      await processRefund.mutateAsync({
        bookingId: booking.id,
        amount: refundAmount,
        reason: 'Refund requested by staff',
        refundMethod: 'ORIGINAL_METHOD'
      });
      success('Refund processed successfully');
      setShowRefundConfirm(false);
      onClose();
    } catch (err) {
      error('Failed to process refund. Please try again.');
    }
  };

  const triggerConfirmation = (status: BookingStatus) => {
    if (status === BookingStatus.CANCELLED) {
      setConfirmConfig({
        isOpen: true,
        title: 'Cancel Reservation?',
        description: 'This will release the room inventory and mark the booking as cancelled. This action cannot be undone.',
        status: BookingStatus.CANCELLED,
        variant: 'danger'
      });
    } else if (status === BookingStatus.CHECKED_OUT) {
      setConfirmConfig({
        isOpen: true,
        title: 'Complete Check-Out?',
        description: 'Verify that all pending dues are settled before checking out the guest.',
        status: BookingStatus.CHECKED_OUT,
        variant: 'primary'
      });
    } else {
      handleStatusUpdate(status);
    }
  };

  const isAdmin = canPerform('VIEW_INVOICE', user?.role);

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Booking Detail</p>
                <h2 className="text-xl font-bold text-slate-900">{booking.bookingNumber}</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <section className="space-y-4">
                <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-[28px] border border-slate-100">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-100">
                    {booking.guestName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{booking.guestName}</h3>
                    <p className="text-xs text-slate-400 font-medium tracking-wide">Premium Guest • 4 historical stays</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-slate-100 rounded-[24px] shadow-sm">
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-1.5 mb-2">
                      <DoorOpen size={12} className="text-indigo-400" /> Room
                    </p>
                    <p className="text-sm font-bold text-slate-700">{booking.roomNumber}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">{booking.roomType}</p>
                  </div>
                  <div className="p-4 bg-white border border-slate-100 rounded-[24px] shadow-sm">
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-1.5 mb-2">
                      <Calendar size={12} className="text-indigo-400" /> Dates
                    </p>
                    <p className="text-sm font-bold text-slate-700 whitespace-nowrap truncate">{booking.checkInDate} - {booking.checkOutDate}</p>
                  </div>
                </div>
              </section>

              {isAdmin && (
                <section className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Payments & Billing</h3>
                  <BookingInvoicePanel bookingId={booking.id} />
                </section>
              )}

              <section className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Operational Actions</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    {canPerform('CHECK_IN', user?.role) && booking.status === BookingStatus.CONFIRMED && (
                      <button 
                        onClick={() => triggerConfirmation(BookingStatus.CHECKED_IN)}
                        className="py-4 bg-indigo-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                      >
                        Check In
                      </button>
                    )}
                    {canPerform('CHECK_OUT', user?.role) && booking.status === BookingStatus.CHECKED_IN && (
                      <button 
                        onClick={() => triggerConfirmation(BookingStatus.CHECKED_OUT)}
                        className="py-4 bg-emerald-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                      >
                        Check Out
                      </button>
                    )}
                  </div>
                  
                  {canPerform('CANCEL_BOOKING', user?.role) && (booking.status === BookingStatus.CONFIRMED || booking.status === BookingStatus.PENDING) && (
                    <button 
                      onClick={() => triggerConfirmation(BookingStatus.CANCELLED)}
                      className="py-4 border-2 border-rose-100 text-rose-600 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-rose-50 transition-all"
                    >
                      Cancel Reservation
                    </button>
                  )}
                  {canPerform('REFUND_PAYMENT', user?.role) && booking.paymentStatus === 'PAID' && (
                    <button 
                      onClick={() => setShowRefundConfirm(true)}
                      disabled={processRefund.isPending}
                      className="py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50"
                    >
                      {processRefund.isPending ? 'Processing...' : 'Process Refund'}
                    </button>
                  )}
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      <ConfirmDialog
        isOpen={!!confirmConfig}
        title={confirmConfig?.title || ''}
        description={confirmConfig?.description || ''}
        confirmLabel="Confirm Action"
        variant={confirmConfig?.variant}
        onConfirm={() => confirmConfig && handleStatusUpdate(confirmConfig.status)}
        onCancel={() => setConfirmConfig(null)}
      />

      <ConfirmDialog
        isOpen={showRefundConfirm}
        title="Process Refund?"
        description={`This will refund ${booking.paidAmount || booking.totalAmount} to the guest. This action cannot be undone.`}
        confirmLabel="Process Refund"
        variant="danger"
        onConfirm={handleProcessRefund}
        onCancel={() => setShowRefundConfirm(false)}
      />
    </>
  );
};
