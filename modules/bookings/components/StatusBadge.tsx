/**
 * Status Badge Component
 * Phase 1 - Go-Live Ready PMS
 * 
 * Reusable status badge with color coding
 */

import React from 'react';
import { BookingStatus, PaymentStatus } from '../bookings.types';

interface StatusBadgeProps {
  status: BookingStatus | PaymentStatus | string;
  type?: 'booking' | 'payment';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'booking' }) => {
  const getColorClasses = () => {
    if (type === 'booking') {
      switch (status) {
        case 'CONFIRMED':
          return 'bg-blue-100 text-blue-800';
        case 'CHECKED_IN':
          return 'bg-green-100 text-green-800';
        case 'CHECKED_OUT':
          return 'bg-gray-100 text-gray-800';
        case 'CANCELLED':
          return 'bg-red-100 text-red-800';
        case 'PENDING':
          return 'bg-yellow-100 text-yellow-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    } else {
      switch (status) {
        case 'PAID':
          return 'bg-green-100 text-green-800';
        case 'PENDING':
          return 'bg-yellow-100 text-yellow-800';
        case 'FAILED':
          return 'bg-red-100 text-red-800';
        case 'REFUNDED':
          return 'bg-purple-100 text-purple-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getColorClasses()}`}>
      {status}
    </span>
  );
};
