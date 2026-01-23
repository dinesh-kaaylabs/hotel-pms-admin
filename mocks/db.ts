import { UserRole } from '../auth/auth.types';
import { BookingStatus, PaymentStatus } from '../modules/bookings/bookings.types';

export const db = {
  session: {
    user: {
      id: 'staff-1',
      name: 'John Doe',
      email: 'admin@luxestay.com',
      role: UserRole.HOTEL_ADMIN,
      hotelId: 'h-101',
      hotels: [
        { id: 'h-101', name: 'LuxeStay Ocean View' },
        { id: 'h-102', name: 'LuxeStay City Express' }
      ]
    }
  },

  hotels: [
    { id: 'h-101', name: 'LuxeStay Ocean View', city: 'Goa', currency: 'INR' },
    { id: 'h-102', name: 'LuxeStay City Express', city: 'Mumbai', currency: 'INR' }
  ],

  roomTypes: [
    { id: 'rt-1', name: 'Deluxe Suite', baseOccupancy: 2, maxOccupancy: 4, active: true, basePrice: 150 },
    { id: 'rt-2', name: 'Standard King', baseOccupancy: 2, maxOccupancy: 2, active: true, basePrice: 95 }
  ],

  // Added physical rooms collection for housekeeping and maintenance tracking
  rooms: [
    { id: 'r-101', number: '101', type: 'Deluxe Suite', status: 'CLEAN', floor: 1 },
    { id: 'r-102', number: '102', type: 'Standard King', status: 'DIRTY', floor: 1 },
    { id: 'r-201', number: '201', type: 'Deluxe Suite', status: 'INSPECTED', floor: 2 },
    { id: 'r-202', number: '202', type: 'Standard King', status: 'OUT_OF_SERVICE', floor: 2 }
  ],

  inventory: [
    { id: 'inv-1', roomTypeId: 'rt-1', date: '2025-06-01', totalRooms: 10, availableRooms: 8, status: 'AVAILABLE' },
    { id: 'inv-2', roomTypeId: 'rt-2', date: '2025-06-01', totalRooms: 20, availableRooms: 15, status: 'AVAILABLE' }
  ],

  ratePlans: [
    { id: 'rp-1', name: 'Standard Rate - Refundable', roomTypeId: 'rt-1', refundable: true, status: 'ACTIVE' },
    { id: 'rp-2', name: 'Non-Refundable Promo', roomTypeId: 'rt-2', refundable: false, status: 'ACTIVE' }
  ],

  bookings: [
    { 
      id: 'b-1', 
      bookingNumber: 'LS-9901', 
      guestName: 'Alice Margeret', 
      email: 'alice@example.com',
      roomTypeId: 'rt-1', 
      roomType: 'Deluxe Suite',
      roomNumber: '101',
      status: BookingStatus.CONFIRMED, 
      checkInDate: '2025-06-01', 
      checkOutDate: '2025-06-05',
      totalAmount: 600,
      paymentStatus: PaymentStatus.PAID,
      createdAt: '2025-05-15'
    }
  ],

  guests: [
    { id: 'g-1', name: 'Alice Margeret', phone: '+91 98765 43210', email: 'alice@example.com', tags: ['VIP'], totalStays: 4, lifetimeValue: 2400, currency: 'INR' }
  ],

  guestNotes: [
    { id: 'n-1', guestId: 'g-1', note: 'Prefers high floor, allergic to feathers.', createdBy: 'Staff Admin', createdAt: '2025-05-10' }
  ],

  maintenance: [
    { id: 'm-1', roomId: 'r-102', roomNumber: '102', roomType: 'Standard King', reason: 'AC Leak', status: 'OPEN', blockedFrom: '2025-05-20', reportedBy: 'Housekeeping' }
  ],

  settlements: [
    { id: 'set-1', source: 'RAZORPAY', referenceId: 'pay_LKm8v4Xn8k', grossAmount: 10000, commission: 0, gatewayFee: 236, netAmount: 9764, currency: 'INR', status: 'SETTLED', settledAt: '2025-05-18', createdAt: '2025-05-15' }
  ],

  locks: [] as Array<{ token: string; expiry: number; roomTypeId: string }>
};