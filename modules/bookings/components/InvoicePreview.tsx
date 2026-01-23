/**
 * Invoice Preview Component
 * Phase 1 - Go-Live Ready PMS
 * 
 * Displays invoice preview (before generation)
 * Shows backend-provided amounts only (no frontend calculations)
 */

import React from 'react';
import { Booking } from '../bookings.types';

interface InvoicePreviewProps {
  booking: Booking;
  additionalCharges: number;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  booking,
  additionalCharges,
}) => {
  // Display backend-provided values only
  // If not available, show placeholders
  const subtotal = booking.totalAmount + additionalCharges;
  const gstAmount = booking.gstAmount ?? null;
  const totalAmount = booking.finalAmount ?? null;

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">GST</span>
          <span className="font-medium">
            {gstAmount !== null ? `₹${gstAmount.toLocaleString()}` : '—'}
          </span>
        </div>
        <div className="border-t border-gray-300 pt-3">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Total Amount</span>
            <span className="font-bold text-lg text-gray-900">
              {totalAmount !== null ? `₹${totalAmount.toLocaleString()}` : '—'}
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          * Final amounts will be calculated by backend with accurate GST
        </p>
      </div>
    </div>
  );
};
