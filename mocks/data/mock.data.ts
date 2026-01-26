/**
 * 🏨 LUXESTAY PMS - CENTRALIZED ENTERPRISE MOCK DATA (2025–2026)
 * 
 * Multi-tenant, multi-hotel, multi-user architecture.
 * Hand-crafted literal data for production-grade SaaS demo.
 * Relational integrity preserved across all tables.
 */

// ============================================================================
// CORE SAAS: TENANTS & SUBSCRIPTIONS
// ============================================================================

export const tenantSubscriptionMockData = {
  plans: [
    { id: 'plan-01', name: 'Starter', maxHotels: 1, maxUsers: 10, price: 150000, billingCycle: 'ANNUAL' },
    { id: 'plan-02', name: 'Professional', maxHotels: 5, maxUsers: 50, price: 450000, billingCycle: 'ANNUAL' },
    { id: 'plan-03', name: 'Enterprise', maxHotels: 999, maxUsers: 999, price: 1500000, billingCycle: 'ANNUAL' }
  ],
  tenants: [
    { id: 't-01', name: 'Taj Hospitality Group', status: 'ACTIVE', subscriptionId: 'sub-01', createdAt: '2024-01-15T10:00:00Z', contactEmail: 'ops@tajgroup.com', contactPhone: '+91 22 6665 3366', billingAddress: 'Apollo Bunder, Mumbai, MH 400001' },
    { id: 't-02', name: 'Oberoi Hotels & Resorts', status: 'ACTIVE', subscriptionId: 'sub-02', createdAt: '2024-02-10T11:00:00Z', contactEmail: 'it@oberoigroup.com', contactPhone: '+91 11 2389 0505', billingAddress: '7, Sham Nath Marg, Delhi 110054' },
    { id: 't-03', name: 'ITC Hotels Division', status: 'ACTIVE', subscriptionId: 'sub-03', createdAt: '2024-03-05T09:30:00Z', contactEmail: 'pms@itchotels.in', contactPhone: '+91 124 417 1717', billingAddress: 'ITC Green Centre, Gurgaon, HR 122002' },
    { id: 't-04', name: 'Lemon Tree Hotels Ltd', status: 'ACTIVE', subscriptionId: 'sub-04', createdAt: '2024-04-12T14:20:00Z', contactEmail: 'billing@lemontree.com', contactPhone: '+91 11 4605 0101', billingAddress: 'Aerocity, New Delhi 110037' },
    { id: 't-05', name: 'Leela Palaces & Resorts', status: 'ACTIVE', subscriptionId: 'sub-05', createdAt: '2024-05-20T16:45:00Z', contactEmail: 'reservations@theleela.com', contactPhone: '+91 22 6691 1234', billingAddress: 'Sahar, Mumbai, MH 400059' },
    { id: 't-06', name: 'Sarovar Hotels Group', status: 'ACTIVE', subscriptionId: 'sub-06', createdAt: '2024-06-01T10:00:00Z', contactEmail: 'info@sarovarhotels.com' },
    { id: 't-07', name: 'Radisson Hotel Group India', status: 'ACTIVE', subscriptionId: 'sub-07', createdAt: '2024-06-15T12:00:00Z' },
    { id: 't-08', name: 'Accor Hotels India', status: 'ACTIVE', subscriptionId: 'sub-08', createdAt: '2024-07-01T08:00:00Z' },
    { id: 't-09', name: 'Marriott International (SA)', status: 'ACTIVE', subscriptionId: 'sub-09', createdAt: '2024-07-20T15:30:00Z' },
    { id: 't-10', name: 'Hyatt India Region', status: 'ACTIVE', subscriptionId: 'sub-10', createdAt: '2024-08-05T11:15:00Z' },
    { id: 't-11', name: 'InterContinental Group (IHG)', status: 'ACTIVE', subscriptionId: 'sub-11', createdAt: '2024-08-25T14:00:00Z' },
    { id: 't-12', name: 'Fortune Park Hotels', status: 'ACTIVE', subscriptionId: 'sub-12', createdAt: '2024-09-10T10:30:00Z' },
    { id: 't-13', name: 'Roseate Hotels & Resorts', status: 'ACTIVE', subscriptionId: 'sub-13', createdAt: '2024-10-01T09:00:00Z' },
    { id: 't-14', name: 'Vivanta Hotels Division', status: 'ACTIVE', subscriptionId: 'sub-14', createdAt: '2024-10-15T13:45:00Z' },
    { id: 't-15', name: 'Sterling Holiday Resorts', status: 'ACTIVE', subscriptionId: 'sub-15', createdAt: '2024-11-01T11:00:00Z' }
  ],
  subscriptions: [
    { id: 'sub-01', tenantId: 't-01', planId: 'plan-03', status: 'ACTIVE', amount: 1500000, currentPeriodEnd: '2026-01-01T00:00:00Z' },
    { id: 'sub-02', tenantId: 't-02', planId: 'plan-03', status: 'ACTIVE', amount: 1500000, currentPeriodEnd: '2026-01-01T00:00:00Z' },
    { id: 'sub-03', tenantId: 't-03', planId: 'plan-03', status: 'ACTIVE', amount: 1200000, currentPeriodEnd: '2026-02-01T00:00:00Z' },
    { id: 'sub-04', tenantId: 't-04', planId: 'plan-02', status: 'ACTIVE', amount: 450000, currentPeriodEnd: '2025-12-01T00:00:00Z' },
    { id: 'sub-05', tenantId: 't-05', planId: 'plan-03', status: 'ACTIVE', amount: 1500000, currentPeriodEnd: '2026-03-01T00:00:00Z' },
    { id: 'sub-06', tenantId: 't-06', planId: 'plan-02', status: 'ACTIVE', amount: 450000, currentPeriodEnd: '2026-01-01T00:00:00Z' },
    { id: 'sub-07', tenantId: 't-07', planId: 'plan-03', status: 'ACTIVE', amount: 1800000, currentPeriodEnd: '2026-05-01T00:00:00Z' },
    { id: 'sub-08', tenantId: 't-08', planId: 'plan-03', status: 'ACTIVE', amount: 1500000, currentPeriodEnd: '2026-04-01T00:00:00Z' },
    { id: 'sub-09', tenantId: 't-09', planId: 'plan-03', status: 'ACTIVE', amount: 2000000, currentPeriodEnd: '2026-07-01T00:00:00Z' },
    { id: 'sub-10', tenantId: 't-10', planId: 'plan-03', status: 'ACTIVE', amount: 1500000, currentPeriodEnd: '2026-08-01T00:00:00Z' },
    { id: 'sub-11', tenantId: 't-11', planId: 'plan-03', status: 'ACTIVE', amount: 1500000, currentPeriodEnd: '2026-08-01T00:00:00Z' },
    { id: 'sub-12', tenantId: 't-12', planId: 'plan-02', status: 'ACTIVE', amount: 500000, currentPeriodEnd: '2026-09-01T00:00:00Z' },
    { id: 'sub-13', tenantId: 't-13', planId: 'plan-02', status: 'ACTIVE', amount: 500000, currentPeriodEnd: '2026-10-01T00:00:00Z' },
    { id: 'sub-14', tenantId: 't-14', planId: 'plan-03', status: 'ACTIVE', amount: 1500000, currentPeriodEnd: '2026-11-01T00:00:00Z' },
    { id: 'sub-15', tenantId: 't-15', planId: 'plan-02', status: 'ACTIVE', amount: 450000, currentPeriodEnd: '2026-12-01T00:00:00Z' }
  ],
  featureEntitlements: [
    { id: 'ent-01', tenantId: 't-01', featureKey: 'WHATSAPP_COMMS', enabled: true },
    { id: 'ent-02', tenantId: 't-01', featureKey: 'AUDIT_LOGS', enabled: true },
    { id: 'ent-03', tenantId: 't-01', featureKey: 'CHANNEL_MANAGER', enabled: true },
    { id: 'ent-04', tenantId: 't-02', featureKey: 'MOBILE_CHECKIN', enabled: true },
    { id: 'ent-05', tenantId: 't-03', featureKey: 'ADVANCED_ANALYTICS', enabled: true }
  ],
  billingHistory: [
    { id: 'bill-01', tenantId: 't-01', amount: 1500000, status: 'PAID', paidAt: '2025-01-01T00:00:00Z', invoiceNumber: 'INV-T01-2025-01' },
    { id: 'bill-02', tenantId: 't-02', amount: 1500000, status: 'PAID', paidAt: '2025-01-01T00:00:00Z', invoiceNumber: 'INV-T02-2025-01' },
    { id: 'bill-03', tenantId: 't-03', amount: 1200000, status: 'PAID', paidAt: '2025-02-01T00:00:00Z', invoiceNumber: 'INV-T03-2025-02' },
    { id: 'bill-04', tenantId: 't-04', amount: 450000, status: 'PAID', paidAt: '2024-12-01T00:00:00Z', invoiceNumber: 'INV-T04-2024-12' },
    { id: 'bill-05', tenantId: 't-05', amount: 1500000, status: 'PAID', paidAt: '2025-03-01T00:00:00Z', invoiceNumber: 'INV-T05-2025-03' }
  ],
  featureFlags: [
    { id: 'ff-01', key: 'WHATSAPP_COMMS', name: 'WhatsApp Notifications', defaultValue: true, tenantId: 't-01' },
    { id: 'ff-02', key: 'AUDIT_LOGS', name: 'Enhanced Audit Logs', defaultValue: true, tenantId: 't-01' },
    { id: 'ff-03', key: 'CHANNEL_MANAGER', name: 'OTA Channel Manager', defaultValue: true, tenantId: 't-01' },
    { id: 'ff-04', key: 'MULTI_HOTEL', name: 'Multi-Hotel Dashboard', defaultValue: true, tenantId: 't-01' },
    { id: 'ff-05', key: 'DYNAMIC_PRICING', name: 'AI Dynamic Pricing', defaultValue: false, tenantId: 't-01' },
    { id: 'ff-06', key: 'GROUP_BILLING', name: 'Master Billing Support', defaultValue: true, tenantId: 't-01' },
    { id: 'ff-07', key: 'AUTO_NIGHT_AUDIT', name: 'Automated Night Audit', defaultValue: true, tenantId: 't-01' },
    { id: 'ff-08', key: 'LOYALTY_SYSTEM', name: 'Internal Loyalty Points', defaultValue: true, tenantId: 't-01' },
    { id: 'ff-09', key: 'MOBILE_CHECKIN', name: 'Guest Mobile Check-in', defaultValue: true, tenantId: 't-02' },
    { id: 'ff-10', key: 'HOUSEKEEPING_APP', name: 'HK Mobile Portal', defaultValue: true, tenantId: 't-02' },
    { id: 'ff-11', key: 'MAINTENANCE_TICKETS', name: 'Engineering Module', defaultValue: true, tenantId: 't-03' },
    { id: 'ff-12', key: 'ADVANCED_ANALYTICS', name: 'RevPAR/TrevPAR Metrics', defaultValue: true, tenantId: 't-03' },
    { id: 'ff-13', key: 'APPROVAL_FLOW', name: 'Admin Approval Chains', defaultValue: true, tenantId: 't-01' },
    { id: 'ff-14', key: 'FOLIO_SPLIT', name: 'Advanced Folio Management', defaultValue: true, tenantId: 't-01' },
    { id: 'ff-15', key: 'TAX_ENGINE', name: 'GST/VAT Compliance', defaultValue: true, tenantId: 't-01' }
  ]
};

// ============================================================================
// IDENTITY & ACCESS
// ============================================================================

