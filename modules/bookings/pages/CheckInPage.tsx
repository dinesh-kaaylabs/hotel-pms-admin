/**
 * Check-in Page
 * Phase 1 - Go-Live Ready PMS
 * 
 * Route: /checkin/:bookingId
 * Who Uses: Front Desk (primary), Admin
 * 
 * Flow:
 * 1. Review booking details
 * 2. Select room (from available rooms)
 * 3. Capture guest ID (optional)
 * 4. Capture payment (if needed)
 * 5. Add special requests
 * 6. Confirm check-in
 */

import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCheckIn, useAvailableRooms } from '../checkin-checkout.api';
import { useBookingDetails } from '../bookings.api';
import { RoomSelector } from '../components/RoomSelector';
import { PaymentSummary } from '../components/PaymentSummary';
import { useToast } from '../../../components/ui/Toast';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export const CheckInPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [guestIdDocument, setGuestIdDocument] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Fetch booking details
  const { data: booking, isLoading: isLoadingBooking, error: bookingError } = useBookingDetails(bookingId || null);
  
  // Map room type name to roomTypeId (backend will validate actual match)
  const roomTypeIdMap: Record<string, string> = {
    'Deluxe Suite': 'rt-1',
    'Standard Room': 'rt-2',
    'Premium Suite': 'rt-3',
  };
  
  const roomTypeId = useMemo(() => {
    return booking?.roomType ? roomTypeIdMap[booking.roomType] || 'rt-1' : null;
  }, [booking?.roomType]);
  
  // Fetch available rooms
  const { data: availableRooms, isLoading: isLoadingRooms } = useAvailableRooms(
    roomTypeId,
    booking?.checkInDate || '',
    booking?.checkOutDate || ''
  );

  // Check-in mutation
  const checkInMutation = useCheckIn();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRoomId || !bookingId) {
      toast.error('Please select a room');
      return;
    }

    try {
      const result = await checkInMutation.mutateAsync({
        bookingId,
        input: {
          roomId: selectedRoomId,
          guestIdDocument: guestIdDocument || undefined,
          paymentMethod: paymentMethod || undefined,
          specialRequests: specialRequests || undefined,
        },
      });

      if (result.success) {
        toast.success('Guest checked in successfully');
        navigate(`/bookings`);
      }
    } catch (error: any) {
      const errorMessage = error?.message || 'Check-in failed. Please try again.';
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
  if (booking.status !== 'CONFIRMED') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertCircle className="text-yellow-500" size={32} />
        <p className="text-yellow-600">Booking is not in CONFIRMED status</p>
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
        <h1 className="text-2xl font-bold text-gray-900">Check-in Guest</h1>
        <p className="text-gray-600 mt-1">Booking: {booking.bookingNumber}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Booking Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><p className="text-sm text-gray-600">Guest Name</p><p className="font-medium">{booking.guestName}</p></div>
            <div><p className="text-sm text-gray-600">Room Type</p><p className="font-medium">{booking.roomType}</p></div>
            <div><p className="text-sm text-gray-600">Check-in Date</p><p className="font-medium">{new Date(booking.checkInDate).toLocaleDateString()}</p></div>
            <div><p className="text-sm text-gray-600">Check-out Date</p><p className="font-medium">{new Date(booking.checkOutDate).toLocaleDateString()}</p></div>
            <div><p className="text-sm text-gray-600">Total Amount</p><p className="font-medium">₹{booking.totalAmount.toLocaleString()}</p></div>
            <div><p className="text-sm text-gray-600">Payment Status</p><p className="font-medium">{booking.paymentStatus}</p></div>
          </div>
        </div>

        {/* Room Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Room</h2>
          {isLoadingRooms ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="animate-spin text-indigo-600" size={24} />
            </div>
          ) : (
            <RoomSelector
              rooms={availableRooms || []}
              selectedRoomId={selectedRoomId}
              onSelectRoom={setSelectedRoomId}
            />
          )}
        </div>

        {/* Guest ID Document */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Guest ID Document</h2>
          <input
            type="text"
            value={guestIdDocument}
            onChange={(e) => setGuestIdDocument(e.target.value)}
            placeholder="Enter ID document details (optional)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Payment (if needed) */}
        {booking.paymentStatus === 'PENDING' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment</h2>
            <PaymentSummary
              totalAmount={booking.totalAmount}
              paidAmount={0}
              outstandingAmount={booking.totalAmount}
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
            />
          </div>
        )}

        {/* Special Requests */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Special Requests</h2>
          <textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="Add any special requests or notes..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
            disabled={!selectedRoomId || checkInMutation.isPending}
            className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium min-h-[44px]"
          >
            {checkInMutation.isPending ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle2 size={20} />
                Confirm Check-in
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
