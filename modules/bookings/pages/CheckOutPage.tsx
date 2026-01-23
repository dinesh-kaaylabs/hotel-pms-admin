/**
 * Check-out Page
 * Phase 1 - Go-Live Ready PMS
 * 
 * Route: /checkout/:bookingId
 * Who Uses: Front Desk (primary), Admin
 * 
 * Flow:
 * 1. Review stay summary
 * 2. Add additional charges (mini-bar, damage, etc.)
 * 3. Review payment history
 * 4. Process final payment (if outstanding)
 * 5. Generate invoice (auto)
 * 6. Email invoice
 * 7. Confirm check-out
 */

import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCheckOut } from '../checkin-checkout.api';
import { useBookingDetails } from '../bookings.api';
import { AdditionalChargesForm } from '../components/AdditionalChargesForm';
import { PaymentSummary } from '../components/PaymentSummary';
import { InvoicePreview } from '../components/InvoicePreview';
import { useToast } from '../../../components/ui/Toast';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export const CheckOutPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [additionalCharges, setAdditionalCharges] = useState<Array<{ description: string; amount: number; category: string }>>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>('CASH');
  const [guestFeedback, setGuestFeedback] = useState<string>('');

  // Fetch booking details
  const { data: booking, isLoading: isLoadingBooking, error: bookingError } = useBookingDetails(bookingId || null);

  // Check-out mutation
  const checkOutMutation = useCheckOut();
  
  // Backend-provided amounts (no frontend calculations)
  // Calculate only additionalChargesTotal for display (sum of user-entered charges)
  const additionalChargesTotal = useMemo(() => {
    return additionalCharges.reduce((sum, charge) => sum + charge.amount, 0);
  }, [additionalCharges]);
  
  // Use backend-provided fields, fallback to 0 if not available
  const outstandingAmount = booking?.outstandingAmount ?? 0;
  const paidAmount = booking?.paidAmount ?? 0;
  // finalAmount will be calculated by backend when checkout is submitted
  // For display, we show outstandingAmount + additionalChargesTotal as estimate
  // Backend will validate and provide actual finalAmount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingId || !booking) return;

    // Backend will validate payment amount
    // Calculate paymentAmount as outstandingAmount + additionalChargesTotal
    // Backend will recalculate and validate
    const paymentAmount = outstandingAmount + additionalChargesTotal;

    if (paymentAmount < 0) {
      toast.error('Invalid payment amount');
      return;
    }

    try {
      const result = await checkOutMutation.mutateAsync({
        bookingId,
        input: {
          additionalCharges: additionalCharges.length > 0 ? additionalCharges : undefined,
          paymentMethod,
          paymentAmount,
          guestFeedback: guestFeedback || undefined,
        },
      });

      if (result.success) {
        toast.success('Guest checked out successfully. Invoice generated.');
        navigate(`/bookings`);
      }
    } catch (error: any) {
      const errorMessage = error?.message || 'Check-out failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  // Loading state
  if (isLoadingBooking) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  // Error state
  if (bookingError || !booking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertCircle className="text-red-500" size={32} />
        <p className="text-red-600">Failed to load booking details</p>
        <button
          onClick={() => navigate('/bookings')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Back to Bookings
        </button>
      </div>
    );
  }

  // Validate booking status
  if (booking.status !== 'CHECKED_IN') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertCircle className="text-yellow-500" size={32} />
        <p className="text-yellow-600">Booking is not checked in</p>
        <button
          onClick={() => navigate(`/bookings/${bookingId}`)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          View Booking
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Check-out Guest</h1>
        <p className="text-gray-600 mt-1">Booking: {booking.bookingNumber}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Stay Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Stay Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Guest Name</p>
              <p className="font-medium">{booking.guestName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Room Number</p>
              <p className="font-medium">{booking.roomNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Check-in Date</p>
              <p className="font-medium">{new Date(booking.checkInDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Check-out Date</p>
              <p className="font-medium">{new Date(booking.checkOutDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Room Charges</p>
              <p className="font-medium">₹{booking.totalAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Status</p>
              <p className="font-medium">{booking.paymentStatus}</p>
            </div>
          </div>
        </div>

        {/* Additional Charges */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Charges</h2>
          <AdditionalChargesForm
            charges={additionalCharges}
            onChange={setAdditionalCharges}
          />
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h2>
          <PaymentSummary
            totalAmount={booking.totalAmount}
            paidAmount={paidAmount}
            outstandingAmount={outstandingAmount}
            additionalCharges={additionalChargesTotal}
            finalAmount={outstandingAmount + additionalChargesTotal}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
          />
        </div>

        {/* Guest Feedback */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Guest Feedback (Optional)</h2>
          <textarea
            value={guestFeedback}
            onChange={(e) => setGuestFeedback(e.target.value)}
            placeholder="How was your stay?"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Invoice Preview (will be generated on checkout) */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Invoice</h2>
          <p className="text-sm text-gray-600 mb-4">
            Invoice will be automatically generated upon check-out
          </p>
          <InvoicePreview
            booking={booking}
            additionalCharges={additionalChargesTotal}
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(`/bookings`)}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={checkOutMutation.isPending || (outstandingAmount + additionalChargesTotal) < 0}
            className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium min-h-[44px]"
          >
            {checkOutMutation.isPending ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle2 size={20} />
                Confirm Check-out
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