export const authMockData = {
  adminUser: {
    id: 'u-t01-01',
    name: 'Vikram Malhotra',
    email: 'v.malhotra@taj.com',
    password: 'Password123!',
    role: 'HOTEL_ADMIN',
    tenantId: 't-01',
    department: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
    hotels: [
      { id: 'h-01', name: 'Taj Mahal Palace Mumbai' },
      { id: 'h-02', name: 'Taj Rambagh Palace Jaipur' },
      { id: 'h-03', name: 'Taj Lands End Mumbai' }
    ]
  },
  mfaCode: '123456',
  mfaToken: 'mfa_tok_taj_2025_secure',
  admins: [
    { id: 'u-t01-01', name: 'Vikram Malhotra', email: 'v.malhotra@taj.com', password: 'Password123!', role: 'HOTEL_ADMIN', tenantId: 't-01', department: 'ADMIN' },
    { id: 'u-t02-01', name: 'Anjali Sharma', email: 'anjali@oberoi.com', password: 'Password123!', role: 'HOTEL_ADMIN', tenantId: 't-02', department: 'ADMIN' },
    { id: 'u-t03-01', name: 'Siddharth Roy', email: 'siddharth@itc.in', password: 'Password123!', role: 'HOTEL_ADMIN', tenantId: 't-03', department: 'ADMIN' },
    { id: 'u-t04-01', name: 'Priya Iyer', email: 'priya@lemontree.com', password: 'Password123!', role: 'HOTEL_ADMIN', tenantId: 't-04', department: 'ADMIN' },
    { id: 'u-t05-01', name: 'Rohan Gupta', email: 'rohan@theleela.com', password: 'Password123!', role: 'HOTEL_ADMIN', tenantId: 't-05', department: 'ADMIN' },
    { id: 'u-t06-01', name: 'Maya Reddy', email: 'maya@sarovar.com', password: 'Password123!', role: 'HOTEL_ADMIN', tenantId: 't-06', department: 'ADMIN' },
    { id: 'u-t07-01', name: 'Amitabh Bachchan', email: 'amitabh@radisson.in', password: 'Password123!', role: 'HOTEL_ADMIN', tenantId: 't-07', department: 'ADMIN' },
    { id: 'u-t08-01', name: 'Deepika P', email: 'deepika@accor.in', password: 'Password123!', role: 'HOTEL_ADMIN', tenantId: 't-08', department: 'ADMIN' },
    { id: 'u-t09-01', name: 'Shah Rukh Khan', email: 'srk@marriott.com', password: 'Password123!', role: 'HOTEL_ADMIN', tenantId: 't-09', department: 'ADMIN' },
    { id: 'u-t10-01', name: 'Virat Kohli', email: 'virat@hyatt.com', password: 'Password123!', role: 'HOTEL_ADMIN', tenantId: 't-10', department: 'ADMIN' },
    { id: 'u-t11-01', name: 'Sachin Tendulkar', email: 'sachin@ihgindia.com', password: 'Password123!', role: 'HOTEL_ADMIN', tenantId: 't-11', department: 'ADMIN' },
    { id: 'u-t12-01', name: 'MS Dhoni', email: 'dhoni@fortunehotels.in', password: 'Password123!', role: 'HOTEL_ADMIN', tenantId: 't-12', department: 'ADMIN' },
    { id: 'u-t13-01', name: 'Narendra M', email: 'nm@roseatehotels.com', password: 'Password123!', role: 'HOTEL_ADMIN', tenantId: 't-13', department: 'ADMIN' },
    { id: 'u-t14-01', name: 'Ratan Tata', email: 'ratan@taj.com', password: 'Password123!', role: 'HOTEL_ADMIN', tenantId: 't-14', department: 'ADMIN' },
    { id: 'u-t15-01', name: 'Sudha Murthy', email: 'sudha@sterling.com', password: 'Password123!', role: 'HOTEL_ADMIN', tenantId: 't-15', department: 'ADMIN' }
  ],
  staffUsers: [
    { id: 'u-t01-02', name: 'Rajesh Kumar', email: 'rajesh.k@taj.com', role: 'HOTEL_MANAGER', tenantId: 't-01', hotelId: 'h-01', department: 'FRONT_OFFICE' },
    { id: 'u-t01-03', name: 'Sunita Rao', email: 'sunita.r@taj.com', role: 'FRONT_DESK', tenantId: 't-01', hotelId: 'h-01', department: 'FRONT_OFFICE' },
    { id: 'u-t01-04', name: 'Amit Singh', email: 'amit.s@taj.com', role: 'HOUSEKEEPING', tenantId: 't-01', hotelId: 'h-01', department: 'HK' },
    { id: 'u-t01-05', name: 'Karan Mehra', email: 'karan.m@taj.com', role: 'HOTEL_MANAGER', tenantId: 't-01', hotelId: 'h-02', department: 'FRONT_OFFICE' },
    { id: 'u-t01-06', name: 'Lisa Dsouza', email: 'lisa.d@taj.com', role: 'FRONT_DESK', tenantId: 't-01', hotelId: 'h-02', department: 'FRONT_OFFICE' },
    { id: 'u-t01-07', name: 'Arjun P', email: 'arjun@taj.com', role: 'SECURITY', tenantId: 't-01', hotelId: 'h-01', department: 'SECURITY' },
    { id: 'u-t01-08', name: 'Meera K', email: 'meera@taj.com', role: 'CHEF', tenantId: 't-01', hotelId: 'h-01', department: 'FNB' },
    { id: 'u-t01-09', name: 'Dev R', email: 'dev@taj.com', role: 'CONCIERGE', tenantId: 't-01', hotelId: 'h-01', department: 'FRONT_OFFICE' },
    { id: 'u-t01-10', name: 'Pooja B', email: 'pooja@taj.com', role: 'MARKETING_MANAGER', tenantId: 't-01', hotelId: 'h-01', department: 'SALES' },
    { id: 'u-t01-11', name: 'Kabir Z', email: 'kabir@taj.com', role: 'RESERVATION_AGENT', tenantId: 't-01', hotelId: 'h-01', department: 'FRONT_OFFICE' },
    { id: 'u-t01-12', name: 'Maya L', email: 'maya@taj.com', role: 'BARTENDER', tenantId: 't-01', hotelId: 'h-01', department: 'FNB' },
    { id: 'u-t01-13', name: 'Ishaan S', email: 'ishaan@taj.com', role: 'IT_SUPPORT', tenantId: 't-01', hotelId: 'h-01', department: 'IT' },
    { id: 'u-t01-14', name: 'Zoya Q', email: 'zoya@taj.com', role: 'AUDITOR', tenantId: 't-01', hotelId: 'h-01', department: 'ADMIN' },
    { id: 'u-t01-15', name: 'Aryan V', email: 'aryan@taj.com', role: 'SALES_EXECUTIVE', tenantId: 't-01', hotelId: 'h-01', department: 'SALES' },
    { id: 'u-t02-02', name: 'Gopal S', email: 'gopal@oberoi.com', role: 'HOTEL_MANAGER', tenantId: 't-02', hotelId: 'h-04', department: 'FRONT_OFFICE' }
  ],
  staffShifts: [
    { id: 'sh-01', userId: 'u-t01-03', hotelId: 'h-01', shiftStartTime: '2025-05-10T06:00:00Z', shiftEndTime: '2025-05-10T14:00:00Z', cashResponsibility: true },
    { id: 'sh-02', userId: 'u-t01-07', hotelId: 'h-01', shiftStartTime: '2025-05-10T14:00:00Z', shiftEndTime: '2025-05-10T22:00:00Z', cashResponsibility: false },
    { id: 'sh-03', userId: 'u-t01-11', hotelId: 'h-01', shiftStartTime: '2025-05-10T22:00:00Z', shiftEndTime: '2025-05-11T06:00:00Z', cashResponsibility: true },
    { id: 'sh-04', userId: 'u-t01-02', hotelId: 'h-01', shiftStartTime: '2025-05-10T09:00:00Z', shiftEndTime: '2025-05-10T18:00:00Z', cashResponsibility: false },
    { id: 'sh-05', userId: 'u-t01-14', hotelId: 'h-01', shiftStartTime: '2025-05-11T22:00:00Z', shiftEndTime: '2025-05-12T06:00:00Z', cashResponsibility: true },
    { id: 'sh-06', userId: 'u-t02-02', hotelId: 'h-04', shiftStartTime: '2025-05-10T08:00:00Z', shiftEndTime: '2025-05-10T17:00:00Z', cashResponsibility: false },
    { id: 'sh-07', userId: 'u-t01-03', hotelId: 'h-01', shiftStartTime: '2025-05-11T06:00:00Z', shiftEndTime: '2025-05-11T14:00:00Z', cashResponsibility: true },
    { id: 'sh-08', userId: 'u-t01-07', hotelId: 'h-01', shiftStartTime: '2025-05-11T14:00:00Z', shiftEndTime: '2025-05-11T22:00:00Z', cashResponsibility: false },
    { id: 'sh-09', userId: 'u-t01-11', hotelId: 'h-01', shiftStartTime: '2025-05-11T22:00:00Z', shiftEndTime: '2025-05-12T06:00:00Z', cashResponsibility: true },
    { id: 'sh-10', userId: 'u-t01-08', hotelId: 'h-01', shiftStartTime: '2025-05-12T06:00:00Z', shiftEndTime: '2025-05-12T14:00:00Z', cashResponsibility: false },
    { id: 'sh-11', userId: 'u-t01-12', hotelId: 'h-01', shiftStartTime: '2025-05-12T14:00:00Z', shiftEndTime: '2025-05-12T22:00:00Z', cashResponsibility: false },
    { id: 'sh-12', userId: 'u-t01-09', hotelId: 'h-01', shiftStartTime: '2025-05-12T08:00:00Z', shiftEndTime: '2025-05-12T17:00:00Z', cashResponsibility: false },
    { id: 'sh-13', userId: 'u-t01-03', hotelId: 'h-01', shiftStartTime: '2025-05-13T06:00:00Z', shiftEndTime: '2025-05-13T14:00:00Z', cashResponsibility: true },
    { id: 'sh-14', userId: 'u-t01-07', hotelId: 'h-01', shiftStartTime: '2025-05-13T14:00:00Z', shiftEndTime: '2025-05-13T22:00:00Z', cashResponsibility: false },
    { id: 'sh-15', userId: 'u-t01-11', hotelId: 'h-01', shiftStartTime: '2025-05-13T22:00:00Z', shiftEndTime: '2025-05-14T06:00:00Z', cashResponsibility: true }
  ],
  roles: [
    { id: 'r-01', name: 'HOTEL_ADMIN', description: 'Complete access to tenant operations.' },
    { id: 'r-02', name: 'HOTEL_MANAGER', description: 'Management access for specific hotels.' },
    { id: 'r-03', name: 'FRONT_DESK', description: 'Booking and check-in operations.' },
    { id: 'r-04', name: 'HOUSEKEEPING', description: 'Room status and maintenance.' },
    { id: 'r-05', name: 'FINANCE_ADMIN', description: 'Invoicing and settlement reports.' },
    { id: 'r-06', name: 'RESERVATION_AGENT', description: 'Multi-hotel booking management.' },
    { id: 'r-07', name: 'CHEF', description: 'Kitchen and menu management.' },
    { id: 'r-08', name: 'CONCIERGE', description: 'Guest services and local assistance.' },
    { id: 'r-09', name: 'MARKETING_MANAGER', description: 'Channel and promotion management.' },
    { id: 'r-10', name: 'IT_SUPPORT', description: 'System and device management.' },
    { id: 'r-11', name: 'AUDITOR', description: 'Night audit and revenue verification.' },
    { id: 'r-12', name: 'SALES_EXECUTIVE', description: 'Corporate and group bookings.' },
    { id: 'r-13', name: 'SECURITY', description: 'Access control and safety.' },
    { id: 'r-14', name: 'BARTENDER', description: 'Bar inventory and sales.' },
    { id: 'r-15', name: 'MAINTENANCE_ENG', description: 'Engineering and repair work.' }
  ],
  permissions: [
    { key: 'bookings:view', description: 'Can view all booking records.' },
    { key: 'bookings:create', description: 'Can create new booking records.' },
    { key: 'bookings:edit', description: 'Can modify existing bookings.' },
    { key: 'finance:reconcile', description: 'Can mark payments as reconciled.' },
    { key: 'finance:invoice', description: 'Can generate tax invoices.' },
    { key: 'operations:night_audit', description: 'Can perform daily night audit.' },
    { key: 'operations:housekeeping', description: 'Can update room cleaning status.' },
    { key: 'operations:maintenance', description: 'Can log and resolve repair issues.' },
    { key: 'admin:users', description: 'Can manage staff users and roles.' },
    { key: 'admin:settings', description: 'Can change hotel configuration.' },
    { key: 'pricing:manage', description: 'Can update rate plans and yields.' },
    { key: 'reports:revenue', description: 'Can view RevPAR and ADR reports.' },
    { key: 'reports:occupancy', description: 'Can view occupancy trends.' },
    { key: 'ota:sync', description: 'Can trigger OTA channel sync.' },
    { key: 'crm:guest_profiles', description: 'Can view and edit guest history.' },
    { key: 'approvals:manage', description: 'Can manage operational approval requests.' }
  ],
  userHotelRoleMappings: [
    { id: 'urm-01', userId: 'u-t01-01', hotelId: 'h-01', roleId: 'r-01' },
    { id: 'urm-02', userId: 'u-t01-02', hotelId: 'h-01', roleId: 'r-02' },
    { id: 'urm-03', userId: 'u-t01-03', hotelId: 'h-01', roleId: 'r-03' },
    { id: 'urm-04', userId: 'u-t01-04', hotelId: 'h-01', roleId: 'r-04' },
    { id: 'urm-05', userId: 'u-t01-05', hotelId: 'h-02', roleId: 'r-02' },
    { id: 'urm-06', userId: 'u-t01-14', hotelId: 'h-01', roleId: 'r-11' },
    { id: 'urm-07', userId: 'u-t01-15', hotelId: 'h-01', roleId: 'r-12' },
    { id: 'urm-08', userId: 'u-t01-13', hotelId: 'h-01', roleId: 'r-10' },
    { id: 'urm-09', userId: 'u-t01-11', hotelId: 'h-01', roleId: 'r-06' },
    { id: 'urm-10', userId: 'u-t02-01', hotelId: 'h-04', roleId: 'r-01' },
    { id: 'urm-11', userId: 'u-t02-02', hotelId: 'h-04', roleId: 'r-02' },
    { id: 'urm-12', userId: 'u-t02-03', hotelId: 'h-04', roleId: 'r-03' },
    { id: 'urm-13', userId: 'u-t03-01', hotelId: 'h-06', roleId: 'r-01' },
    { id: 'urm-14', userId: 'u-t03-02', hotelId: 'h-06', roleId: 'r-03' },
    { id: 'urm-15', userId: 'u-t03-03', hotelId: 'h-06', roleId: 'r-02' }
  ],
  cashClosures: [
    { id: 'cc-01', shiftId: 'sh-01', expectedCash: 12500, actualCash: 12500, variance: 0, approvedBy: 'u-t01-02', status: 'CLOSED', denominationBreakdown: { "500": 20, "200": 10, "100": 5 }, businessDate: '2025-05-10' },
    { id: 'cc-02', shiftId: 'sh-03', expectedCash: 42000, actualCash: 42000, variance: 0, approvedBy: 'u-t01-02', status: 'CLOSED', denominationBreakdown: { "2000": 10, "500": 40, "200": 10 }, businessDate: '2025-05-10' },
    { id: 'cc-03', shiftId: 'sh-05', expectedCash: 8000, actualCash: 7950, variance: -50, approvedBy: 'u-t01-01', status: 'RECONCILED', denominationBreakdown: { "500": 15, "200": 2, "50": 1 }, businessDate: '2025-05-11' },
    { id: 'cc-04', shiftId: 'sh-07', expectedCash: 2000, actualCash: 2000, variance: 0, approvedBy: 'u-t02-01', status: 'CLOSED', denominationBreakdown: { "500": 4 }, businessDate: '2025-05-11' },
    { id: 'cc-05', shiftId: 'sh-09', expectedCash: 3000, actualCash: 3000, variance: 0, approvedBy: 'u-t03-01', status: 'CLOSED', denominationBreakdown: { "500": 6 }, businessDate: '2025-05-11' },
    { id: 'cc-06', shiftId: 'sh-13', expectedCash: 5000, actualCash: 5000, variance: 0, approvedBy: 'u-t01-02', status: 'CLOSED', denominationBreakdown: { "500": 10 }, businessDate: '2025-05-13' },
    { id: 'cc-07', shiftId: 'sh-15', expectedCash: 4500, actualCash: 4500, variance: 0, approvedBy: 'u-t04-01', status: 'CLOSED', denominationBreakdown: { "500": 9 }, businessDate: '2025-05-13' },
    { id: 'cc-08', shiftId: 'sh-01', expectedCash: 11000, actualCash: 11000, variance: 0, approvedBy: 'u-t01-02', status: 'CLOSED', denominationBreakdown: { "500": 22 }, businessDate: '2025-05-14' },
    { id: 'cc-09', shiftId: 'sh-03', expectedCash: 15000, actualCash: 15100, variance: 100, approvedBy: 'u-t01-02', status: 'OPEN', denominationBreakdown: { "500": 30, "100": 1 }, businessDate: '2025-05-14' },
    { id: 'cc-10', shiftId: 'sh-05', expectedCash: 1200, actualCash: 1200, variance: 0, approvedBy: 'u-t01-02', status: 'CLOSED', denominationBreakdown: { "100": 12 }, businessDate: '2025-05-15' },
    { id: 'cc-11', shiftId: 'sh-07', expectedCash: 3500, actualCash: 3500, variance: 0, approvedBy: 'u-t02-01', status: 'CLOSED', denominationBreakdown: { "500": 7 }, businessDate: '2025-05-15' },
    { id: 'cc-12', shiftId: 'sh-09', expectedCash: 4400, actualCash: 4400, variance: 0, approvedBy: 'u-t03-01', status: 'CLOSED', denominationBreakdown: { "200": 22 }, businessDate: '2025-05-15' },
    { id: 'cc-13', shiftId: 'sh-13', expectedCash: 980, actualCash: 980, variance: 0, approvedBy: 'u-t01-02', status: 'CLOSED', denominationBreakdown: { "100": 9, "20": 4 }, businessDate: '2025-05-16' },
    { id: 'cc-14', shiftId: 'sh-15', expectedCash: 18000, actualCash: 18000, variance: 0, approvedBy: 'u-t04-01', status: 'CLOSED', denominationBreakdown: { "2000": 9 }, businessDate: '2025-05-16' },
    { id: 'cc-15', shiftId: 'sh-01', expectedCash: 12500, actualCash: 12500, variance: 0, approvedBy: 'u-t01-02', status: 'CLOSED', denominationBreakdown: { "500": 25 }, businessDate: '2025-05-17' }
  ]
};

// ============================================================================
// HOTELS: CORE OPERATIONS
// ============================================================================

