/**
 * Payment Summary Component
 * Phase 1 - Go-Live Ready PMS
 * 
 * Displays payment breakdown and method selection
 * Backend calculates all amounts (UI only displays)
 */

import React from 'react';

interface PaymentSummaryProps {
  totalAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  additionalCharges?: number;
  finalAmount?: number;
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  totalAmount,
  paidAmount,
  outstandingAmount,
  additionalCharges = 0,
  finalAmount,
  paymentMethod,
  onPaymentMethodChange,
}) => {
  const displayFinalAmount = finalAmount !== undefined ? finalAmount : outstandingAmount + additionalCharges;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Room Charges</span>
          <span className="font-medium">₹{totalAmount.toLocaleString()}</span>
        </div>
        {additionalCharges > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Additional Charges</span>
            <span className="font-medium">₹{additionalCharges.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">Paid Amount</span>
          <span className="font-medium text-green-600">-₹{paidAmount.toLocaleString()}</span>
        </div>
        <div className="border-t border-gray-200 pt-2">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Outstanding Amount</span>
            <span className="font-bold text-lg text-gray-900">₹{displayFinalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Method
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => onPaymentMethodChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="CASH">Cash</option>
          <option value="CREDIT_CARD">Credit Card</option>
          <option value="UPI">UPI</option>
          <option value="BANK_TRANSFER">Bank Transfer</option>
        </select>
      </div>
    </div>
  );
};
