
import { BookingStatus } from '../../modules/bookings/bookings.types';
import { UserRole } from '../../auth/auth.types';

export const store = {
  session: {
    user: null as any,
    accessToken: null as string | null,
    activeHotelId: 'h-101',
  },

  tenants: [
    { id: 't-1', name: 'LuxeStay Groups', domain: 'luxestay.com' }
  ],

  hotels: [
    { id: 'h-101', name: 'LuxeStay Ocean View', address: 'Goa, India', timezone: 'IST', currency: 'INR' },
    { id: 'h-102', name: 'LuxeStay City Express', address: 'Mumbai, India', timezone: 'IST', currency: 'INR' }
  ],

  roles: [
    { id: 'r-1', name: 'SUPER_ADMIN' },
    { id: 'r-2', name: 'HOTEL_ADMIN' },
    { id: 'r-3', name: 'STAFF' }
  ],

  staff: [
    { id: 's-1', name: 'John Admin', email: 'admin@luxestay.com', role: 'HOTEL_ADMIN', hotelId: 'h-101' }
  ],

  roomTypes: [
    { id: 'rt-1', name: 'Deluxe Suite', baseCapacity: 2, maxCapacity: 4, basePrice: 12000 },
    { id: 'rt-2', name: 'Standard Room', baseCapacity: 2, maxCapacity: 2, basePrice: 5500 }
  ],

  rooms: [
    { id: 'rm-101', number: '101', typeId: 'rt-1', status: 'CLEAN', floor: 1 },
    { id: 'rm-102', number: '102', typeId: 'rt-1', status: 'DIRTY', floor: 1 },
    { id: 'rm-201', number: '201', typeId: 'rt-2', status: 'CLEAN', floor: 2 }
  ],

  bookings: [
    { 
      id: 'b-1', 
      bookingNumber: 'LS-2025-001', 
      guestName: 'Alice Johnson', 
      email: 'alice@example.com',
      roomTypeId: 'rt-1', 
      status: 'CONFIRMED', 
      checkIn: '2025-06-01', 
      checkOut: '2025-06-05',
      totalAmount: 48000
    }
  ],

  inventoryLocks: [] as Array<{ token: string; expiresAt: string; roomTypeId: string }>,

  maintenanceTickets: [
    { id: 'mt-1', roomId: 'rm-102', reason: 'AC Leakage', status: 'OPEN', createdAt: '2025-05-10' }
  ],

  transactions: [] as any[],
  invoices: [] as any[],

  settlements: {
    razorpay: [
      { id: 'p-1', amount: 50000, status: 'SETTLED', settledAt: '2025-05-01' }
    ],
    ota: [
      { id: 'o-1', source: 'Booking.com', amount: 12000, status: 'PENDING' }
    ]
  }
};
