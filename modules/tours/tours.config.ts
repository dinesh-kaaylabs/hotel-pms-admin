
import { UserRole } from '../../auth/auth.types';

export type TourStep = {
  id: string;
  selector: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
};

export type TourConfig = {
  id: string;
  roles: UserRole[];
  steps: TourStep[];
};

export const TOURS: TourConfig[] = [
  {
    id: 'staff-onboarding',
    roles: [UserRole.STAFF, UserRole.HOTEL_ADMIN, UserRole.SUPER_ADMIN],
    steps: [
      {
        id: 'kpis',
        selector: '[data-tour="dashboard-kpis"]',
        title: 'Property Pulse',
        description: 'Track real-time occupancy and revenue performance at a glance.',
        position: 'bottom'
      },
      {
        id: 'bookings',
        selector: '[data-tour="nav-bookings"]',
        title: 'Manage Reservations',
        description: 'View, create, and manage all guest stays across all channels.',
        position: 'right'
      },
      {
        id: 'housekeeping',
        selector: '[data-tour="nav-housekeeping"]',
        title: 'Room Readiness',
        description: 'Monitor cleaning progress and assign tasks to your floor staff.',
        position: 'right'
      }
    ]
  },
  {
    id: 'admin-revenue-onboarding',
    roles: [UserRole.HOTEL_ADMIN, UserRole.SUPER_ADMIN],
    steps: [
      {
        id: 'pricing',
        selector: '[data-tour="nav-pricing"]',
        title: 'Revenue Management',
        description: 'Centrally manage rates and inventory sync across all OTAs.',
        position: 'right'
      },
      {
        id: 'finance',
        selector: '[data-tour="nav-finance"]',
        title: 'Financial Oversight',
        description: 'Audit invoices, track GST compliance, and reconcile payouts.',
        position: 'right'
      },
      {
        id: 'reports',
        selector: '[data-tour="nav-reports"]',
        title: 'Strategic Insights',
        description: 'Access deep-dive analytics to optimize your property performance.',
        position: 'right'
      }
    ]
  }
];