export const hotelsMockData = {
  hotels: [
    { id: 'h-01', name: 'Taj Mahal Palace Mumbai', city: 'Mumbai', status: 'ACTIVE', tenantId: 't-01', address: 'Apollo Bunder, Mumbai 400001', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-02', name: 'Taj Rambagh Palace Jaipur', city: 'Jaipur', status: 'ACTIVE', tenantId: 't-01', address: 'Bhawani Singh Rd, Jaipur 302005', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-03', name: 'Taj Lands End Mumbai', city: 'Mumbai', status: 'ACTIVE', tenantId: 't-01', address: 'Bandstand, Bandra (W), Mumbai 400050', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-04', name: 'The Oberoi Amarvilas Agra', city: 'Agra', status: 'ACTIVE', tenantId: 't-02', address: 'Taj East Gate Rd, Agra 282001', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-05', name: 'The Oberoi Rajvilas Jaipur', city: 'Jaipur', status: 'ACTIVE', tenantId: 't-02', address: 'Goner Rd, Jaipur 302031', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-06', name: 'ITC Grand Chola Chennai', city: 'Chennai', status: 'ACTIVE', tenantId: 't-03', address: 'Mount Rd, Guindy, Chennai 600032', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-07', name: 'ITC Maurya New Delhi', city: 'Delhi', status: 'ACTIVE', tenantId: 't-03', address: 'Sardar Patel Marg, Delhi 110021', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-08', name: 'Lemon Tree Premier Delhi Airport', city: 'Delhi', status: 'ACTIVE', tenantId: 't-04', address: 'Aerocity, New Delhi 110037', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-09', name: 'Lemon Tree Premier Mumbai', city: 'Mumbai', status: 'ACTIVE', tenantId: 't-04', address: 'Andheri East, Mumbai 400059', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-10', name: 'The Leela Palace Bengaluru', city: 'Bangalore', status: 'ACTIVE', tenantId: 't-05', address: 'Old Airport Rd, Bangalore 560008', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-11', name: 'Sarovar Portico Ahmedabad', city: 'Ahmedabad', status: 'ACTIVE', tenantId: 't-06', address: 'Ellis Bridge, Ahmedabad 380006', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-12', name: 'Radisson Blu Resort Goa', city: 'Goa', status: 'ACTIVE', tenantId: 't-07', address: 'Cavelossim Beach, Goa 403731', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-13', name: 'Novotel Mumbai Juhu Beach', city: 'Mumbai', status: 'ACTIVE', tenantId: 't-08', address: 'Juhu Tara Rd, Mumbai 400049', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-14', name: 'JW Marriott Walnut Grove Mussoorie', city: 'Mussoorie', status: 'ACTIVE', tenantId: 't-09', address: 'Village Siya, Mussoorie 248179', timezone: 'Asia/Kolkata', currency: 'INR' },
    { id: 'h-15', name: 'Grand Hyatt Mumbai', city: 'Mumbai', status: 'ACTIVE', tenantId: 't-10', address: 'Santacruz East, Mumbai 400055', timezone: 'Asia/Kolkata', currency: 'INR' }
  ],
  hotelSettings: [
    { hotelId: 'h-01', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'taj_mahal_wifi', parkingAvailable: true },
    { hotelId: 'h-02', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'rambagh_wifi', parkingAvailable: true },
    { hotelId: 'h-03', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'landsend_wifi', parkingAvailable: true },
    { hotelId: 'h-04', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'oberoi_wifi', parkingAvailable: true },
    { hotelId: 'h-05', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'rajvilas_wifi', parkingAvailable: true },
    { hotelId: 'h-06', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'grandchola_wifi', parkingAvailable: true },
    { hotelId: 'h-07', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'maurya_wifi', parkingAvailable: true },
    { hotelId: 'h-08', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'lemontree_wifi', parkingAvailable: true },
    { hotelId: 'h-09', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'lemontree_wifi', parkingAvailable: true },
    { hotelId: 'h-10', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'leela_wifi', parkingAvailable: true },
    { hotelId: 'h-11', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'sarovar_wifi', parkingAvailable: true },
    { hotelId: 'h-12', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'radisson_wifi', parkingAvailable: true },
    { hotelId: 'h-13', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'novotel_wifi', parkingAvailable: true },
    { hotelId: 'h-14', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'jwmarriott_wifi', parkingAvailable: true },
    { hotelId: 'h-15', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'hyatt_wifi', parkingAvailable: true }
  ],
  branding: [
    { tenantId: 't-01', primaryColor: '#B22222', logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=taj' },
    { tenantId: 't-02', primaryColor: '#00008B', logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=oberoi' },
    { tenantId: 't-03', primaryColor: '#DAA520', logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=itc' },
    { tenantId: 't-04', primaryColor: '#7CFC00', logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=lemon' },
    { tenantId: 't-05', primaryColor: '#FFD700', logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=leela' },
    { tenantId: 't-06', primaryColor: '#800000', logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=sarovar' },
    { tenantId: 't-07', primaryColor: '#00BFFF', logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=radisson' },
    { tenantId: 't-08', primaryColor: '#4B0082', logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=accor' },
    { tenantId: 't-09', primaryColor: '#C0C0C0', logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=marriott' },
    { tenantId: 't-10', primaryColor: '#F5F5DC', logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=hyatt' },
    { tenantId: 't-11', primaryColor: '#2F4F4F', logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=ihg' },
    { tenantId: 't-12', primaryColor: '#D2B48C', logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=fortune' },
    { tenantId: 't-13', primaryColor: '#E6E6FA', logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=roseate' },
    { tenantId: 't-14', primaryColor: '#FFF0F5', logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=vivanta' },
    { tenantId: 't-15', primaryColor: '#F0E68C', logoUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=sterling' }
  ]
};

// ============================================================================
// ROOMS & INVENTORY
// ============================================================================

export const roomsMockData = {
  inventory: [
    { id: 'inv-01', roomTypeId: 'rt-01', date: '2025-06-01', totalRooms: 10, availableRooms: 7, bookedRooms: 3 },
    { id: 'inv-02', roomTypeId: 'rt-02', date: '2025-06-01', totalRooms: 15, availableRooms: 10, bookedRooms: 5 },
    { id: 'inv-03', roomTypeId: 'rt-01', date: '2025-06-02', totalRooms: 10, availableRooms: 8, bookedRooms: 2 },
    { id: 'inv-04', roomTypeId: 'rt-02', date: '2025-06-02', totalRooms: 15, availableRooms: 12, bookedRooms: 3 },
    { id: 'inv-05', roomTypeId: 'rt-01', date: '2025-06-03', totalRooms: 10, availableRooms: 9, bookedRooms: 1 }
  ],
  newRoomType: {
    id: 'rt-new-01',
    hotelId: 'h-01',
    name: 'Presidential Suite',
    capacity: 6,
    basePrice: 75000,
    maxAdults: 4,
    maxChildren: 4,
    extraBedAllowed: true,
    extraBedPrice: 8000
  },
  rooms: [
    { id: 'r-01', hotelId: 'h-01', roomNumber: '101', roomTypeId: 'rt-01', status: 'CLEAN', floor: 1, lastCleanedAt: '2025-05-12T10:00:00Z', lastInspectedAt: '2025-05-12T10:30:00Z', viewType: 'SEA_VIEW' },
    { id: 'r-02', hotelId: 'h-01', roomNumber: '102', roomTypeId: 'rt-01', status: 'MAINTENANCE', floor: 1, lastCleanedAt: '2025-05-11T11:00:00Z', lastInspectedAt: '2025-05-11T11:45:00Z', viewType: 'SEA_VIEW', outOfOrderReason: 'Broken AC Unit', maintenanceTicketId: 'mt-03' },
    { id: 'r-03', hotelId: 'h-01', roomNumber: '103', roomTypeId: 'rt-01', status: 'DIRTY', floor: 1, lastCleanedAt: '2025-05-10T14:20:00Z', lastInspectedAt: '2025-05-10T15:10:00Z', viewType: 'CITY_VIEW' },
    { id: 'r-04', hotelId: 'h-01', roomNumber: '104', roomTypeId: 'rt-01', status: 'OCCUPIED', floor: 1, lastCleanedAt: '2025-05-11T09:00:00Z', lastInspectedAt: '2025-05-11T10:00:00Z', viewType: 'GARDEN_VIEW' },
    { id: 'r-05', hotelId: 'h-01', roomNumber: '105', roomTypeId: 'rt-01', status: 'CLEAN', floor: 1, lastCleanedAt: '2025-05-12T08:00:00Z', lastInspectedAt: '2025-05-12T08:30:00Z', viewType: 'POOL_VIEW' },
    { id: 'r-06', hotelId: 'h-01', roomNumber: '106', roomTypeId: 'rt-02', status: 'DIRTY', floor: 1, lastCleanedAt: '2025-05-11T20:00:00Z', lastInspectedAt: '2025-05-12T07:00:00Z', viewType: 'CITY_VIEW' },
    { id: 'r-07', hotelId: 'h-01', roomNumber: '107', roomTypeId: 'rt-02', status: 'OCCUPIED', floor: 1, lastCleanedAt: '2025-05-11T14:00:00Z', lastInspectedAt: '2025-05-11T15:00:00Z', viewType: 'SEA_VIEW' },
    { id: 'r-08', hotelId: 'h-01', roomNumber: '108', roomTypeId: 'rt-02', status: 'CLEAN', floor: 1, lastCleanedAt: '2025-05-12T09:15:00Z', lastInspectedAt: '2025-05-12T10:00:00Z', viewType: 'GARDEN_VIEW' },
    { id: 'r-09', hotelId: 'h-01', roomNumber: '109', roomTypeId: 'rt-02', status: 'MAINTENANCE', floor: 1, lastCleanedAt: '2025-05-09T10:00:00Z', lastInspectedAt: '2025-05-09T11:00:00Z', viewType: 'POOL_VIEW', outOfOrderReason: 'Painting in progress', maintenanceTicketId: 'mt-15' },
    { id: 'r-10', hotelId: 'h-01', roomNumber: '110', roomTypeId: 'rt-02', status: 'CLEAN', floor: 1, lastCleanedAt: '2025-05-12T06:00:00Z', lastInspectedAt: '2025-05-12T06:30:00Z', viewType: 'SEA_VIEW' },
    { id: 'r-11', hotelId: 'h-01', roomNumber: '201', roomTypeId: 'rt-02', status: 'CLEAN', floor: 2, lastCleanedAt: '2025-05-12T05:45:00Z', lastInspectedAt: '2025-05-12T06:15:00Z', viewType: 'SEA_VIEW' },
    { id: 'r-12', hotelId: 'h-01', roomNumber: '202', roomTypeId: 'rt-02', status: 'MAINTENANCE', floor: 2, lastCleanedAt: '2025-05-10T12:00:00Z', lastInspectedAt: '2025-05-10T13:00:00Z', viewType: 'POOL_VIEW', outOfOrderReason: 'AC Water Leakage', maintenanceTicketId: 'mt-01' },
    { id: 'r-13', hotelId: 'h-01', roomNumber: '203', roomTypeId: 'rt-02', status: 'CLEAN', floor: 2, lastCleanedAt: '2025-05-12T09:00:00Z', lastInspectedAt: '2025-05-12T09:30:00Z', viewType: 'GARDEN_VIEW' },
    { id: 'r-14', hotelId: 'h-01', roomNumber: '204', roomTypeId: 'rt-02', status: 'CLEAN', floor: 2, lastCleanedAt: '2025-05-12T10:00:00Z', lastInspectedAt: '2025-05-12T10:45:00Z', viewType: 'CITY_VIEW' },
    { id: 'r-15', hotelId: 'h-04', roomNumber: '501', roomTypeId: 'rt-04', status: 'OCCUPIED', floor: 5, lastCleanedAt: '2025-05-11T12:00:00Z', lastInspectedAt: '2025-05-11T13:00:00Z', viewType: 'CITY_VIEW' },
    { id: 'r-16', hotelId: 'h-04', roomNumber: '502', roomTypeId: 'rt-04', status: 'CLEAN', floor: 5, lastCleanedAt: '2025-05-12T07:00:00Z', lastInspectedAt: '2025-05-12T07:45:00Z', viewType: 'POOL_VIEW' },
    { id: 'r-17', hotelId: 'h-06', roomNumber: '101', roomTypeId: 'rt-05', status: 'CLEAN', floor: 1, lastCleanedAt: '2025-05-12T11:00:00Z', lastInspectedAt: '2025-05-12T11:30:00Z', viewType: 'CITY_VIEW' },
    { id: 'r-18', hotelId: 'h-06', roomNumber: '102', roomTypeId: 'rt-05', status: 'OCCUPIED', floor: 1, lastCleanedAt: '2025-05-11T15:00:00Z', lastInspectedAt: '2025-05-11T16:00:00Z', viewType: 'GARDEN_VIEW' },
    { id: 'r-19', hotelId: 'h-08', roomNumber: '301', roomTypeId: 'rt-06', status: 'CLEAN', floor: 3, lastCleanedAt: '2025-05-12T06:30:00Z', lastInspectedAt: '2025-05-12T07:15:00Z', viewType: 'POOL_VIEW' },
    { id: 'r-20', hotelId: 'h-10', roomNumber: '701', roomTypeId: 'rt-07', status: 'CLEAN', floor: 7, lastCleanedAt: '2025-05-12T08:00:00Z', lastInspectedAt: '2025-05-12T09:00:00Z', viewType: 'SEA_VIEW' },
    { id: 'r-21', hotelId: 'h-12', roomNumber: '110', roomTypeId: 'rt-08', status: 'CLEAN', floor: 1, lastCleanedAt: '2025-05-12T10:00:00Z', lastInspectedAt: '2025-05-12T11:00:00Z', viewType: 'GARDEN_VIEW' },
    { id: 'r-22', hotelId: 'h-14', roomNumber: '222', roomTypeId: 'rt-09', status: 'CLEAN', floor: 2, lastCleanedAt: '2025-05-12T09:30:00Z', lastInspectedAt: '2025-05-12T10:15:00Z', viewType: 'CITY_VIEW' },
    { id: 'r-23', hotelId: 'h-15', roomNumber: '901', roomTypeId: 'rt-10', status: 'CLEAN', floor: 9, lastCleanedAt: '2025-05-12T08:45:00Z', lastInspectedAt: '2025-05-12T09:30:00Z', viewType: 'SEA_VIEW' }
  ],
  roomTypes: [
    { id: 'rt-01', hotelId: 'h-01', name: 'Grand Suite', capacity: 4, basePrice: 25000, maxAdults: 4, maxChildren: 2, extraBedAllowed: true, extraBedPrice: 3500, images: Array(5).fill('https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80') },
    { id: 'rt-02', hotelId: 'h-01', name: 'Luxury King', capacity: 2, basePrice: 15000, maxAdults: 2, maxChildren: 1, extraBedAllowed: true, extraBedPrice: 2500, images: Array(5).fill('https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80') },
    { id: 'rt-03', hotelId: 'h-02', name: 'Palace Suite', capacity: 3, basePrice: 45000, maxAdults: 2, maxChildren: 2, extraBedAllowed: false, extraBedPrice: null, images: Array(5).fill('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80') },
    { id: 'rt-04', hotelId: 'h-04', name: 'Taj View Room', capacity: 2, basePrice: 32000, maxAdults: 2, maxChildren: 1, extraBedAllowed: false, extraBedPrice: null, images: Array(5).fill('https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80') },
    { id: 'rt-05', hotelId: 'h-06', name: 'Chola King', capacity: 2, basePrice: 18000, maxAdults: 2, maxChildren: 0, extraBedAllowed: true, extraBedPrice: 2000, images: Array(5).fill('https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80') },
    { id: 'rt-06', hotelId: 'h-08', name: 'Premier Queen', capacity: 2, basePrice: 8500, maxAdults: 2, maxChildren: 1, extraBedAllowed: true, extraBedPrice: 1500, images: Array(5).fill('https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80') },
    { id: 'rt-07', hotelId: 'h-10', name: 'Leela Royal', capacity: 2, basePrice: 22000, maxAdults: 2, maxChildren: 1, extraBedAllowed: true, extraBedPrice: 4000, images: Array(5).fill('https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800&q=80') },
    { id: 'rt-08', hotelId: 'h-12', name: 'Villa Studio', capacity: 4, basePrice: 55000, maxAdults: 4, maxChildren: 4, extraBedAllowed: true, extraBedPrice: 5000, images: Array(5).fill('https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80') },
    { id: 'rt-09', hotelId: 'h-14', name: 'Cedar Suite', capacity: 2, basePrice: 28000, maxAdults: 2, maxChildren: 0, extraBedAllowed: false, extraBedPrice: null, images: Array(5).fill('https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80') },
    { id: 'rt-10', hotelId: 'h-15', name: 'Regency Club', capacity: 2, basePrice: 18000, maxAdults: 2, maxChildren: 0, extraBedAllowed: true, extraBedPrice: 3000, images: Array(5).fill('https://images.unsplash.com/photo-1551882547-ff43c636a6e4?w=800&q=80') },
    { id: 'rt-11', hotelId: 'h-01', name: 'Executive Suite', capacity: 2, basePrice: 21000, maxAdults: 2, maxChildren: 1, extraBedAllowed: true, extraBedPrice: 3000, images: Array(5).fill('https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80') },
    { id: 'rt-12', hotelId: 'h-01', name: 'Garden Bungalow', capacity: 6, basePrice: 65000, maxAdults: 4, maxChildren: 4, extraBedAllowed: true, extraBedPrice: 6000, images: Array(5).fill('https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80') },
    { id: 'rt-13', hotelId: 'h-01', name: 'Business Studio', capacity: 1, basePrice: 12000, maxAdults: 1, maxChildren: 0, extraBedAllowed: false, extraBedPrice: null, images: Array(5).fill('https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80') },
    { id: 'rt-14', hotelId: 'h-01', name: 'Pool Villa', capacity: 2, basePrice: 48000, maxAdults: 2, maxChildren: 2, extraBedAllowed: true, extraBedPrice: 4500, images: Array(5).fill('https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800&q=80') },
    { id: 'rt-15', hotelId: 'h-01', name: 'Classic Room', capacity: 2, basePrice: 9500, maxAdults: 2, maxChildren: 1, extraBedAllowed: true, extraBedPrice: 1500, images: Array(5).fill('https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80') }
  ],
  inventoryLocks: [
    { roomTypeId: 'rt-01', date: '2025-05-10', source: 'OTA', quantity: 2, hotelId: 'h-01' },
    { roomTypeId: 'rt-02', date: '2025-05-10', source: 'OTA', quantity: 1, hotelId: 'h-01' },
    { roomTypeId: 'rt-03', date: '2025-05-10', source: 'OTA', quantity: 1, hotelId: 'h-02' },
    { roomTypeId: 'rt-04', date: '2025-05-10', source: 'DIRECT', quantity: 3, hotelId: 'h-04' },
    { roomTypeId: 'rt-05', date: '2025-05-10', source: 'OTA', quantity: 2, hotelId: 'h-06' },
    { roomTypeId: 'rt-06', date: '2025-05-10', source: 'OTA', quantity: 5, hotelId: 'h-08' },
    { roomTypeId: 'rt-07', date: '2025-05-10', source: 'DIRECT', quantity: 1, hotelId: 'h-10' },
    { roomTypeId: 'rt-08', date: '2025-05-10', source: 'OTA', quantity: 1, hotelId: 'h-12' },
    { roomTypeId: 'rt-09', date: '2025-05-10', source: 'DIRECT', quantity: 1, hotelId: 'h-14' },
    { roomTypeId: 'rt-10', date: '2025-05-10', source: 'OTA', quantity: 2, hotelId: 'h-15' },
    { roomTypeId: 'rt-11', date: '2025-05-11', source: 'OTA', quantity: 1, hotelId: 'h-01' },
    { roomTypeId: 'rt-12', date: '2025-05-11', source: 'OTA', quantity: 2, hotelId: 'h-01' },
    { roomTypeId: 'rt-13', date: '2025-05-11', source: 'DIRECT', quantity: 2, hotelId: 'h-01' },
    { roomTypeId: 'rt-14', date: '2025-05-11', source: 'OTA', quantity: 1, hotelId: 'h-01' },
    { roomTypeId: 'rt-15', date: '2025-05-11', source: 'DIRECT', quantity: 1, hotelId: 'h-01' }
  ]
};

// ============================================================================
// BOOKINGS & GUESTS
// ============================================================================

export const guestsMockData = {
  guestStays: [
    { id: 'gs-01', guestId: 'g-01', hotelId: 'h-01', checkInDate: '2025-05-10', checkOutDate: '2025-05-14', roomNumber: '101', totalSpent: 85000 },
    { id: 'gs-02', guestId: 'g-02', hotelId: 'h-01', checkInDate: '2025-05-12', checkOutDate: '2025-05-15', roomNumber: '201', totalSpent: 42000 },
    { id: 'gs-03', guestId: 'g-01', hotelId: 'h-02', checkInDate: '2024-12-01', checkOutDate: '2024-12-05', roomNumber: '305', totalSpent: 120000 },
    { id: 'gs-04', guestId: 'g-05', hotelId: 'h-01', checkInDate: '2025-06-01', checkOutDate: '2025-06-05', roomNumber: '108', totalSpent: 60000 },
    { id: 'gs-05', guestId: 'g-09', hotelId: 'h-01', checkInDate: '2025-07-05', checkOutDate: '2025-07-10', roomNumber: '201', totalSpent: 500000 }
  ],
  newGuestNote: {
    id: 'gn-new-01',
    guestId: 'g-01',
    hotelId: 'h-01',
    content: 'New note added via API.',
    createdAt: '2025-05-12T16:00:00Z',
    userId: 'u-t01-03'
  },
  guests: [
    { id: 'g-01', name: 'Rahul Khanna', phone: '+91 9820011223', email: 'rahul.k@gmail.com', idType: 'Aadhaar', idNumber: '1234-5678-9012', nationality: 'Indian', preferences: { pillowType: 'Soft', smoking: false, dietaryNeeds: 'Vegetarian' }, isVip: true, privacyLevel: 'HIGH' },
    { id: 'g-02', name: 'Sneha Kapur', phone: '+91 9820011224', email: 'sneha.k@yahoo.com', idType: 'Passport', idNumber: 'P1234567', nationality: 'Indian', preferences: { pillowType: 'Firm', smoking: false, dietaryNeeds: 'Non-Vegetarian' }, isVip: false, privacyLevel: 'NORMAL' },
    { id: 'g-03', name: 'Vikram Seth', phone: '+91 9820011225', email: 'vseth@corporate.com', idType: 'Aadhaar', idNumber: '5566-7788-9900', nationality: 'Indian', preferences: { pillowType: 'Soft', smoking: true, dietaryNeeds: 'Non-Vegetarian' }, isVip: false, privacyLevel: 'NORMAL' },
    { id: 'g-04', name: 'Aditi Rao', phone: '+91 9820011226', email: 'aditi.rao@gmail.com', idType: 'Driving License', idNumber: 'DL-99881122', nationality: 'Indian', preferences: { pillowType: 'Firm', smoking: false, dietaryNeeds: 'Vegetarian' }, isVip: true, privacyLevel: 'NORMAL' },
    { id: 'g-05', name: 'John Smith', phone: '+44 7700900123', email: 'john.smith@uk.com', idType: 'Passport', idNumber: 'B992211', nationality: 'British', preferences: { pillowType: 'Soft', smoking: false, dietaryNeeds: 'Vegan' }, isVip: false, privacyLevel: 'NORMAL' },
    { id: 'g-06', name: 'Marie Curie', phone: '+33 612345678', email: 'marie@science.fr', idType: 'Passport', idNumber: 'F112233', nationality: 'French', preferences: { pillowType: 'Firm', smoking: false, dietaryNeeds: 'Vegetarian' }, isVip: false, privacyLevel: 'NORMAL' },
    { id: 'g-07', name: 'Amit Shah', phone: '+91 9988776655', email: 'amit@shah.in', idType: 'Aadhaar', idNumber: '8877-6655-4433', nationality: 'Indian', preferences: { pillowType: 'Soft', smoking: false, dietaryNeeds: 'Vegetarian' }, isVip: false, privacyLevel: 'NORMAL' },
    { id: 'g-08', name: 'Sarah Connor', phone: '+1 5550199', email: 'sarah@resistance.com', idType: 'Passport', idNumber: 'U881122', nationality: 'American', preferences: { pillowType: 'Firm', smoking: true, dietaryNeeds: 'Non-Vegetarian' }, isVip: false, privacyLevel: 'NORMAL' },
    { id: 'g-09', name: 'Bruce Wayne', phone: '+1 800BATMAN', email: 'bruce@waynecorp.com', idType: 'Passport', idNumber: 'U007007', nationality: 'American', preferences: { pillowType: 'Soft', smoking: false, dietaryNeeds: 'Non-Vegetarian' }, isVip: true, privacyLevel: 'HIGH' },
    { id: 'g-10', name: 'Clark Kent', phone: '+1 5550101', email: 'clark@dailyplanet.com', idType: 'Driving License', idNumber: 'MET-88221', nationality: 'American', preferences: { pillowType: 'Firm', smoking: false, dietaryNeeds: 'Vegetarian' }, isVip: false, privacyLevel: 'NORMAL' },
    { id: 'g-11', name: 'Diana Prince', phone: '+1 5550202', email: 'diana@themiscira.com', idType: 'Passport', idNumber: 'G112233', nationality: 'Greek', preferences: { pillowType: 'Soft', smoking: false, dietaryNeeds: 'Vegan' }, isVip: true, privacyLevel: 'NORMAL' },
    { id: 'g-12', name: 'Barry Allen', phone: '+1 5550303', email: 'barry@centralcity.com', idType: 'Passport', idNumber: 'U554433', nationality: 'American', preferences: { pillowType: 'Firm', smoking: false, dietaryNeeds: 'Non-Vegetarian' }, isVip: false, privacyLevel: 'NORMAL' },
    { id: 'g-13', name: 'Arthur Curry', phone: '+1 5550404', email: 'arthur@atlantis.com', idType: 'Passport', idNumber: 'A990088', nationality: 'Atlantean', preferences: { pillowType: 'Soft', smoking: false, dietaryNeeds: 'Non-Vegetarian' }, isVip: false, privacyLevel: 'NORMAL' },
    { id: 'g-14', name: 'Victor Stone', phone: '+1 5550505', email: 'victor@star.com', idType: 'Aadhaar', idNumber: '1100-2200-3300', nationality: 'American', preferences: { pillowType: 'Firm', smoking: false, dietaryNeeds: 'Vegan' }, isVip: false, privacyLevel: 'NORMAL' },
    { id: 'g-15', name: 'Sundar Pichai', phone: '+1 6505550199', email: 'sundar@google.com', idType: 'Passport', idNumber: 'U991100', nationality: 'Indian', preferences: { pillowType: 'Soft', smoking: false, dietaryNeeds: 'Vegetarian' }, isVip: true, privacyLevel: 'HIGH' }
  ],
  guestNotes: [
    { id: 'gn-01', guestId: 'g-01', hotelId: 'h-01', content: 'Loves high floor rooms with sea view.', createdAt: '2024-12-01T10:00:00Z', userId: 'u-t01-03' },
    { id: 'gn-02', guestId: 'g-01', hotelId: 'h-01', content: 'Allergic to peanuts.', createdAt: '2024-12-01T10:05:00Z', userId: 'u-t01-03' },
    { id: 'gn-03', guestId: 'g-02', hotelId: 'h-01', content: 'Corporate booking - ITC guest.', createdAt: '2025-01-10T14:00:00Z', userId: 'u-t01-03' },
    { id: 'gn-04', guestId: 'g-03', hotelId: 'h-04', content: 'Prefers firm mattress.', createdAt: '2025-02-15T09:00:00Z', userId: 'u-t01-03' },
    { id: 'gn-05', guestId: 'g-05', hotelId: 'h-01', content: 'Late checkout always requested.', createdAt: '2025-03-01T16:00:00Z', userId: 'u-t01-03' },
    { id: 'gn-06', guestId: 'g-01', hotelId: 'h-01', content: 'Prefers almond milk with coffee.', createdAt: '2025-01-05T08:00:00Z' },
    { id: 'gn-07', guestId: 'g-09', hotelId: 'h-01', content: 'Extra privacy required.', createdAt: '2025-02-02T11:00:00Z' },
    { id: 'gn-08', guestId: 'g-15', hotelId: 'h-14', content: 'Requests quiet workspace in room.', createdAt: '2025-04-10T15:00:00Z' },
    { id: 'gn-09', guestId: 'g-04', hotelId: 'h-06', content: 'Repeated business traveler.', createdAt: '2024-11-20T09:30:00Z' },
    { id: 'gn-10', guestId: 'g-07', hotelId: 'h-01', content: 'Needs extra bath towels.', createdAt: '2025-03-12T14:45:00Z' },
    { id: 'gn-11', guestId: 'g-11', hotelId: 'h-01', content: 'Fruit basket on arrival.', createdAt: '2025-05-01T10:00:00Z' },
    { id: 'gn-12', guestId: 'g-12', hotelId: 'h-01', content: 'Requires high-speed ethernet port.', createdAt: '2025-05-10T12:00:00Z' },
    { id: 'gn-13', guestId: 'g-13', hotelId: 'h-01', content: 'Loves fresh sea food.', createdAt: '2025-05-15T19:00:00Z' },
    { id: 'gn-14', guestId: 'g-14', hotelId: 'h-01', content: 'Handicapped accessible room.', createdAt: '2025-05-20T08:00:00Z' },
    { id: 'gn-15', guestId: 'g-06', hotelId: 'h-01', content: 'Visiting for research conference.', createdAt: '2025-06-05T11:00:00Z' }
  ]
};

export const bookingsMockData = {
  invoices: [
    { id: 'inv-b-01', bookingId: 'b-01', invoiceNumber: 'INV-1001', amount: 85000, status: 'PAID', issuedAt: '2025-05-14T10:00:00Z' },
    { id: 'inv-b-02', bookingId: 'b-02', invoiceNumber: 'INV-1002', amount: 42000, status: 'PAID', issuedAt: '2025-05-15T11:00:00Z' },
    { id: 'inv-b-03', bookingId: 'b-03', invoiceNumber: 'INV-1003', amount: 28000, status: 'DUE', issuedAt: '2025-05-17T09:00:00Z' }
  ],
  bookings: [
    { id: 'b-01', bookingNumber: 'LS-1001', hotelId: 'h-01', guestId: 'g-01', guestName: 'Rahul Khanna', checkInDate: '2025-05-10', checkOutDate: '2025-05-14', status: 'CONFIRMED', roomType: 'Grand Suite', roomNumber: '101', totalAmount: 85000, paymentStatus: 'PAID', source: 'Direct', sourceId: 'SRC_DIRECT', arrivalTime: '14:00', departureTime: '12:00', cancellationPolicy: 'Cancel 24 hours prior', noShowPolicy: '1 night charge', assignedAt: '2025-05-10T10:00:00Z' },
    { id: 'b-02', bookingNumber: 'LS-1002', hotelId: 'h-01', guestId: 'g-02', guestName: 'Sneha Kapur', checkInDate: '2025-05-12', checkOutDate: '2025-05-15', status: 'CHECKED_IN', roomType: 'Luxury King', roomNumber: '201', totalAmount: 42000, paymentStatus: 'PAID', source: 'Booking.com', sourceId: 'SRC_OTA_BKG', arrivalTime: '15:30', departureTime: '11:00', cancellationPolicy: 'Non-refundable', noShowPolicy: 'Full stay charge', assignedAt: '2025-05-12T14:15:00Z' },
    { id: 'b-03', bookingNumber: 'LS-1003', hotelId: 'h-04', guestId: 'g-03', guestName: 'Vikram Seth', checkInDate: '2025-05-15', checkOutDate: '2025-05-17', status: 'PENDING', roomType: 'Taj View Room', roomNumber: '501', totalAmount: 28000, paymentStatus: 'DUE', source: 'Expedia', sourceId: 'SRC_OTA_EXP', arrivalTime: '14:00', departureTime: '12:00', cancellationPolicy: 'Cancel 7 days prior', noShowPolicy: '1 night charge', assignedAt: '2025-05-15T09:00:00Z' },
    { id: 'b-04', bookingNumber: 'LS-1004', hotelId: 'h-01', guestId: 'g-05', guestName: 'John Smith', checkInDate: '2025-06-01', checkOutDate: '2025-06-05', status: 'CONFIRMED', roomType: 'Executive Suite', roomNumber: '301', totalAmount: 60000, paymentStatus: 'PAID', source: 'Airbnb', sourceId: 'SRC_OTA_BKG', arrivalTime: '16:00', departureTime: '10:00', cancellationPolicy: 'Cancel 24 hours prior', noShowPolicy: 'Full stay charge', assignedAt: '2025-06-01T15:00:00Z' },
    { id: 'b-05', bookingNumber: 'LS-1005', hotelId: 'h-01', guestId: 'g-06', guestName: 'Marie Curie', checkInDate: '2025-06-10', checkOutDate: '2025-06-12', status: 'CONFIRMED', roomType: 'Luxury King', roomNumber: '202', totalAmount: 35000, paymentStatus: 'PAID', source: 'Direct', sourceId: 'SRC_DIRECT', arrivalTime: '12:00', departureTime: '11:00', cancellationPolicy: 'Cancel 7 days prior', noShowPolicy: '1 night charge', assignedAt: '2025-06-10T11:30:00Z' },
    { id: 'b-06', bookingNumber: 'LS-1006', hotelId: 'h-01', guestId: 'g-07', guestName: 'Amit Shah', checkInDate: '2025-06-15', checkOutDate: '2025-06-20', status: 'CONFIRMED', roomType: 'Grand Suite', roomNumber: '102', totalAmount: 75000, paymentStatus: 'PAID', source: 'MakeMyTrip', sourceId: 'SRC_OTA_BKG', arrivalTime: '14:00', departureTime: '12:00', cancellationPolicy: 'Non-refundable', noShowPolicy: 'Full stay charge', assignedAt: '2025-06-15T13:00:00Z' },
    { id: 'b-07', bookingNumber: 'LS-1007', hotelId: 'h-01', guestId: 'g-08', guestName: 'Sarah Connor', checkInDate: '2025-07-01', checkOutDate: '2025-07-03', status: 'CONFIRMED', roomType: 'Classic Room', roomNumber: '103', totalAmount: 25000, paymentStatus: 'PAID', source: 'Direct', sourceId: 'SRC_DIRECT', arrivalTime: '13:00', departureTime: '11:00', cancellationPolicy: 'Cancel 24 hours prior', noShowPolicy: '1 night charge', assignedAt: '2025-07-01T12:00:00Z' },
    { id: 'b-08', bookingNumber: 'LS-1008', hotelId: 'h-01', guestId: 'g-09', guestName: 'Bruce Wayne', checkInDate: '2025-07-05', checkOutDate: '2025-07-10', status: 'CONFIRMED', roomType: 'Garden Bungalow', roomNumber: '401', totalAmount: 500000, paymentStatus: 'PAID', source: 'Corporate', sourceId: 'SRC_CORP', arrivalTime: '18:00', departureTime: '08:00', cancellationPolicy: 'Cancel 7 days prior', noShowPolicy: 'Full stay charge', assignedAt: '2025-07-05T17:00:00Z' },
    { id: 'b-09', bookingNumber: 'LS-1009', hotelId: 'h-01', guestId: 'g-10', guestName: 'Clark Kent', checkInDate: '2025-07-12', checkOutDate: '2025-07-15', status: 'CONFIRMED', roomType: 'Executive Suite', roomNumber: '302', totalAmount: 45000, paymentStatus: 'PAID', source: 'Direct', sourceId: 'SRC_DIRECT', arrivalTime: '11:00', departureTime: '13:00', cancellationPolicy: 'Cancel 24 hours prior', noShowPolicy: '1 night charge', assignedAt: '2025-07-12T10:30:00Z' },
    { id: 'b-10', bookingNumber: 'LS-1010', hotelId: 'h-01', guestId: 'g-11', guestName: 'Diana Prince', checkInDate: '2025-08-01', checkOutDate: '2025-08-05', status: 'CONFIRMED', roomType: 'Pool Villa', roomNumber: '501', totalAmount: 120000, paymentStatus: 'PAID', source: 'Expedia', sourceId: 'SRC_OTA_EXP', arrivalTime: '14:00', departureTime: '12:00', cancellationPolicy: 'Non-refundable', noShowPolicy: 'Full stay charge', assignedAt: '2025-08-01T13:45:00Z' },
    { id: 'b-11', bookingNumber: 'LS-1011', hotelId: 'h-01', guestId: 'g-12', guestName: 'Barry Allen', checkInDate: '2025-08-10', checkOutDate: '2025-08-12', status: 'CONFIRMED', roomType: 'Luxury King', roomNumber: '203', totalAmount: 32000, paymentStatus: 'PAID', source: 'Direct', sourceId: 'SRC_DIRECT', arrivalTime: '09:00', departureTime: '17:00', cancellationPolicy: 'Cancel 24 hours prior', noShowPolicy: '1 night charge', assignedAt: '2025-08-10T08:50:00Z' },
    { id: 'b-12', bookingNumber: 'LS-1012', hotelId: 'h-01', guestId: 'g-13', guestName: 'Arthur Curry', checkInDate: '2025-08-15', checkOutDate: '2025-08-20', status: 'CONFIRMED', roomType: 'Grand Suite', roomNumber: '104', totalAmount: 80000, paymentStatus: 'PAID', source: 'Booking.com', sourceId: 'SRC_OTA_BKG', arrivalTime: '14:00', departureTime: '12:00', cancellationPolicy: 'Cancel 7 days prior', noShowPolicy: '1 night charge', assignedAt: '2025-08-15T13:00:00Z' },
    { id: 'b-13', bookingNumber: 'LS-1013', hotelId: 'h-01', guestId: 'g-14', guestName: 'Victor Stone', checkInDate: '2025-09-01', checkOutDate: '2025-09-03', status: 'CONFIRMED', roomType: 'Luxury King', roomNumber: '204', totalAmount: 28000, paymentStatus: 'PAID', source: 'Direct', sourceId: 'SRC_DIRECT', arrivalTime: '12:00', departureTime: '14:00', cancellationPolicy: 'Non-refundable', noShowPolicy: 'Full stay charge', assignedAt: '2025-09-01T11:00:00Z' },
    { id: 'b-14', bookingNumber: 'LS-1014', hotelId: 'h-01', guestId: 'g-15', guestName: 'Sundar Pichai', checkInDate: '2025-09-05', checkOutDate: '2025-09-10', status: 'CONFIRMED', roomType: 'Pool Villa', roomNumber: '502', totalAmount: 150000, paymentStatus: 'PAID', source: 'Corporate', sourceId: 'SRC_CORP', arrivalTime: '14:00', departureTime: '12:00', cancellationPolicy: 'Cancel 7 days prior', noShowPolicy: '1 night charge', assignedAt: '2025-09-05T13:20:00Z' },
    { id: 'b-15', bookingNumber: 'LS-1015', hotelId: 'h-01', guestId: 'g-01', guestName: 'Rahul Khanna', checkInDate: '2025-10-01', checkOutDate: '2025-10-05', status: 'CONFIRMED', roomType: 'Grand Suite', roomNumber: '105', totalAmount: 90000, paymentStatus: 'PAID', source: 'Direct', sourceId: 'SRC_DIRECT', arrivalTime: '15:00', departureTime: '11:00', cancellationPolicy: 'Cancel 24 hours prior', noShowPolicy: '1 night charge', assignedAt: '2025-10-01T14:40:00Z' }
  ],
  pushLogs: [
    { id: 'pl-01', bookingId: 'b-01', otaName: 'Booking.com', syncStatus: 'SUCCESS', lastPushedAt: '2025-05-10T10:05:00Z' },
    { id: 'pl-02', bookingId: 'b-02', otaName: 'Expedia', syncStatus: 'SUCCESS', lastPushedAt: '2025-05-12T14:20:00Z' },
    { id: 'pl-03', bookingId: 'b-03', otaName: 'Airbnb', syncStatus: 'FAILED', lastPushedAt: '2025-05-15T09:10:00Z' },
    { id: 'pl-04', bookingId: 'b-04', otaName: 'MakeMyTrip', syncStatus: 'PENDING', lastPushedAt: '2025-06-01T15:05:00Z' },
    { id: 'pl-05', bookingId: 'b-05', otaName: 'Agoda', syncStatus: 'SUCCESS', lastPushedAt: '2025-06-10T11:40:00Z' },
    { id: 'pl-06', bookingId: 'b-06', otaName: 'Booking.com', syncStatus: 'SUCCESS', lastPushedAt: '2025-06-15T13:05:00Z' },
    { id: 'pl-07', bookingId: 'b-07', otaName: 'Expedia', syncStatus: 'SUCCESS', lastPushedAt: '2025-07-01T12:05:00Z' },
    { id: 'pl-08', bookingId: 'b-08', otaName: 'Airbnb', syncStatus: 'SUCCESS', lastPushedAt: '2025-07-05T17:05:00Z' },
    { id: 'pl-09', bookingId: 'b-09', otaName: 'MakeMyTrip', syncStatus: 'FAILED', lastPushedAt: '2025-07-12T10:35:00Z' },
    { id: 'pl-10', bookingId: 'b-10', otaName: 'Agoda', syncStatus: 'SUCCESS', lastPushedAt: '2025-08-01T13:50:00Z' },
    { id: 'pl-11', bookingId: 'b-11', otaName: 'Booking.com', syncStatus: 'SUCCESS', lastPushedAt: '2025-08-10T08:55:00Z' },
    { id: 'pl-12', bookingId: 'b-12', otaName: 'Expedia', syncStatus: 'PENDING', lastPushedAt: '2025-08-15T13:05:00Z' },
    { id: 'pl-13', bookingId: 'b-13', otaName: 'Airbnb', syncStatus: 'SUCCESS', lastPushedAt: '2025-09-01T11:05:00Z' },
    { id: 'pl-14', bookingId: 'b-14', otaName: 'MakeMyTrip', syncStatus: 'SUCCESS', lastPushedAt: '2025-09-05T13:25:00Z' },
    { id: 'pl-15', bookingId: 'b-15', otaName: 'Agoda', syncStatus: 'FAILED', lastPushedAt: '2025-10-01T14:45:00Z' }
  ]
};

// ============================================================================
// FINANCE: INVOICES & PAYMENTS
// ============================================================================

export const financeMockData = {
  settlements: [
    { id: 'set-01', hotelId: 'h-01', date: '2025-05-10', totalAmount: 185000, status: 'SETTLED', settledAt: '2025-05-11T00:00:00Z' },
    { id: 'set-02', hotelId: 'h-01', date: '2025-05-11', totalAmount: 170000, status: 'SETTLED', settledAt: '2025-05-12T00:00:00Z' },
    { id: 'set-03', hotelId: 'h-01', date: '2025-05-12', totalAmount: 203000, status: 'SETTLED', settledAt: '2025-05-13T00:00:00Z' },
    { id: 'set-04', hotelId: 'h-01', date: '2025-05-13', totalAmount: 157000, status: 'SETTLED', settledAt: '2025-05-14T00:00:00Z' },
    { id: 'set-05', hotelId: 'h-01', date: '2025-05-14', totalAmount: 230000, status: 'PENDING', settledAt: null }
  ],
  settlementSummary: {
    totalSettled: 715000,
    totalPending: 230000,
    settledCount: 4,
    pendingCount: 1
  },
  invoices: [
    { id: 'inv-01', invoiceNumber: 'INV-1001', bookingId: 'b-01', hotelId: 'h-01', guestName: 'Rahul Khanna', status: 'ISSUED', paymentStatus: 'PAID', totalAmount: 85000, issuedAt: '2025-05-14', taxBreakdown: { cgst: 6412.50, sgst: 6412.50, igst: 0 } },
    { id: 'inv-02', invoiceNumber: 'INV-1002', bookingId: 'b-02', hotelId: 'h-01', guestName: 'Sneha Kapur', status: 'ISSUED', paymentStatus: 'PAID', totalAmount: 42000, issuedAt: '2025-05-15', taxBreakdown: { cgst: 3150.00, sgst: 3150.00, igst: 0 } },
    { id: 'inv-03', invoiceNumber: 'INV-1003', bookingId: 'b-03', hotelId: 'h-04', guestName: 'Vikram Seth', status: 'ISSUED', paymentStatus: 'DUE', totalAmount: 28000, issuedAt: '2025-05-17', taxBreakdown: { cgst: 0, sgst: 0, igst: 5040.00 } },
    { id: 'inv-04', invoiceNumber: 'INV-1004', bookingId: 'b-04', hotelId: 'h-01', guestName: 'John Smith', status: 'ISSUED', paymentStatus: 'PAID', totalAmount: 60000, issuedAt: '2025-06-05', taxBreakdown: { cgst: 4500.00, sgst: 4500.00, igst: 0 } },
    { id: 'inv-05', invoiceNumber: 'INV-1005', bookingId: 'b-05', hotelId: 'h-01', guestName: 'Marie Curie', status: 'ISSUED', paymentStatus: 'PAID', totalAmount: 35000, issuedAt: '2025-06-12', taxBreakdown: { cgst: 2625.00, sgst: 2625.00, igst: 0 } },
    { id: 'inv-06', invoiceNumber: 'INV-1006', bookingId: 'b-06', hotelId: 'h-01', guestName: 'Amit Shah', status: 'ISSUED', paymentStatus: 'PAID', totalAmount: 75000, issuedAt: '2025-06-20', taxBreakdown: { cgst: 5625.00, sgst: 5625.00, igst: 0 } },
    { id: 'inv-07', invoiceNumber: 'INV-1007', bookingId: 'b-07', hotelId: 'h-01', guestName: 'Sarah Connor', status: 'ISSUED', paymentStatus: 'PAID', totalAmount: 25000, issuedAt: '2025-07-03', taxBreakdown: { cgst: 1875.00, sgst: 1875.00, igst: 0 } },
    { id: 'inv-08', invoiceNumber: 'INV-1008', bookingId: 'b-08', hotelId: 'h-01', guestName: 'Bruce Wayne', status: 'ISSUED', paymentStatus: 'PAID', totalAmount: 500000, issuedAt: '2025-07-10', taxBreakdown: { cgst: 37500.00, sgst: 37500.00, igst: 0 } },
    { id: 'inv-09', invoiceNumber: 'INV-1009', bookingId: 'b-09', hotelId: 'h-01', guestName: 'Clark Kent', status: 'ISSUED', paymentStatus: 'PAID', totalAmount: 45000, issuedAt: '2025-07-15', taxBreakdown: { cgst: 3375.00, sgst: 3375.00, igst: 0 } },
    { id: 'inv-10', invoiceNumber: 'INV-1010', bookingId: 'b-10', hotelId: 'h-01', guestName: 'Diana Prince', status: 'ISSUED', paymentStatus: 'PAID', totalAmount: 120000, issuedAt: '2025-08-05', taxBreakdown: { cgst: 9000.00, sgst: 9000.00, igst: 0 } },
    { id: 'inv-11', invoiceNumber: 'INV-1011', bookingId: 'b-11', hotelId: 'h-01', guestName: 'Barry Allen', status: 'ISSUED', paymentStatus: 'PAID', totalAmount: 32000, issuedAt: '2025-08-12', taxBreakdown: { cgst: 2400.00, sgst: 2400.00, igst: 0 } },
    { id: 'inv-12', invoiceNumber: 'INV-1012', bookingId: 'b-12', hotelId: 'h-01', guestName: 'Arthur Curry', status: 'ISSUED', paymentStatus: 'PAID', totalAmount: 80000, issuedAt: '2025-08-20', taxBreakdown: { cgst: 6000.00, sgst: 6000.00, igst: 0 } },
    { id: 'inv-13', invoiceNumber: 'INV-1013', bookingId: 'b-13', hotelId: 'h-01', guestName: 'Victor Stone', status: 'ISSUED', paymentStatus: 'PAID', totalAmount: 28000, issuedAt: '2025-09-03', taxBreakdown: { cgst: 2100.00, sgst: 2100.00, igst: 0 } },
    { id: 'inv-14', invoiceNumber: 'INV-1014', bookingId: 'b-14', hotelId: 'h-01', guestName: 'Sundar Pichai', status: 'ISSUED', paymentStatus: 'PARTIALLY_PAID', totalAmount: 150000, issuedAt: '2025-09-10', taxBreakdown: { cgst: 11250.00, sgst: 11250.00, igst: 0 } },
    { id: 'inv-15', invoiceNumber: 'INV-1015', bookingId: 'b-15', hotelId: 'h-01', guestName: 'Rahul Khanna', status: 'ISSUED', paymentStatus: 'PAID', totalAmount: 90000, issuedAt: '2025-10-05', taxBreakdown: { cgst: 6750.00, sgst: 6750.00, igst: 0 } }
  ],
  folioItems: [
    { id: 'fi-01', guestId: 'g-01', bookingId: 'b-01', type: 'Room Charge', itemType: 'Room Charge', amount: 25000, postedDate: '2025-05-10T00:00:00Z', ledgerCategory: 'GUEST_LEDGER' },
    { id: 'fi-02', guestId: 'g-01', bookingId: 'b-01', type: 'Food', itemType: 'Food', amount: 2500, postedDate: '2025-05-11T20:30:00Z', ledgerCategory: 'GUEST_LEDGER' },
    { id: 'fi-03', guestId: 'g-01', bookingId: 'b-01', type: 'Deposit', itemType: 'Other', amount: 10000, postedDate: '2025-05-09T15:00:00Z', ledgerCategory: 'DEPOSIT_LEDGER' },
    { id: 'fi-04', guestId: 'g-02', bookingId: 'b-02', type: 'Room Charge', itemType: 'Room Charge', amount: 15000, postedDate: '2025-05-12T00:00:00Z', ledgerCategory: 'GUEST_LEDGER' },
    { id: 'fi-05', guestId: 'g-03', bookingId: 'b-03', type: 'Advance', itemType: 'Other', amount: 5000, postedDate: '2025-05-14T10:00:00Z', ledgerCategory: 'ADVANCE_LEDGER' },
    { id: 'fi-06', guestId: 'g-05', bookingId: 'b-04', type: 'Spa', itemType: 'Spa', amount: 4500, postedDate: '2025-06-02T11:00:00Z', ledgerCategory: 'GUEST_LEDGER' },
    { id: 'fi-07', guestId: 'g-06', bookingId: 'b-05', type: 'Room Charge', itemType: 'Room Charge', amount: 17500, postedDate: '2025-06-10T00:00:00Z', ledgerCategory: 'GUEST_LEDGER' },
    { id: 'fi-08', guestId: 'g-07', bookingId: 'b-06', type: 'Mini Bar', itemType: 'Food', amount: 1200, postedDate: '2025-06-16T22:00:00Z', ledgerCategory: 'GUEST_LEDGER' },
    { id: 'fi-09', guestId: 'g-08', bookingId: 'b-07', type: 'Room Charge', itemType: 'Room Charge', amount: 12500, postedDate: '2025-07-01T00:00:00Z', ledgerCategory: 'GUEST_LEDGER' },
    { id: 'fi-10', guestId: 'g-09', bookingId: 'b-08', type: 'Limousine', itemType: 'Other', amount: 15000, postedDate: '2025-07-06T09:00:00Z', ledgerCategory: 'GUEST_LEDGER' },
    { id: 'fi-11', guestId: 'g-10', bookingId: 'b-09', type: 'Room Charge', itemType: 'Room Charge', amount: 15000, postedDate: '2025-07-12T00:00:00Z', ledgerCategory: 'GUEST_LEDGER' },
    { id: 'fi-12', guestId: 'g-11', bookingId: 'b-10', type: 'Security Deposit', itemType: 'Other', amount: 20000, postedDate: '2025-08-01T14:00:00Z', ledgerCategory: 'DEPOSIT_LEDGER' },
    { id: 'fi-13', guestId: 'g-12', bookingId: 'b-11', type: 'Room Charge', itemType: 'Room Charge', amount: 16000, postedDate: '2025-08-10T00:00:00Z', ledgerCategory: 'GUEST_LEDGER' },
    { id: 'fi-14', guestId: 'g-13', bookingId: 'b-12', type: 'Dinner', itemType: 'Food', amount: 3500, postedDate: '2025-08-16T20:00:00Z', ledgerCategory: 'GUEST_LEDGER' },
    { id: 'fi-15', guestId: 'g-14', bookingId: 'b-13', type: 'Advance Payment', itemType: 'Other', amount: 10000, postedDate: '2025-08-30T15:00:00Z', ledgerCategory: 'ADVANCE_LEDGER' }
  ],
  payments: [
    { id: 'pay-01', hotelId: 'h-01', bookingId: 'b-01', amount: 85000, status: 'SUCCESS', method: 'CARD', createdAt: '2025-05-10T10:00:00Z', paymentGatewayRef: 'rzp_live_taj001', settlementStatus: 'SETTLED', refunds: [], businessDate: '2025-05-10' },
    { id: 'pay-02', hotelId: 'h-01', bookingId: 'b-02', amount: 42000, status: 'SUCCESS', method: 'UPI', createdAt: '2025-05-12T14:30:00Z', paymentGatewayRef: 'pay_mum_881', settlementStatus: 'SETTLED', refunds: [], businessDate: '2025-05-12' },
    { id: 'pay-03', hotelId: 'h-01', bookingId: 'b-04', amount: 60000, status: 'SUCCESS', method: 'CARD', createdAt: '2025-06-01T15:30:00Z', paymentGatewayRef: 'rzp_live_air04', settlementStatus: 'SETTLED', refunds: [], businessDate: '2025-06-01' },
    { id: 'pay-04', hotelId: 'h-01', bookingId: 'b-05', amount: 35000, status: 'SUCCESS', method: 'CASH', createdAt: '2025-06-10T11:45:00Z', paymentGatewayRef: 'CASH_FRONT_001', settlementStatus: 'SETTLED', refunds: [], businessDate: '2025-06-10' },
    { id: 'pay-05', hotelId: 'h-01', bookingId: 'b-06', amount: 75000, status: 'SUCCESS', method: 'CARD', createdAt: '2025-06-15T13:20:00Z', paymentGatewayRef: 'pay_mmt_992', settlementStatus: 'SETTLED', refunds: [], businessDate: '2025-06-15' },
    { id: 'pay-06', hotelId: 'h-01', bookingId: 'b-07', amount: 25000, status: 'SUCCESS', method: 'UPI', createdAt: '2025-07-01T12:15:00Z', paymentGatewayRef: 'pay_dir_007', settlementStatus: 'SETTLED', refunds: [], businessDate: '2025-07-01' },
    { id: 'pay-07', hotelId: 'h-01', bookingId: 'b-08', amount: 500000, status: 'SUCCESS', method: 'BANK_TRANSFER', createdAt: '2025-07-05T17:30:00Z', paymentGatewayRef: 'TXN_WAYNE_IND', settlementStatus: 'SETTLED', refunds: [], businessDate: '2025-07-05' },
    { id: 'pay-08', hotelId: 'h-01', bookingId: 'b-09', amount: 45000, status: 'SUCCESS', method: 'CARD', createdAt: '2025-07-12T10:45:00Z', paymentGatewayRef: 'rzp_live_kent09', settlementStatus: 'SETTLED', refunds: [], businessDate: '2025-07-12' },
    { id: 'pay-09', hotelId: 'h-01', bookingId: 'b-10', amount: 120000, status: 'SUCCESS', method: 'CARD', createdAt: '2025-08-01T14:00:00Z', paymentGatewayRef: 'pay_exp_1010', settlementStatus: 'SETTLED', refunds: [], businessDate: '2025-08-01' },
    { id: 'pay-10', hotelId: 'h-01', bookingId: 'b-11', amount: 32000, status: 'SUCCESS', method: 'UPI', createdAt: '2025-08-10T09:00:00Z', paymentGatewayRef: 'pay_dir_1011', settlementStatus: 'SETTLED', refunds: [], businessDate: '2025-08-10' },
    { id: 'pay-11', hotelId: 'h-01', bookingId: 'b-12', amount: 80000, status: 'SUCCESS', method: 'CARD', createdAt: '2025-08-15T13:30:00Z', paymentGatewayRef: 'rzp_live_curry12', settlementStatus: 'SETTLED', refunds: [], businessDate: '2025-08-15' },
    { id: 'pay-12', hotelId: 'h-01', bookingId: 'b-13', amount: 28000, status: 'SUCCESS', method: 'UPI', createdAt: '2025-09-01T11:15:00Z', paymentGatewayRef: 'pay_dir_1013', settlementStatus: 'SETTLED', refunds: [], businessDate: '2025-09-01' },
    { id: 'pay-13', hotelId: 'h-01', bookingId: 'b-14', amount: 150000, status: 'SUCCESS', method: 'BANK_TRANSFER', createdAt: '2025-09-05T13:45:00Z', paymentGatewayRef: 'TXN_GOOGLE_014', settlementStatus: 'SETTLED', refunds: [{ amount: 5000, reason: 'OVERPAYMENT', date: '2025-09-12' }], businessDate: '2025-09-05' },
    { id: 'pay-14', hotelId: 'h-01', bookingId: 'b-15', amount: 90000, status: 'SUCCESS', method: 'CARD', createdAt: '2025-10-01T15:00:00Z', paymentGatewayRef: 'rzp_live_khanna15', settlementStatus: 'SETTLED', refunds: [], businessDate: '2025-10-01' },
    { id: 'pay-15', hotelId: 'h-04', bookingId: 'b-03', amount: 5000, status: 'SUCCESS', method: 'CARD', createdAt: '2025-05-14T10:00:00Z', paymentGatewayRef: 'rzp_live_seth03', settlementStatus: 'PENDING', refunds: [], businessDate: '2025-05-14' }
  ]
};

// ============================================================================
// OPERATIONS & ANALYTICS
// ============================================================================

// Extracted for handler compatibility
export const maintenanceMockData = {
  maintenanceIssues: [
    { id: 'mt-01', hotelId: 'h-01', roomId: 'r-12', issueType: 'PLUMBING', priority: 'HIGH', reportedBy: 'u-t01-04', status: 'OPEN', description: 'Heavy water leakage from AC vent in ceiling.', slaDeadline: '2025-05-12T14:00:00Z' },
    { id: 'mt-02', hotelId: 'h-01', roomId: 'r-01', issueType: 'ELECTRICAL', priority: 'MEDIUM', reportedBy: 'u-t01-04', status: 'IN_PROGRESS', description: 'Lights flickering in bathroom.', slaDeadline: '2025-05-12T18:00:00Z' },
    { id: 'mt-03', hotelId: 'h-01', roomId: 'r-02', issueType: 'HVAC', priority: 'CRITICAL', reportedBy: 'u-t01-03', status: 'OPEN', description: 'AC not cooling in occupied room.', slaDeadline: '2025-05-12T12:00:00Z' },
    { id: 'mt-04', hotelId: 'h-01', roomId: 'r-13', issueType: 'FURNITURE', priority: 'LOW', reportedBy: 'u-t01-04', status: 'CLOSED', description: 'Loose handle on wardrobe.', slaDeadline: '2025-05-15T10:00:00Z' },
    { id: 'mt-05', hotelId: 'h-04', roomId: 'r-15', issueType: 'PLUMBING', priority: 'HIGH', reportedBy: 'u-t02-03', status: 'OPEN', description: 'Drain blockage in bathtub.', slaDeadline: '2025-05-12T15:00:00Z' },
    { id: 'mt-06', hotelId: 'h-04', roomId: 'r-16', issueType: 'ELECTRICAL', priority: 'LOW', reportedBy: 'u-t02-03', status: 'RESOLVED', description: 'Bedside lamp not working.', slaDeadline: '2025-05-14T09:00:00Z' },
    { id: 'mt-07', hotelId: 'h-06', roomId: 'r-17', issueType: 'CLEANING', priority: 'MEDIUM', reportedBy: 'u-t03-02', status: 'OPEN', description: 'Deep carpet stain detected during inspection.', slaDeadline: '2025-05-12T17:00:00Z' },
    { id: 'mt-08', hotelId: 'h-06', roomId: 'r-18', issueType: 'HVAC', priority: 'HIGH', reportedBy: 'u-t03-02', status: 'IN_PROGRESS', description: 'Loud rattling noise from fan unit.', slaDeadline: '2025-05-12T16:00:00Z' },
    { id: 'mt-09', hotelId: 'h-08', roomId: 'r-19', issueType: 'ELECTRICAL', priority: 'MEDIUM', reportedBy: 'u-t04-01', status: 'OPEN', description: 'TV remote signal weak.', slaDeadline: '2025-05-13T11:00:00Z' },
    { id: 'mt-10', hotelId: 'h-10', roomId: 'r-20', issueType: 'PLUMBING', priority: 'MEDIUM', reportedBy: 'u-t05-01', status: 'OPEN', description: 'Minor leak from flush tank.', slaDeadline: '2025-05-13T14:00:00Z' },
    { id: 'mt-11', hotelId: 'h-12', roomId: 'r-21', issueType: 'HVAC', priority: 'CRITICAL', reportedBy: 'u-t07-01', status: 'IN_PROGRESS', description: 'Complete AC failure.', slaDeadline: '2025-05-12T13:00:00Z' },
    { id: 'mt-12', hotelId: 'h-14', roomId: 'r-22', issueType: 'FURNITURE', priority: 'LOW', reportedBy: 'u-t09-01', status: 'OPEN', description: 'Upholstery tear on sofa.', slaDeadline: '2025-05-16T10:00:00Z' },
    { id: 'mt-13', hotelId: 'h-15', roomId: 'r-23', issueType: 'CLEANING', priority: 'LOW', reportedBy: 'u-t10-01', status: 'OPEN', description: 'Window streaking outside.', slaDeadline: '2025-05-15T12:00:00Z' },
    { id: 'mt-14', hotelId: 'h-01', roomId: 'r-14', issueType: 'PLUMBING', priority: 'MEDIUM', reportedBy: 'u-t01-04', status: 'CLOSED', description: 'Faucet dripping.', slaDeadline: '2025-05-11T14:00:00Z' },
    { id: 'mt-15', hotelId: 'h-01', roomId: 'r-03', issueType: 'CLEANING', priority: 'HIGH', reportedBy: 'u-t01-04', status: 'OPEN', description: 'Strong smoke odor remediation.', slaDeadline: '2025-05-12T11:00:00Z' }
  ]
};

// Extracted for handler compatibility
export const housekeepingMockData = {
  housekeepingRooms: [
    { id: 'r-01', number: '101', status: 'CLEAN', floor: 1, assignedTo: 'u-t01-04', lastCleaned: '2025-05-12T10:00:00Z' },
    { id: 'r-03', number: '103', status: 'DIRTY', floor: 1, assignedTo: 'u-t01-04', lastCleaned: '2025-05-10T14:20:00Z' },
    { id: 'r-05', number: '105', status: 'CLEAN', floor: 1, assignedTo: 'u-t01-04', lastCleaned: '2025-05-12T08:00:00Z' },
    { id: 'r-06', number: '106', status: 'DIRTY', floor: 1, assignedTo: 'u-t01-04', lastCleaned: '2025-05-11T20:00:00Z' },
    { id: 'r-08', number: '108', status: 'CLEAN', floor: 1, assignedTo: 'u-t01-04', lastCleaned: '2025-05-12T09:15:00Z' }
  ],
  housekeepingSummary: {
    totalRooms: 23,
    cleanRooms: 15,
    dirtyRooms: 5,
    inspectedRooms: 3,
    outOfServiceRooms: 2,
    averageCleaningTime: 24
  },
  cleaningLogs: [
    { id: 'cl-01', roomId: 'r-01', cleanedBy: 'u-t01-04', cleanedAt: '2025-05-12T10:00:00Z', duration: 22, status: 'COMPLETED' },
    { id: 'cl-02', roomId: 'r-05', cleanedBy: 'u-t01-04', cleanedAt: '2025-05-12T08:00:00Z', duration: 25, status: 'COMPLETED' },
    { id: 'cl-03', roomId: 'r-08', cleanedBy: 'u-t01-04', cleanedAt: '2025-05-12T09:15:00Z', duration: 20, status: 'COMPLETED' },
    { id: 'cl-04', roomId: 'r-10', cleanedBy: 'u-t01-04', cleanedAt: '2025-05-12T06:00:00Z', duration: 18, status: 'COMPLETED' },
    { id: 'cl-05', roomId: 'r-11', cleanedBy: 'u-t01-04', cleanedAt: '2025-05-12T05:45:00Z', duration: 23, status: 'COMPLETED' }
  ],
  housekeepingChecklists: [
    { id: 'hk-01', roomId: 'r-01', checklistItems: ['Bed linens changed', 'Mini-bar restocked', 'Towels replaced'], status: 'COMPLETED' },
    { id: 'hk-02', roomId: 'r-03', checklistItems: ['Floor vacuumed', 'Dusting', 'Mirror cleaned'], status: 'PENDING' },
    { id: 'hk-03', roomId: 'r-05', checklistItems: ['Bed linens changed', 'Towels replaced', 'AC checked'], status: 'COMPLETED' },
    { id: 'hk-04', roomId: 'r-06', checklistItems: ['Mini-bar restocked', 'Dusting'], status: 'PENDING' },
    { id: 'hk-05', roomId: 'r-08', checklistItems: ['Full deep clean', 'Linen change'], status: 'COMPLETED' },
    { id: 'hk-06', roomId: 'r-10', checklistItems: ['Bathroom sanitized', 'Floor mopped'], status: 'COMPLETED' },
    { id: 'hk-07', roomId: 'r-11', checklistItems: ['Bed linens changed', 'Window cleaned'], status: 'PENDING' },
    { id: 'hk-08', roomId: 'r-13', checklistItems: ['Mini-bar restocked', 'Towels replaced'], status: 'COMPLETED' },
    { id: 'hk-09', roomId: 'r-14', checklistItems: ['Dusting', 'Mirror cleaned'], status: 'COMPLETED' },
    { id: 'hk-10', roomId: 'r-16', checklistItems: ['AC filter cleaned', 'Floor Mopped'], status: 'COMPLETED' },
    { id: 'hk-11', roomId: 'r-17', checklistItems: ['Towels replaced', 'Soap restocked'], status: 'COMPLETED' },
    { id: 'hk-12', roomId: 'r-19', checklistItems: ['Bed linens changed', 'Dusting'], status: 'COMPLETED' },
    { id: 'hk-13', roomId: 'r-20', checklistItems: ['Bathroom sanitized', 'Mirror cleaned'], status: 'COMPLETED' },
    { id: 'hk-14', roomId: 'r-21', checklistItems: ['Floor vacuumed', 'AC checked'], status: 'COMPLETED' },
    { id: 'hk-15', roomId: 'r-22', checklistItems: ['Bed linens changed', 'Mini-bar restocked'], status: 'PENDING' }
  ]
};

// Extracted for handler compatibility
export const settingsMockData = {
  hotelSettings: [
    { hotelId: 'h-01', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'taj_mahal_wifi', parkingAvailable: true, currency: 'INR', timezone: 'Asia/Kolkata' },
    { hotelId: 'h-02', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'rambagh_wifi', parkingAvailable: true, currency: 'INR', timezone: 'Asia/Kolkata' },
    { hotelId: 'h-03', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'landsend_wifi', parkingAvailable: true, currency: 'INR', timezone: 'Asia/Kolkata' },
    { hotelId: 'h-04', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'oberoi_wifi', parkingAvailable: true, currency: 'INR', timezone: 'Asia/Kolkata' },
    { hotelId: 'h-05', checkInTime: '14:00', checkOutTime: '12:00', wifiPassword: 'rajvilas_wifi', parkingAvailable: true, currency: 'INR', timezone: 'Asia/Kolkata' }
  ],
  staffUsers: [
    { id: 'u-t01-02', name: 'Rajesh Kumar', email: 'rajesh.k@taj.com', role: 'HOTEL_MANAGER', tenantId: 't-01', hotelId: 'h-01', department: 'FRONT_OFFICE', isActive: true },
    { id: 'u-t01-03', name: 'Sunita Rao', email: 'sunita.r@taj.com', role: 'FRONT_DESK', tenantId: 't-01', hotelId: 'h-01', department: 'FRONT_OFFICE', isActive: true },
    { id: 'u-t01-04', name: 'Amit Singh', email: 'amit.s@taj.com', role: 'HOUSEKEEPING', tenantId: 't-01', hotelId: 'h-01', department: 'HK', isActive: true },
    { id: 'u-t01-05', name: 'Karan Mehra', email: 'karan.m@taj.com', role: 'HOTEL_MANAGER', tenantId: 't-01', hotelId: 'h-02', department: 'FRONT_OFFICE', isActive: true },
    { id: 'u-t01-06', name: 'Lisa Dsouza', email: 'lisa.d@taj.com', role: 'FRONT_DESK', tenantId: 't-01', hotelId: 'h-02', department: 'FRONT_OFFICE', isActive: true }
  ]
};

// Extracted for handler compatibility
export const pricingMockData = {
  ratePlans: [
    { id: 'rp-01', name: 'Best Available Rate', hotelId: 'h-01', mealPlan: 'CP', refundable: true, isActive: true },
    { id: 'rp-02', name: 'Corporate Negotiated', hotelId: 'h-01', mealPlan: 'MAP', refundable: true, isActive: true },
    { id: 'rp-03', name: 'OTA Saver Non-Ref', hotelId: 'h-01', mealPlan: 'EP', refundable: false, isActive: true },
    { id: 'rp-04', name: 'Weekend Gateway', hotelId: 'h-01', mealPlan: 'CP', refundable: true, isActive: true },
    { id: 'rp-05', name: 'Early Bird Special', hotelId: 'h-01', mealPlan: 'AP', refundable: true, isActive: true }
  ],
  newRatePlan: {
    id: 'rp-new-01',
    name: 'Flash Sale',
    hotelId: 'h-01',
    mealPlan: 'EP',
    refundable: false,
    isActive: true
  },
  pricingCalendar: [
    { date: '2025-06-01', roomTypeId: 'rt-01', basePrice: 25000, adjustedPrice: 28000, occupancy: 85 },
    { date: '2025-06-02', roomTypeId: 'rt-01', basePrice: 25000, adjustedPrice: 26000, occupancy: 78 },
    { date: '2025-06-03', roomTypeId: 'rt-01', basePrice: 25000, adjustedPrice: 25000, occupancy: 65 },
    { date: '2025-06-04', roomTypeId: 'rt-01', basePrice: 25000, adjustedPrice: 27000, occupancy: 82 },
    { date: '2025-06-05', roomTypeId: 'rt-01', basePrice: 25000, adjustedPrice: 29000, occupancy: 92 }
  ]
};

export const operationalMockData = {
  activityFeed: [
    { id: 'act-01', type: 'CHECK_IN', relatedEntityId: 'b-02', userId: 'u-t01-03', timestamp: '2025-05-12T14:15:00Z', businessDate: '2025-05-12' },
    { id: 'act-02', type: 'BOOKING_MODIFIED', relatedEntityId: 'b-01', userId: 'u-t01-03', timestamp: '2025-05-10T11:00:00Z', businessDate: '2025-05-10' },
    { id: 'act-03', type: 'MAINTENANCE_CREATED', relatedEntityId: 'mt-03', userId: 'u-t01-03', timestamp: '2025-05-11T12:00:00Z', businessDate: '2025-05-11' },
    { id: 'act-04', type: 'PAYMENT_RECEIVED', relatedEntityId: 'pay-01', userId: 'u-t01-03', timestamp: '2025-05-10T10:00:00Z', businessDate: '2025-05-10' },
    { id: 'act-05', type: 'ROOM_STATUS_CHANGE', relatedEntityId: 'r-03', userId: 'u-t01-04', timestamp: '2025-05-12T15:00:00Z', businessDate: '2025-05-12' },
    { id: 'act-06', type: 'CHECK_IN', relatedEntityId: 'b-07', userId: 'u-t01-03', timestamp: '2025-07-01T12:00:00Z', businessDate: '2025-07-01' },
    { id: 'act-07', type: 'BOOKING_CREATED', relatedEntityId: 'b-10', userId: 'u-t01-11', timestamp: '2025-07-15T14:00:00Z', businessDate: '2025-07-15' },
    { id: 'act-08', type: 'MAINTENANCE_RESOLVED', relatedEntityId: 'mt-04', userId: 'u-t01-04', timestamp: '2025-05-14T10:00:00Z', businessDate: '2025-05-14' },
    { id: 'act-09', type: 'GUEST_PROFILE_UPDATED', relatedEntityId: 'g-01', userId: 'u-t01-03', timestamp: '2025-05-12T14:45:00Z', businessDate: '2025-05-12' },
    { id: 'act-10', type: 'NIGHT_AUDIT_STARTED', relatedEntityId: 'na-01', userId: 'u-t01-14', timestamp: '2025-05-11T00:00:01Z', businessDate: '2025-05-11' },
    { id: 'act-11', type: 'SHIFT_CLOSED', relatedEntityId: 'sh-01', userId: 'u-t01-03', timestamp: '2025-05-10T14:00:00Z', businessDate: '2025-05-10' },
    { id: 'act-12', type: 'INVOICE_GENERATED', relatedEntityId: 'inv-01', userId: 'u-t01-03', timestamp: '2025-05-14T10:00:00Z', businessDate: '2025-05-14' },
    { id: 'act-13', type: 'MAINTENANCE_CREATED', relatedEntityId: 'mt-01', userId: 'u-t01-04', timestamp: '2025-05-12T14:00:00Z', businessDate: '2025-05-12' },
    { id: 'act-14', type: 'OTA_SYNC_SUCCESS', relatedEntityId: 'pl-01', userId: 'SYSTEM', timestamp: '2025-05-10T10:05:00Z', businessDate: '2025-05-10' },
    { id: 'act-15', type: 'ROOM_CLEANED', relatedEntityId: 'r-01', userId: 'u-t01-04', timestamp: '2025-05-12T10:00:00Z', businessDate: '2025-05-12' }
  ],
  nightAuditLogs: [
    { id: 'na-01', hotelId: 'h-01', businessDate: '2025-05-10', totalRoomRevenue: 154000, totalNonRoomRevenue: 31000, status: 'CLOSED', flashSummary: 'Occupancy 82%. Zero ledger variances.', timestamp: '2025-05-11T00:00:00Z' },
    { id: 'na-02', hotelId: 'h-01', businessDate: '2025-05-11', totalRoomRevenue: 142000, totalNonRoomRevenue: 28000, status: 'CLOSED', flashSummary: 'Occupancy 78%. No issues.', timestamp: '2025-05-12T00:00:00Z' },
    { id: 'na-03', hotelId: 'h-01', businessDate: '2025-05-12', totalRoomRevenue: 168000, totalNonRoomRevenue: 35000, status: 'CLOSED', flashSummary: 'Occupancy 85%. Smooth audit.', timestamp: '2025-05-13T00:00:00Z' },
    { id: 'na-04', hotelId: 'h-01', businessDate: '2025-05-13', totalRoomRevenue: 135000, totalNonRoomRevenue: 22000, status: 'CLOSED', flashSummary: 'Occupancy 70%.', timestamp: '2025-05-14T00:00:00Z' },
    { id: 'na-05', hotelId: 'h-01', businessDate: '2025-05-14', totalRoomRevenue: 189000, totalNonRoomRevenue: 41000, status: 'CLOSED', flashSummary: 'Occupancy 92%. Record day.', timestamp: '2025-05-15T00:00:00Z' },
    { id: 'na-06', hotelId: 'h-01', businessDate: '2025-05-15', totalRoomRevenue: 120000, totalNonRoomRevenue: 18000, status: 'CLOSED', timestamp: '2025-05-16T00:00:00Z' },
    { id: 'na-07', hotelId: 'h-01', businessDate: '2025-05-16', totalRoomRevenue: 145000, totalNonRoomRevenue: 25000, status: 'CLOSED', timestamp: '2025-05-17T00:00:00Z' },
    { id: 'na-08', hotelId: 'h-01', businessDate: '2025-05-17', totalRoomRevenue: 160000, totalNonRoomRevenue: 30000, status: 'CLOSED', timestamp: '2025-05-18T00:00:00Z' },
    { id: 'na-09', hotelId: 'h-01', businessDate: '2025-05-18', totalRoomRevenue: 175000, totalNonRoomRevenue: 32000, status: 'CLOSED', timestamp: '2025-05-19T00:00:00Z' },
    { id: 'na-10', hotelId: 'h-01', businessDate: '2025-05-19', totalRoomRevenue: 190000, totalNonRoomRevenue: 38000, status: 'CLOSED', timestamp: '2025-05-20T00:00:00Z' },
    { id: 'na-11', hotelId: 'h-01', businessDate: '2025-05-20', totalRoomRevenue: 110000, totalNonRoomRevenue: 15000, status: 'CLOSED', timestamp: '2025-05-21T00:00:00Z' },
    { id: 'na-12', hotelId: 'h-01', businessDate: '2025-05-21', totalRoomRevenue: 130000, totalNonRoomRevenue: 22000, status: 'CLOSED', timestamp: '2025-05-22T00:00:00Z' },
    { id: 'na-13', hotelId: 'h-01', businessDate: '2025-05-22', totalRoomRevenue: 150000, totalNonRoomRevenue: 28000, status: 'CLOSED', timestamp: '2025-05-23T00:00:00Z' },
    { id: 'na-14', hotelId: 'h-01', businessDate: '2025-05-23', totalRoomRevenue: 165000, totalNonRoomRevenue: 31000, status: 'CLOSED', timestamp: '2025-05-24T00:00:00Z' },
    { id: 'na-15', hotelId: 'h-01', businessDate: '2025-05-24', totalRoomRevenue: 180000, totalNonRoomRevenue: 35000, status: 'CLOSED', timestamp: '2025-05-25T00:00:00Z' }
  ]
};

export const analyticsMockData = {
  reportSummary: {
    totalRevenue: 2850000,
    totalBookings: 245,
    averageOccupancy: 78.4,
    revPAR: 9680,
    adr: 12350
  },
  revenueTrend: [
    { date: '2025-04-01', revenue: 150000, bookings: 12 },
    { date: '2025-04-02', revenue: 165000, bookings: 14 },
    { date: '2025-04-03', revenue: 140000, bookings: 10 },
    { date: '2025-04-04', revenue: 180000, bookings: 18 },
    { date: '2025-04-05', revenue: 210000, bookings: 22 },
    { date: '2025-04-06', revenue: 250000, bookings: 25 },
    { date: '2025-04-07', revenue: 190000, bookings: 15 },
    { date: '2025-04-08', revenue: 175000, bookings: 14 },
    { date: '2025-04-09', revenue: 160000, bookings: 12 },
    { date: '2025-04-10', revenue: 200000, bookings: 20 },
    { date: '2025-04-11', revenue: 225000, bookings: 24 },
    { date: '2025-04-12', revenue: 240000, bookings: 26 },
    { date: '2025-04-13', revenue: 185000, bookings: 16 },
    { date: '2025-04-14', revenue: 170000, bookings: 14 },
    { date: '2025-04-15', revenue: 195000, bookings: 19 }
  ],
  occupancyTrend: [
    { date: '2025-04-01', occupancy: 65 },
    { date: '2025-04-02', occupancy: 68 },
    { date: '2025-04-03', occupancy: 62 },
    { date: '2025-04-04', occupancy: 75 },
    { date: '2025-04-05', occupancy: 82 },
    { date: '2025-04-06', occupancy: 88 },
    { date: '2025-04-07', occupancy: 70 },
    { date: '2025-04-08', occupancy: 67 },
    { date: '2025-04-09', occupancy: 64 },
    { date: '2025-04-10', occupancy: 78 },
    { date: '2025-04-11', occupancy: 81 },
    { date: '2025-04-12', occupancy: 85 },
    { date: '2025-04-13', occupancy: 72 },
    { date: '2025-04-14', occupancy: 69 },
    { date: '2025-04-15', occupancy: 74 }
  ],
  dashboardStats: [
    { id: 'ds-01', label: 'Total Revenue (YTD)', value: '₹1.54 Cr', trend: '+12.5%' },
    { id: 'ds-02', label: 'Average Occupancy', value: '78.4%', trend: '+4.2%' },
    { id: 'ds-03', label: 'RevPAR', value: '₹9,680', trend: '+8.4%' },
    { id: 'ds-04', label: 'ADR', value: '₹12,350', trend: '+3.1%' },
    { id: 'ds-05', label: 'Direct Bookings', value: '45.2%', trend: '+1.5%' },
    { id: 'ds-06', label: 'Cancellation Rate', value: '8.4%', trend: '-2.1%' },
    { id: 'ds-07', label: 'Guest Satisfaction', value: '4.8/5', trend: '+0.2' },
    { id: 'ds-08', label: 'Repeat Guests', value: '32%', trend: '+5.4%' },
    { id: 'ds-09', label: 'OTA Commission YTD', value: '₹12.4L', trend: '-1.2%' },
    { id: 'ds-10', label: 'HK Efficiency', value: '24m/room', trend: '-2m' },
    { id: 'ds-11', label: 'F&B Contribution', value: '22%', trend: '+4%' },
    { id: 'ds-12', label: 'Average Stay Length', value: '2.4 days', trend: '+0.1' },
    { id: 'ds-13', label: 'Maintenance Backlog', value: '4 tickets', trend: '-2' },
    { id: 'ds-14', label: 'Staff Productivity', value: '92%', trend: '+2%' },
    { id: 'ds-15', label: 'Digital Check-in Adoption', value: '64%', trend: '+12%' }
  ]
};

// ============================================================================
// REVENUE & GOVERNANCE
// ============================================================================

// Deprecated - moved to pricingMockData
export const revenueMockData = {
  ratePlans: []
};

export const governanceMockData = {
  auditLogs: [
    { id: 'aud-01', hotelId: 'h-01', userId: 'u-t01-01', action: 'PRICE_UPDATE', entity: 'RoomType:rt-01', before: { basePrice: 25000, active: true }, after: { basePrice: 28000, active: true }, timestamp: '2025-05-09T10:00:00Z', changeSource: 'WEB_UI' },
    { id: 'aud-02', hotelId: 'h-01', userId: 'u-t01-03', action: 'BOOKING_STATUS_CHANGE', entity: 'Booking:b-01', before: { status: 'PENDING' }, after: { status: 'CONFIRMED' }, timestamp: '2025-05-10T14:20:00Z', changeSource: 'WEB_UI' },
    { id: 'aud-03', hotelId: 'h-01', userId: 'u-t01-04', action: 'ROOM_STATUS_TRANSITION', entity: 'Room:r-03', before: { status: 'DIRTY' }, after: { status: 'CLEAN' }, timestamp: '2025-05-12T10:00:00Z', changeSource: 'MOBILE_APP' },
    { id: 'aud-04', hotelId: 'h-01', userId: 'u-t01-02', action: 'DISCOUNT_APPROVAL', entity: 'Approval:apr-t01-02', before: { status: 'PENDING' }, after: { status: 'APPROVED' }, timestamp: '2025-05-10T11:00:00Z', changeSource: 'WEB_UI' },
    { id: 'aud-05', hotelId: 'h-01', userId: 'u-t01-01', action: 'USER_ROLE_UPDATE', entity: 'User:u-t01-02', before: { role: 'HOTEL_MANAGER' }, after: { role: 'REGIONAL_DIRECTOR' }, timestamp: '2025-05-08T09:00:00Z', changeSource: 'SYSTEM_ADMIN' },
    { id: 'aud-06', hotelId: 'h-01', userId: 'u-t01-01', action: 'BRAND_COLOR_CHANGE', entity: 'Branding:t-01', before: { primaryColor: '#B22222' }, after: { primaryColor: '#C0392B' }, timestamp: '2025-05-11T10:00:00Z', changeSource: 'WEB_UI' },
    { id: 'aud-07', hotelId: 'h-01', userId: 'u-t01-14', action: 'NIGHT_AUDIT_RUN', entity: 'Audit:na-01', before: { status: 'OPEN' }, after: { status: 'CLOSED' }, timestamp: '2025-05-11T00:00:01Z', changeSource: 'AUTO_JOB' },
    { id: 'aud-08', hotelId: 'h-15', userId: 'u-t10-01', action: 'OTA_SYNC_TRIGGER', entity: 'ChannelManager', before: { lastSync: '2025-05-12T13:00:00Z' }, after: { lastSync: '2025-05-12T14:00:00Z' }, timestamp: '2025-05-12T14:00:00Z', changeSource: 'WEB_UI' },
    { id: 'aud-09', hotelId: 'h-01', userId: 'u-t01-15', action: 'BULK_GUEST_IMPORT', entity: 'CRM', before: { totalGuests: 145 }, after: { totalGuests: 160 }, timestamp: '2025-05-12T15:00:00Z', changeSource: 'WEB_UI' },
    { id: 'aud-10', hotelId: 'h-10', userId: 'u-t05-01', action: 'MAINTENANCE_CLOSE', entity: 'Ticket:mt-11', before: { status: 'IN_PROGRESS' }, after: { status: 'CLOSED' }, timestamp: '2025-05-12T16:00:00Z', changeSource: 'MOBILE_APP' },
    { id: 'aud-11', hotelId: 'h-01', userId: 'u-t01-02', action: 'SHIFT_RECONCILE', entity: 'Shift:sh-01', before: { status: 'OPEN', actualCash: 0 }, after: { status: 'RECONCILED', actualCash: 12500 }, timestamp: '2025-05-12T14:30:00Z', changeSource: 'WEB_UI' },
    { id: 'aud-12', hotelId: 'h-01', userId: 'u-t01-03', action: 'GUEST_ID_UPDATE', entity: 'Guest:g-01', before: { idNumber: '1234-5678-9012' }, after: { idNumber: '1234-5678-9012-A' }, timestamp: '2025-05-12T14:45:00Z', changeSource: 'WEB_UI' },
    { id: 'aud-13', hotelId: 'h-01', userId: 'u-t01-04', action: 'HK_CLEAN_MARK', entity: 'Room:r-03', before: { status: 'DIRTY' }, after: { status: 'CLEAN' }, timestamp: '2025-05-12T15:00:00Z', changeSource: 'MOBILE_APP' },
    { id: 'aud-14', hotelId: 'h-01', userId: 'u-t01-13', action: 'SYS_RESTART', entity: 'Server:PMS-MAIN', before: { uptime: '10d' }, after: { uptime: '0m' }, timestamp: '2025-05-12T03:00:00Z', changeSource: 'CLI' },
    { id: 'aud-15', hotelId: 'h-01', userId: 'u-t01-11', action: 'BLOCK_EXPEDIA_FEED', entity: 'Channel:Expedia', before: { isActive: true }, after: { isActive: false }, timestamp: '2025-05-12T11:00:00Z', changeSource: 'WEB_UI' }
  ],
  approvalRequests: [
    { id: 'apr-01', hotelId: 'h-01', requesterId: 'u-t01-03', type: 'RATE_DISCOUNT', description: '25% discount for long-stay VIP.', amount: 4500, status: 'PENDING', approverId: 'u-t01-02', createdAt: '2025-05-11T09:30:00Z' },
    { id: 'apr-02', hotelId: 'h-01', requesterId: 'u-t01-03', type: 'INVENTORY_OVERRIDE', description: 'Overriding lock for corporate block.', status: 'APPROVED', approverId: 'u-t01-02', createdAt: '2025-05-10T11:00:00Z' },
    { id: 'apr-03', hotelId: 'h-01', requesterId: 'u-t01-04', type: 'MAINTENANCE_EXPENSE', description: 'Urgent plumbing spare parts.', amount: 12000, status: 'REJECTED', approverId: 'u-t01-02', createdAt: '2025-05-12T10:00:00Z' },
    { id: 'apr-04', hotelId: 'h-01', requesterId: 'u-t01-11', type: 'OTA_REFUND', description: 'Guest canceled via Booking.com, requested refund.', amount: 15000, status: 'PENDING', approverId: 'u-t01-14', createdAt: '2025-05-12T14:00:00Z' },
    { id: 'apr-05', hotelId: 'h-01', requesterId: 'u-t01-03', type: 'COMPLIMENTARY_UPGRADE', description: 'Anniversary couple upgrade to Suite.', status: 'APPROVED', approverId: 'u-t01-02', createdAt: '2025-05-12T08:00:00Z' },
    { id: 'apr-06', hotelId: 'h-02', requesterId: 'u-t01-05', type: 'RATE_DISCOUNT', description: 'Group booking discount 15%.', amount: 30000, status: 'PENDING', approverId: 'u-t01-01', createdAt: '2025-05-12T11:00:00Z' },
    { id: 'apr-07', hotelId: 'h-04', requesterId: 'u-t02-03', type: 'INVENTORY_OVERRIDE', description: 'Force release OTA lock for walk-in.', status: 'APPROVED', approverId: 'u-t02-01', createdAt: '2025-05-12T13:00:00Z' },
    { id: 'apr-08', hotelId: 'h-01', requesterId: 'u-t01-15', type: 'MARKETING_BUDGET', description: 'Local SEO ad campaign.', amount: 50000, status: 'PENDING', approverId: 'u-t01-01', createdAt: '2025-05-11T16:00:00Z' },
    { id: 'apr-09', hotelId: 'h-01', requesterId: 'u-t01-08', type: 'KITCHEN_PURCHASE', description: 'Bulk order of premium sea food.', amount: 25000, status: 'APPROVED', approverId: 'u-t01-02', createdAt: '2025-05-12T07:00:00Z' },
    { id: 'apr-10', hotelId: 'h-06', requesterId: 'u-t03-02', type: 'MAINTENANCE_EXPENSE', description: 'Lift cable replacement.', amount: 150000, status: 'PENDING', approverId: 'u-t03-01', createdAt: '2025-05-12T09:00:00Z' },
    { id: 'apr-11', hotelId: 'h-01', requesterId: 'u-t01-03', type: 'EARLY_CHECKIN_WAIVER', description: 'Diamond member early arrival.', status: 'APPROVED', approverId: 'u-t01-02', createdAt: '2025-05-12T06:00:00Z' },
    { id: 'apr-12', hotelId: 'h-08', requesterId: 'u-t04-01', type: 'RATE_DISCOUNT', description: 'Govt official discounted rate.', amount: 2000, status: 'APPROVED', approverId: 'u-t04-01', createdAt: '2025-05-12T10:30:00Z' },
    { id: 'apr-13', hotelId: 'h-01', requesterId: 'u-t01-12', type: 'BAR_INVENTORY', description: 'Restock premium whiskey selection.', amount: 45000, status: 'PENDING', approverId: 'u-t01-02', createdAt: '2025-05-12T15:00:00Z' },
    { id: 'apr-14', hotelId: 'h-01', requesterId: 'u-t01-03', type: 'PET_FEE_WAIVER', description: 'Service animal exception.', status: 'APPROVED', approverId: 'u-t01-02', createdAt: '2025-05-12T12:00:00Z' },
    { id: 'apr-15', hotelId: 'h-15', requesterId: 'u-t10-01', type: 'RATE_DISCOUNT', description: 'Regency Club promotion.', amount: 5000, status: 'PENDING', approverId: 'u-t10-01', createdAt: '2025-05-12T14:15:00Z' }
  ],
  commTemplates: [
    { id: 'ct-01', name: 'Check-in Welcome', channel: 'WHATSAPP', content: 'Welcome to {{hotelName}}! Your room {{roomNumber}} is ready.' },
    { id: 'ct-02', name: 'Check-out Thank You', channel: 'EMAIL', content: 'Thank you for staying at {{hotelName}}. We hope to see you soon!' },
    { id: 'ct-03', name: 'Booking Confirmation', channel: 'SMS', content: 'Your booking {{bookingNumber}} is confirmed for {{checkInDate}}.' },
    { id: 'ct-04', name: 'Invoice Receipt', channel: 'EMAIL', content: 'Please find attached invoice {{invoiceNumber}} for your stay.' },
    { id: 'ct-05', name: 'Maintenance Alert', channel: 'INTERNAL', content: 'New maintenance ticket {{ticketId}} reported for Room {{roomNumber}}.' },
    { id: 'ct-06', name: 'Loyalty Statement', channel: 'EMAIL', content: 'Your loyalty balance is {{loyaltyBalance}} points.' },
    { id: 'ct-07', name: 'Dining Reservation', channel: 'WHATSAPP', content: 'Your table is booked for {{time}} at {{restaurantName}}.' },
    { id: 'ct-08', name: 'Spa Confirmation', channel: 'SMS', content: 'Your spa session is scheduled for {{time}}.' },
    { id: 'ct-09', name: 'Payment Reminder', channel: 'EMAIL', content: 'Pending payment of {{amount}} for booking {{bookingNumber}}.' },
    { id: 'ct-10', name: 'Review Request', channel: 'WHATSAPP', content: 'How was your stay? Please rate us here: {{reviewLink}}' },
    { id: 'ct-11', name: 'Pre-arrival Checklist', channel: 'EMAIL', content: 'Get ready for your stay! Complete your web check-in here.' },
    { id: 'ct-12', name: 'Concierge Inquiry', channel: 'INTERNAL', content: 'Guest {{guestName}} requested local tour info.' },
    { id: 'ct-13', name: 'Security Alert', channel: 'SMS', content: 'Unauthorized access detected at {{location}}.' },
    { id: 'ct-14', name: 'Birthday Greeting', channel: 'WHATSAPP', content: 'Happy Birthday {{guestName}}! Enjoy a complimentary drink on us.' },
    { id: 'ct-15', name: 'Service Recovery', channel: 'EMAIL', content: 'We apologize for the inconvenience during your stay.' }
  ]
};

// ============================================================================
// CHECK-IN / CHECK-OUT RESPONSE MOCKS
// ============================================================================

export const checkinCheckoutMockData = {
  availableRooms: [
    { id: 'r-01', number: '101', floor: 1, status: 'AVAILABLE', roomType: { id: 'rt-01', name: 'Grand Suite' } },
    { id: 'r-05', number: '105', floor: 1, status: 'AVAILABLE', roomType: { id: 'rt-01', name: 'Grand Suite' } },
    { id: 'r-08', number: '108', floor: 1, status: 'AVAILABLE', roomType: { id: 'rt-02', name: 'Luxury King' } }
  ],
  checkInResponse: {
    success: true,
    message: 'Guest checked in successfully.',
    booking: {
      id: 'b-01',
      status: 'CHECKED_IN',
      room: {
        id: 'r-01',
        number: '101'
      }
    }
  },
  checkOutResponse: {
    success: true,
    message: 'Guest checked out successfully.',
    booking: {
      id: 'b-01',
      status: 'CHECKED_OUT'
    },
    invoice: {
      id: 'inv-01',
      invoiceNumber: 'INV-1001',
      totalAmount: 85000
    }
  },
  generateInvoiceResponse: {
    success: true,
    message: 'Invoice generated successfully.',
    invoice: {
      id: 'inv-01',
      invoiceNumber: 'INV-1001',
      totalAmount: 85000,
      booking: {
        id: 'b-01',
        guestName: 'Rahul Khanna'
      }
    }
  },
  recordPaymentResponse: {
    success: true,
    message: 'Payment recorded successfully.',
    payment: {
      id: 'pay-01',
      amount: 85000,
      method: 'CARD',
      status: 'SUCCESS'
    }
  },
  processRefundResponse: {
    success: true,
    message: 'Refund processed successfully.',
    refund: {
      id: 'ref-01',
      amount: 5000,
      status: 'PROCESSED'
    }
  }
};

// ============================================================================
// PHASE-2: COMMUNICATION MODULE
// ============================================================================

export const phase2CommunicationMockData = {
  featureFlags: {
    COMMUNICATION_LOGS_ENABLED: true,
    COMMUNICATION_TEMPLATES_ENABLED: true,
    COMMUNICATION_AUTOMATION_ENABLED: true,
    COMMUNICATION_EMAIL_ENABLED: true,
    COMMUNICATION_SMS_ENABLED: true,
    COMMUNICATION_WHATSAPP_ENABLED: true
  },
  communicationLogs: [
    { id: 'comm-01', hotelId: 'h-01', guestId: 'g-01', channel: 'WHATSAPP', templateId: 'ct-01', status: 'SENT', sentAt: '2025-05-10T14:00:00Z', content: 'Welcome to Taj Mahal Palace Mumbai! Your room 101 is ready.' },
    { id: 'comm-02', hotelId: 'h-01', guestId: 'g-02', channel: 'EMAIL', templateId: 'ct-03', status: 'SENT', sentAt: '2025-05-12T14:15:00Z', content: 'Your booking LS-1002 is confirmed for 2025-05-12.' },
    { id: 'comm-03', hotelId: 'h-01', guestId: 'g-01', channel: 'SMS', templateId: 'ct-02', status: 'DELIVERED', sentAt: '2025-05-14T12:00:00Z', content: 'Thank you for staying at Taj Mahal Palace Mumbai. We hope to see you soon!' },
    { id: 'comm-04', hotelId: 'h-01', guestId: 'g-05', channel: 'EMAIL', templateId: 'ct-04', status: 'SENT', sentAt: '2025-06-05T10:00:00Z', content: 'Please find attached invoice INV-1004 for your stay.' },
    { id: 'comm-05', hotelId: 'h-01', guestId: 'g-09', channel: 'WHATSAPP', templateId: 'ct-10', status: 'FAILED', sentAt: '2025-07-10T15:00:00Z', content: 'How was your stay? Please rate us here: https://taj.com/review' },
    { id: 'comm-06', hotelId: 'h-04', guestId: 'g-03', channel: 'SMS', templateId: 'ct-03', status: 'SENT', sentAt: '2025-05-15T09:00:00Z', content: 'Your booking LS-1003 is confirmed for 2025-05-15.' },
    { id: 'comm-07', hotelId: 'h-01', guestId: 'g-11', channel: 'EMAIL', templateId: 'ct-11', status: 'SENT', sentAt: '2025-08-01T10:00:00Z', content: 'Get ready for your stay! Complete your web check-in here.' },
    { id: 'comm-08', hotelId: 'h-01', guestId: 'g-15', channel: 'WHATSAPP', templateId: 'ct-14', status: 'DELIVERED', sentAt: '2025-09-05T08:00:00Z', content: 'Happy Birthday Sundar Pichai! Enjoy a complimentary drink on us.' },
    { id: 'comm-09', hotelId: 'h-01', guestId: 'g-07', channel: 'SMS', templateId: 'ct-09', status: 'SENT', sentAt: '2025-06-15T11:00:00Z', content: 'Pending payment of ₹75000 for booking LS-1006.' },
    { id: 'comm-10', hotelId: 'h-01', guestId: 'g-13', channel: 'EMAIL', templateId: 'ct-15', status: 'SENT', sentAt: '2025-08-20T16:00:00Z', content: 'We apologize for the inconvenience during your stay.' }
  ],
  templates: [
    { id: 'ct-01', name: 'Check-in Welcome', channel: 'WHATSAPP', content: 'Welcome to {{hotelName}}! Your room {{roomNumber}} is ready.', isActive: true, hotelId: 'h-01' },
    { id: 'ct-02', name: 'Check-out Thank You', channel: 'EMAIL', content: 'Thank you for staying at {{hotelName}}. We hope to see you soon!', isActive: true, hotelId: 'h-01' },
    { id: 'ct-03', name: 'Booking Confirmation', channel: 'SMS', content: 'Your booking {{bookingNumber}} is confirmed for {{checkInDate}}.', isActive: true, hotelId: 'h-01' },
    { id: 'ct-04', name: 'Invoice Receipt', channel: 'EMAIL', content: 'Please find attached invoice {{invoiceNumber}} for your stay.', isActive: true, hotelId: 'h-01' },
    { id: 'ct-05', name: 'Maintenance Alert', channel: 'INTERNAL', content: 'New maintenance ticket {{ticketId}} reported for Room {{roomNumber}}.', isActive: true, hotelId: 'h-01' },
    { id: 'ct-06', name: 'Loyalty Statement', channel: 'EMAIL', content: 'Your loyalty balance is {{loyaltyBalance}} points.', isActive: true, hotelId: 'h-01' },
    { id: 'ct-07', name: 'Dining Reservation', channel: 'WHATSAPP', content: 'Your table is booked for {{time}} at {{restaurantName}}.', isActive: true, hotelId: 'h-01' },
    { id: 'ct-08', name: 'Spa Confirmation', channel: 'SMS', content: 'Your spa session is scheduled for {{time}}.', isActive: true, hotelId: 'h-01' },
    { id: 'ct-09', name: 'Payment Reminder', channel: 'EMAIL', content: 'Pending payment of {{amount}} for booking {{bookingNumber}}.', isActive: true, hotelId: 'h-01' },
    { id: 'ct-10', name: 'Review Request', channel: 'WHATSAPP', content: 'How was your stay? Please rate us here: {{reviewLink}}', isActive: true, hotelId: 'h-01' }
  ],
  triggers: [
    { id: 'trig-01', name: 'Auto Check-in Welcome', event: 'CHECK_IN', templateId: 'ct-01', channel: 'WHATSAPP', isActive: true, hotelId: 'h-01' },
    { id: 'trig-02', name: 'Auto Check-out Thank You', event: 'CHECK_OUT', templateId: 'ct-02', channel: 'EMAIL', isActive: true, hotelId: 'h-01' },
    { id: 'trig-03', name: 'Auto Booking Confirmation', event: 'BOOKING_CONFIRMED', templateId: 'ct-03', channel: 'SMS', isActive: true, hotelId: 'h-01' },
    { id: 'trig-04', name: 'Auto Invoice Email', event: 'INVOICE_GENERATED', templateId: 'ct-04', channel: 'EMAIL', isActive: true, hotelId: 'h-01' },
    { id: 'trig-05', name: 'Auto Review Request', event: 'CHECK_OUT', templateId: 'ct-10', channel: 'WHATSAPP', isActive: true, hotelId: 'h-01', delayMinutes: 1440 }
  ]
};

// ============================================================================
// PHASE-2: AUDIT MODULE
// ============================================================================

export const phase2AuditMockData = {
  featureFlags: {
    AUDIT_LOGS_ENABLED: true,
    AUDIT_RETENTION_DAYS: 365
  },
  auditLogs: [
    { id: 'aud-p2-01', hotelId: 'h-01', userId: 'u-t01-01', action: 'PRICE_UPDATE', entity: 'RoomType:rt-01', before: { basePrice: 25000 }, after: { basePrice: 28000 }, timestamp: '2025-05-09T10:00:00Z', ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0', severity: 'INFO' },
    { id: 'aud-p2-02', hotelId: 'h-01', userId: 'u-t01-03', action: 'BOOKING_STATUS_CHANGE', entity: 'Booking:b-01', before: { status: 'PENDING' }, after: { status: 'CONFIRMED' }, timestamp: '2025-05-10T14:20:00Z', ipAddress: '192.168.1.101', userAgent: 'Mozilla/5.0', severity: 'INFO' },
    { id: 'aud-p2-03', hotelId: 'h-01', userId: 'u-t01-04', action: 'ROOM_STATUS_TRANSITION', entity: 'Room:r-03', before: { status: 'DIRTY' }, after: { status: 'CLEAN' }, timestamp: '2025-05-12T10:00:00Z', ipAddress: '10.0.0.50', userAgent: 'HousekeepingApp/2.1', severity: 'INFO' },
    { id: 'aud-p2-04', hotelId: 'h-01', userId: 'u-t01-02', action: 'DISCOUNT_APPROVAL', entity: 'Approval:apr-01', before: { status: 'PENDING' }, after: { status: 'APPROVED' }, timestamp: '2025-05-10T11:00:00Z', ipAddress: '192.168.1.102', userAgent: 'Mozilla/5.0', severity: 'WARN' },
    { id: 'aud-p2-05', hotelId: 'h-01', userId: 'u-t01-01', action: 'USER_ROLE_UPDATE', entity: 'User:u-t01-02', before: { role: 'HOTEL_MANAGER' }, after: { role: 'REGIONAL_DIRECTOR' }, timestamp: '2025-05-08T09:00:00Z', ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0', severity: 'WARN' },
    { id: 'aud-p2-06', hotelId: 'h-01', userId: 'u-t01-14', action: 'NIGHT_AUDIT_RUN', entity: 'Audit:na-01', before: { status: 'OPEN' }, after: { status: 'CLOSED' }, timestamp: '2025-05-11T00:00:01Z', ipAddress: 'SYSTEM', userAgent: 'NightAuditJob/1.0', severity: 'INFO' },
    { id: 'aud-p2-07', hotelId: 'h-01', userId: 'u-t01-03', action: 'GUEST_ID_UPDATE', entity: 'Guest:g-01', before: { idNumber: '1234-5678-9012' }, after: { idNumber: '1234-5678-9012-A' }, timestamp: '2025-05-12T14:45:00Z', ipAddress: '192.168.1.101', userAgent: 'Mozilla/5.0', severity: 'WARN' },
    { id: 'aud-p2-08', hotelId: 'h-01', userId: 'u-t01-13', action: 'SYS_RESTART', entity: 'Server:PMS-MAIN', before: { uptime: '10d' }, after: { uptime: '0m' }, timestamp: '2025-05-12T03:00:00Z', ipAddress: '10.0.0.1', userAgent: 'CLI', severity: 'ERROR' },
    { id: 'aud-p2-09', hotelId: 'h-01', userId: 'u-t01-11', action: 'BLOCK_EXPEDIA_FEED', entity: 'Channel:Expedia', before: { isActive: true }, after: { isActive: false }, timestamp: '2025-05-12T11:00:00Z', ipAddress: '192.168.1.105', userAgent: 'Mozilla/5.0', severity: 'WARN' },
    { id: 'aud-p2-10', hotelId: 'h-01', userId: 'u-t01-02', action: 'SHIFT_RECONCILE', entity: 'Shift:sh-01', before: { status: 'OPEN' }, after: { status: 'RECONCILED' }, timestamp: '2025-05-12T14:30:00Z', ipAddress: '192.168.1.102', userAgent: 'Mozilla/5.0', severity: 'INFO' }
  ],
  userActivity: {
    userId: 'u-t01-03',
    totalActions: 245,
    lastActive: '2025-05-12T16:00:00Z',
    topActions: [
      { action: 'BOOKING_CREATED', count: 85 },
      { action: 'CHECK_IN', count: 62 },
      { action: 'CHECK_OUT', count: 58 },
      { action: 'PAYMENT_RECEIVED', count: 40 }
    ]
  }
};

// ============================================================================
// PHASE-2: APPROVAL MODULE
// ============================================================================

export const phase2ApprovalMockData = {
  featureFlags: {
    APPROVAL_WORKFLOWS_ENABLED: true,
    APPROVAL_ESCALATION_ENABLED: true
  },
  approvalRequests: [
    { id: 'apr-p2-01', hotelId: 'h-01', requesterId: 'u-t01-03', type: 'RATE_DISCOUNT', description: '25% discount for long-stay VIP.', amount: 4500, status: 'PENDING', approverId: 'u-t01-02', createdAt: '2025-05-11T09:30:00Z', priority: 'MEDIUM' },
    { id: 'apr-p2-02', hotelId: 'h-01', requesterId: 'u-t01-03', type: 'INVENTORY_OVERRIDE', description: 'Overriding lock for corporate block.', status: 'APPROVED', approverId: 'u-t01-02', createdAt: '2025-05-10T11:00:00Z', approvedAt: '2025-05-10T11:15:00Z', priority: 'HIGH' },
    { id: 'apr-p2-03', hotelId: 'h-01', requesterId: 'u-t01-04', type: 'MAINTENANCE_EXPENSE', description: 'Urgent plumbing spare parts.', amount: 12000, status: 'REJECTED', approverId: 'u-t01-02', createdAt: '2025-05-12T10:00:00Z', rejectedAt: '2025-05-12T10:30:00Z', priority: 'LOW' },
    { id: 'apr-p2-04', hotelId: 'h-01', requesterId: 'u-t01-11', type: 'OTA_REFUND', description: 'Guest canceled via Booking.com, requested refund.', amount: 15000, status: 'PENDING', approverId: 'u-t01-14', createdAt: '2025-05-12T14:00:00Z', priority: 'HIGH' },
    { id: 'apr-p2-05', hotelId: 'h-01', requesterId: 'u-t01-03', type: 'COMPLIMENTARY_UPGRADE', description: 'Anniversary couple upgrade to Suite.', status: 'APPROVED', approverId: 'u-t01-02', createdAt: '2025-05-12T08:00:00Z', approvedAt: '2025-05-12T08:10:00Z', priority: 'MEDIUM' },
    { id: 'apr-p2-06', hotelId: 'h-02', requesterId: 'u-t01-05', type: 'RATE_DISCOUNT', description: 'Group booking discount 15%.', amount: 30000, status: 'PENDING', approverId: 'u-t01-01', createdAt: '2025-05-12T11:00:00Z', priority: 'HIGH' },
    { id: 'apr-p2-07', hotelId: 'h-04', requesterId: 'u-t02-03', type: 'INVENTORY_OVERRIDE', description: 'Force release OTA lock for walk-in.', status: 'APPROVED', approverId: 'u-t02-01', createdAt: '2025-05-12T13:00:00Z', approvedAt: '2025-05-12T13:05:00Z', priority: 'CRITICAL' },
    { id: 'apr-p2-08', hotelId: 'h-01', requesterId: 'u-t01-15', type: 'MARKETING_BUDGET', description: 'Local SEO ad campaign.', amount: 50000, status: 'PENDING', approverId: 'u-t01-01', createdAt: '2025-05-11T16:00:00Z', priority: 'LOW' },
    { id: 'apr-p2-09', hotelId: 'h-01', requesterId: 'u-t01-08', type: 'KITCHEN_PURCHASE', description: 'Bulk order of premium sea food.', amount: 25000, status: 'APPROVED', approverId: 'u-t01-02', createdAt: '2025-05-12T07:00:00Z', approvedAt: '2025-05-12T07:20:00Z', priority: 'MEDIUM' },
    { id: 'apr-p2-10', hotelId: 'h-06', requesterId: 'u-t03-02', type: 'MAINTENANCE_EXPENSE', description: 'Lift cable replacement.', amount: 150000, status: 'PENDING', approverId: 'u-t03-01', createdAt: '2025-05-12T09:00:00Z', escalatedTo: 'u-t03-01', priority: 'CRITICAL' }
  ],
  approvalChains: [
    { id: 'chain-01', name: 'Rate Discount Approval', type: 'RATE_DISCOUNT', steps: [{ level: 1, roleId: 'r-02', approverUserId: 'u-t01-02' }, { level: 2, roleId: 'r-01', approverUserId: 'u-t01-01' }], hotelId: 'h-01' },
    { id: 'chain-02', name: 'Maintenance Expense Approval', type: 'MAINTENANCE_EXPENSE', steps: [{ level: 1, roleId: 'r-02', approverUserId: 'u-t01-02' }], hotelId: 'h-01' },
    { id: 'chain-03', name: 'Inventory Override Approval', type: 'INVENTORY_OVERRIDE', steps: [{ level: 1, roleId: 'r-02', approverUserId: 'u-t01-02' }], hotelId: 'h-01' },
    { id: 'chain-04', name: 'OTA Refund Approval', type: 'OTA_REFUND', steps: [{ level: 1, roleId: 'r-11', approverUserId: 'u-t01-14' }, { level: 2, roleId: 'r-01', approverUserId: 'u-t01-01' }], hotelId: 'h-01' },
    { id: 'chain-05', name: 'Marketing Budget Approval', type: 'MARKETING_BUDGET', steps: [{ level: 1, roleId: 'r-01', approverUserId: 'u-t01-01' }], hotelId: 'h-01' }
  ]
};

// ============================================================================
// PHASE-3: PERMISSION SYSTEM (PLACEHOLDER)
// ============================================================================

export const permissionSystemMockData = {
  permissions: [
    { key: 'bookings:view', description: 'Can view all booking records.' },
    { key: 'bookings:create', description: 'Can create new booking records.' },
    { key: 'bookings:edit', description: 'Can modify existing bookings.' },
    { key: 'finance:reconcile', description: 'Can mark payments as reconciled.' },
    { key: 'finance:invoice', description: 'Can generate tax invoices.' },
    { key: 'operations:night_audit', description: 'Can perform daily night audit.' },
    { key: 'operations:housekeeping', description: 'Can update room cleaning status.' },
    { key: 'operations:maintenance', description: 'Can log and resolve repair issues.' },
    { key: 'admin:users', description: 'Can manage staff users and roles.' },
    { key: 'admin:settings', description: 'Can change hotel configuration.' }
  ],
  rolePermissions: [
    { roleId: 'r-01', permissionKeys: ['bookings:view', 'bookings:create', 'bookings:edit', 'finance:reconcile', 'finance:invoice', 'operations:night_audit', 'admin:users', 'admin:settings'] },
    { roleId: 'r-02', permissionKeys: ['bookings:view', 'bookings:create', 'bookings:edit', 'finance:reconcile', 'operations:night_audit', 'operations:housekeeping', 'operations:maintenance'] },
    { roleId: 'r-03', permissionKeys: ['bookings:view', 'bookings:create'] },
    { roleId: 'r-04', permissionKeys: ['operations:housekeeping'] },
    { roleId: 'r-11', permissionKeys: ['operations:night_audit', 'finance:reconcile', 'finance:invoice'] }
  ],
  userPermissionOverrides: [
    { userId: 'u-t01-03', permissionKey: 'finance:invoice', granted: true, reason: 'Temporary invoice generation access' },
    { userId: 'u-t01-04', permissionKey: 'operations:maintenance', granted: true, reason: 'Cross-trained for maintenance' }
  ]
};

// ============================================================================
// PHASE-3: CANCELLATION POLICY (PLACEHOLDER)
// ============================================================================

export const cancellationPolicyMockData = {
  cancellationPolicies: [
    { id: 'cp-01', hotelId: 'h-01', name: '24 Hour Cancellation', hoursBeforeCheckIn: 24, refundPercentage: 100 },
    { id: 'cp-02', hotelId: 'h-01', name: '7 Day Cancellation', hoursBeforeCheckIn: 168, refundPercentage: 100 },
    { id: 'cp-03', hotelId: 'h-01', name: 'Non-Refundable', hoursBeforeCheckIn: 0, refundPercentage: 0 }
  ],
  noShowPolicies: [
    { id: 'ns-01', hotelId: 'h-01', name: '1 Night Charge', chargeNights: 1 },
    { id: 'ns-02', hotelId: 'h-01', name: 'Full Stay Charge', chargeNights: 999 }
  ],
  refundRules: [
    { id: 'rr-01', hotelId: 'h-01', policyId: 'cp-01', daysToProcess: 7, refundMethod: 'ORIGINAL_PAYMENT' },
    { id: 'rr-02', hotelId: 'h-01', policyId: 'cp-02', daysToProcess: 14, refundMethod: 'ORIGINAL_PAYMENT' }
  ],
  refundCalculations: [
    { bookingId: 'b-01', policyId: 'cp-01', originalAmount: 85000, refundAmount: 85000, refundPercentage: 100 },
    { bookingId: 'b-03', policyId: 'cp-02', originalAmount: 28000, refundAmount: 28000, refundPercentage: 100 }
  ]
};

// ============================================================================
// PHASE-3: TAX CONFIGURATION (PLACEHOLDER)
// ============================================================================

export const taxConfigurationMockData = {
  taxRules: [
    { id: 'tax-01', hotelId: 'h-01', name: 'GST 12%', taxType: 'GST', rate: 12, applicableOn: 'ROOM_CHARGE' },
    { id: 'tax-02', hotelId: 'h-01', name: 'GST 18%', taxType: 'GST', rate: 18, applicableOn: 'FOOD_BEVERAGE' },
    { id: 'tax-03', hotelId: 'h-01', name: 'Service Charge 10%', taxType: 'SERVICE_CHARGE', rate: 10, applicableOn: 'TOTAL' }
  ],
  hsnCodes: [
    { code: '996311', description: 'Accommodation services in hotels', gstRate: 12 },
    { code: '996331', description: 'Food and beverage services', gstRate: 18 }
  ],
  gstConfiguration: [
    { hotelId: 'h-01', gstNumber: '27AABCT1234F1Z5', cgstRate: 6, sgstRate: 6, igstRate: 12 },
    { hotelId: 'h-04', gstNumber: '09AABCT5678G2Z1', cgstRate: 6, sgstRate: 6, igstRate: 12 }
  ]
};

// ============================================================================
// PHASE-3: PROMOTIONS & RATE OVERRIDES (PLACEHOLDER)
// ============================================================================

export const promotionsRateOverridesMockData = {
  promoCodes: [
    { id: 'promo-01', hotelId: 'h-01', code: 'WELCOME25', discountType: 'PERCENTAGE', discountValue: 25, validFrom: '2025-01-01', validTo: '2025-12-31', isActive: true },
    { id: 'promo-02', hotelId: 'h-01', code: 'SUMMER500', discountType: 'FIXED', discountValue: 500, validFrom: '2025-06-01', validTo: '2025-08-31', isActive: true }
  ],
  seasonalPricing: [
    { id: 'season-01', hotelId: 'h-01', name: 'Peak Season', startDate: '2025-12-20', endDate: '2026-01-10', priceMultiplier: 1.5 },
    { id: 'season-02', hotelId: 'h-01', name: 'Off Season', startDate: '2025-07-01', endDate: '2025-08-31', priceMultiplier: 0.8 }
  ],
  corporateRates: [
    { id: 'corp-01', hotelId: 'h-01', companyName: 'Google India', discountPercentage: 15, validFrom: '2025-01-01', validTo: '2025-12-31' },
    { id: 'corp-02', hotelId: 'h-01', companyName: 'Microsoft India', discountPercentage: 20, validFrom: '2025-01-01', validTo: '2025-12-31' }
  ],
  blackoutDates: [
    { id: 'black-01', hotelId: 'h-01', date: '2025-12-31', reason: 'New Year Eve - No Discounts' },
    { id: 'black-02', hotelId: 'h-01', date: '2025-12-25', reason: 'Christmas - No Discounts' }
  ]
};

// ============================================================================
// PHASE-3: CHANNEL MANAGER (PLACEHOLDER)
// ============================================================================

export const channelManagerMockData = {
  otaConnections: [
    { id: 'ota-01', hotelId: 'h-01', otaName: 'Booking.com', status: 'CONNECTED', lastSyncAt: '2025-05-12T14:00:00Z' },
    { id: 'ota-02', hotelId: 'h-01', otaName: 'Expedia', status: 'CONNECTED', lastSyncAt: '2025-05-12T14:00:00Z' },
    { id: 'ota-03', hotelId: 'h-01', otaName: 'Airbnb', status: 'CONNECTED', lastSyncAt: '2025-05-12T14:00:00Z' },
    { id: 'ota-04', hotelId: 'h-01', otaName: 'MakeMyTrip', status: 'DISCONNECTED', lastSyncAt: '2025-05-10T10:00:00Z' }
  ],
  syncLogs: [
    { id: 'sync-01', hotelId: 'h-01', otaName: 'Booking.com', syncType: 'INVENTORY', status: 'SUCCESS', syncedAt: '2025-05-12T14:00:00Z' },
    { id: 'sync-02', hotelId: 'h-01', otaName: 'Expedia', syncType: 'RATES', status: 'SUCCESS', syncedAt: '2025-05-12T14:00:00Z' },
    { id: 'sync-03', hotelId: 'h-01', otaName: 'Airbnb', syncType: 'INVENTORY', status: 'FAILED', syncedAt: '2025-05-12T14:00:00Z', error: 'Connection timeout' },
    { id: 'sync-04', hotelId: 'h-01', otaName: 'MakeMyTrip', syncType: 'BOOKINGS', status: 'PENDING', syncedAt: '2025-05-12T14:00:00Z' }
  ],
  conflictResolution: [
    { id: 'conf-01', hotelId: 'h-01', roomTypeId: 'rt-01', date: '2025-06-01', pmsAvailable: 7, otaAvailable: 5, resolvedAvailable: 5, resolvedBy: 'SYSTEM' },
    { id: 'conf-02', hotelId: 'h-01', roomTypeId: 'rt-02', date: '2025-06-01', pmsAvailable: 10, otaAvailable: 12, resolvedAvailable: 10, resolvedBy: 'MANUAL' }
  ],
  roomMapping: [
    { id: 'map-01', hotelId: 'h-01', pmsRoomTypeId: 'rt-01', otaName: 'Booking.com', otaRoomTypeId: 'BKG-RT-001', otaRoomTypeName: 'Grand Suite' },
    { id: 'map-02', hotelId: 'h-01', pmsRoomTypeId: 'rt-02', otaName: 'Booking.com', otaRoomTypeId: 'BKG-RT-002', otaRoomTypeName: 'Luxury King' },
    { id: 'map-03', hotelId: 'h-01', pmsRoomTypeId: 'rt-01', otaName: 'Expedia', otaRoomTypeId: 'EXP-RT-001', otaRoomTypeName: 'Grand Suite' }
  ]
};

// ============================================================================
// PHASE-3: STAFF OPERATIONS (PLACEHOLDER)
// ============================================================================

export const staffOperationsMockData = {
  shifts: [
    { id: 'shift-01', hotelId: 'h-01', userId: 'u-t01-03', shiftDate: '2025-05-12', startTime: '06:00', endTime: '14:00', status: 'COMPLETED' },
    { id: 'shift-02', hotelId: 'h-01', userId: 'u-t01-07', shiftDate: '2025-05-12', startTime: '14:00', endTime: '22:00', status: 'COMPLETED' },
    { id: 'shift-03', hotelId: 'h-01', userId: 'u-t01-11', shiftDate: '2025-05-12', startTime: '22:00', endTime: '06:00', status: 'IN_PROGRESS' }
  ],
  taskAssignments: [
    { id: 'task-01', hotelId: 'h-01', assignedTo: 'u-t01-04', taskType: 'ROOM_CLEANING', roomId: 'r-01', status: 'COMPLETED', completedAt: '2025-05-12T10:00:00Z' },
    { id: 'task-02', hotelId: 'h-01', assignedTo: 'u-t01-04', taskType: 'ROOM_CLEANING', roomId: 'r-03', status: 'PENDING', dueAt: '2025-05-12T16:00:00Z' },
    { id: 'task-03', hotelId: 'h-01', assignedTo: 'u-t01-04', taskType: 'ROOM_INSPECTION', roomId: 'r-05', status: 'IN_PROGRESS', startedAt: '2025-05-12T14:00:00Z' }
  ],
  taskTemplates: [
    { id: 'tmpl-01', name: 'Standard Room Cleaning', taskType: 'ROOM_CLEANING', estimatedMinutes: 25, checklistItems: ['Bed linens changed', 'Towels replaced', 'Mini-bar restocked'] },
    { id: 'tmpl-02', name: 'Deep Cleaning', taskType: 'ROOM_CLEANING', estimatedMinutes: 60, checklistItems: ['Full deep clean', 'Carpet shampooing', 'Window cleaning'] },
    { id: 'tmpl-03', name: 'Room Inspection', taskType: 'ROOM_INSPECTION', estimatedMinutes: 10, checklistItems: ['Check cleanliness', 'Verify amenities', 'Test equipment'] }
  ]
};

// ============================================================================
// PHASE-3: DOCUMENTS & ATTACHMENTS (PLACEHOLDER)
// ============================================================================

export const documentsAttachmentsMockData = {
  guestDocuments: [
    { id: 'doc-01', guestId: 'g-01', documentType: 'AADHAAR', documentNumber: '1234-5678-9012', uploadedAt: '2025-05-10T10:00:00Z', fileUrl: 'https://storage.taj.com/docs/g-01-aadhaar.pdf' },
    { id: 'doc-02', guestId: 'g-05', documentType: 'PASSPORT', documentNumber: 'B992211', uploadedAt: '2025-06-01T15:00:00Z', fileUrl: 'https://storage.taj.com/docs/g-05-passport.pdf' }
  ],
  bookingAttachments: [
    { id: 'att-01', bookingId: 'b-01', attachmentType: 'CONFIRMATION_EMAIL', uploadedAt: '2025-05-10T10:05:00Z', fileUrl: 'https://storage.taj.com/bookings/b-01-confirmation.pdf' },
    { id: 'att-02', bookingId: 'b-08', attachmentType: 'CORPORATE_PO', uploadedAt: '2025-07-05T17:00:00Z', fileUrl: 'https://storage.taj.com/bookings/b-08-po.pdf' }
  ],
  invoiceAttachments: [
    { id: 'inv-att-01', invoiceId: 'inv-01', attachmentType: 'TAX_INVOICE', uploadedAt: '2025-05-14T10:00:00Z', fileUrl: 'https://storage.taj.com/invoices/inv-01.pdf' },
    { id: 'inv-att-02', invoiceId: 'inv-08', attachmentType: 'TAX_INVOICE', uploadedAt: '2025-07-10T10:00:00Z', fileUrl: 'https://storage.taj.com/invoices/inv-08.pdf' }
  ]
};

// ============================================================================
// PHASE-3: SYSTEM CONFIG (PLACEHOLDER)
// ============================================================================

export const systemConfigMockData = {
  globalSettings: {
    defaultCurrency: 'INR',
    defaultTimezone: 'Asia/Kolkata',
    defaultLanguage: 'en',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24H'
  },
  integrations: [
    { id: 'int-01', name: 'Razorpay', type: 'PAYMENT_GATEWAY', status: 'ACTIVE', apiKey: 'rzp_live_***' },
    { id: 'int-02', name: 'Twilio', type: 'SMS_PROVIDER', status: 'ACTIVE', apiKey: 'AC***' },
    { id: 'int-03', name: 'SendGrid', type: 'EMAIL_PROVIDER', status: 'ACTIVE', apiKey: 'SG.***' }
  ]
};

// ============================================================================
// PHASE-3: REPORTS & EXPORT (PLACEHOLDER)
// ============================================================================

export const reportsExportMockData = {
  reportCatalog: [
    { id: 'rpt-01', name: 'Daily Revenue Report', type: 'REVENUE', format: 'PDF', schedule: 'DAILY', description: 'Daily revenue breakdown by room type and source', hotelId: 'h-01' },
    { id: 'rpt-02', name: 'Occupancy Report', type: 'OCCUPANCY', format: 'EXCEL', schedule: 'WEEKLY', description: 'Weekly occupancy trends and forecasts', hotelId: 'h-01' },
    { id: 'rpt-03', name: 'Guest Ledger Report', type: 'FINANCE', format: 'PDF', schedule: 'MONTHLY', description: 'Monthly guest ledger and outstanding balances', hotelId: 'h-01' },
    { id: 'rpt-04', name: 'Night Audit Summary', type: 'OPERATIONS', format: 'PDF', schedule: 'DAILY', description: 'Daily night audit flash report', hotelId: 'h-01' },
    { id: 'rpt-05', name: 'Housekeeping Performance', type: 'OPERATIONS', format: 'EXCEL', schedule: 'WEEKLY', description: 'Housekeeping efficiency and room status', hotelId: 'h-01' }
  ],
  exportTypes: [
    { id: 'exp-type-01', name: 'Bookings Export', dataType: 'BOOKINGS', supportedFormats: ['CSV', 'EXCEL', 'PDF'], description: 'Export all booking records with filters' },
    { id: 'exp-type-02', name: 'Guests Export', dataType: 'GUESTS', supportedFormats: ['CSV', 'EXCEL'], description: 'Export guest profiles and contact information' },
    { id: 'exp-type-03', name: 'Invoices Export', dataType: 'INVOICES', supportedFormats: ['CSV', 'EXCEL', 'PDF'], description: 'Export invoice records with tax breakdown' },
    { id: 'exp-type-04', name: 'Payments Export', dataType: 'PAYMENTS', supportedFormats: ['CSV', 'EXCEL'], description: 'Export payment transactions and settlements' },
    { id: 'exp-type-05', name: 'Audit Logs Export', dataType: 'AUDIT_LOGS', supportedFormats: ['CSV', 'EXCEL'], description: 'Export system audit trail' }
  ],
  reportHistory: [
    { id: 'exp-01', reportId: 'rpt-01', hotelId: 'h-01', generatedAt: '2025-05-12T00:00:00Z', generatedBy: 'u-t01-01', status: 'COMPLETED', fileUrl: 'https://storage.taj.com/reports/daily-revenue-2025-05-12.pdf', fileSize: 245000 },
    { id: 'exp-02', reportId: 'rpt-02', hotelId: 'h-01', generatedAt: '2025-05-11T00:00:00Z', generatedBy: 'u-t01-01', status: 'COMPLETED', fileUrl: 'https://storage.taj.com/reports/occupancy-week-19.xlsx', fileSize: 128000 },
    { id: 'exp-03', reportId: 'rpt-03', hotelId: 'h-01', generatedAt: '2025-05-10T00:00:00Z', generatedBy: 'u-t01-14', status: 'COMPLETED', fileUrl: 'https://storage.taj.com/reports/guest-ledger-may-2025.pdf', fileSize: 512000 },
    { id: 'exp-04', reportId: 'rpt-01', hotelId: 'h-01', generatedAt: '2025-05-11T00:00:00Z', generatedBy: 'u-t01-01', status: 'COMPLETED', fileUrl: 'https://storage.taj.com/reports/daily-revenue-2025-05-11.pdf', fileSize: 238000 },
    { id: 'exp-05', reportId: 'rpt-04', hotelId: 'h-01', generatedAt: '2025-05-12T00:30:00Z', generatedBy: 'u-t01-14', status: 'COMPLETED', fileUrl: 'https://storage.taj.com/reports/night-audit-2025-05-11.pdf', fileSize: 156000 }
  ]
};