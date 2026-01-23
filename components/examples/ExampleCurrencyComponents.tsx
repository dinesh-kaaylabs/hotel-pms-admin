import React from 'react';
import { useCurrency } from '../../providers/CurrencyProvider';

/**
 * Example Component: Price Display
 * 
 * Shows how to use the currency system in a real component
 * 
 * This component:
 * 1. Gets the currency context via useCurrency() hook
 * 2. Uses format() to display prices with correct symbol
 * 3. Automatically updates when currency changes globally
 * 4. No hardcoded symbols
 */
export const ExamplePriceComponent: React.FC<{ price: number }> = ({ price }) => {
  const { format, currency, config } = useCurrency();

  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      {/* Display price with formatted currency */}
      <p className="text-2xl font-bold">{format(price)}</p>
      
      {/* Show current currency info */}
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
        Displayed in {config.label} ({config.code})
      </p>
      
      {/* Show current selected currency */}
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
        Symbol: {config.symbol}
      </p>
    </div>
  );
};

/**
 * Example Component: Booking Table with Prices
 */
export const ExampleBookingTable: React.FC<{
  bookings: Array<{ id: string; guest: string; total: number; paid: number }>;
}> = ({ bookings }) => {
  const { format } = useCurrency();

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-slate-200 dark:border-slate-700">
          <th className="text-left p-2">Guest Name</th>
          <th className="text-right p-2">Total Amount</th>
          <th className="text-right p-2">Paid Amount</th>
          <th className="text-right p-2">Balance</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr
            key={booking.id}
            className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <td className="p-2">{booking.guest}</td>
            <td className="text-right p-2 font-medium">{format(booking.total)}</td>
            <td className="text-right p-2 font-medium text-green-600">
              {format(booking.paid)}
            </td>
            <td className="text-right p-2 font-medium">
              {format(booking.total - booking.paid)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
