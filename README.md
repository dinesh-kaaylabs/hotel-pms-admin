# 🏨 LuxeStay PMS Admin – Frontend

**Enterprise-grade, multi-tenant Hotel Property Management System (Admin UI)**  
*Built for modern hospitality, scalable to international hotel chains, OTA-ready, and GST-compliant.*

---

## 📖 Project Overview
This repository contains the frontend implementation of the LuxeStay PMS Admin Dashboard. It serves as the primary operational hub for Super Admins (Platform Owners), Hotel Admins (Property Managers), and Operational Staff (Front Desk/Housekeeping).

The system is designed to provide a unified interface for property management, financial reconciliation, and guest relationship management while maintaining strict data isolation across multi-hotel chains.

### ⚠️ Core Engineering Constraint
**The Frontend is strictly a presentation layer.**  
Business logic, price calculations, tax computations, inventory availability, and financial settlements are handled **exclusively by the backend**. The frontend must never assume business rules or perform arithmetic on financial data that is not provided by an API response.

---

## 🛠 Tech Stack
- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Customized for Hospitality)
- **State Management / Server Cache:** [TanStack React Query v5](https://tanstack.com/query/latest)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Global Context:** React Context API (Auth, Theme, Multi-Hotel)

---

## 🏗 Folder Structure
The project follows a modular architecture designed for high scalability and team autonomy.

```text
src/
├── app/                # Global layout, routing, and providers
├── auth/               # RBAC logic, login, MFA, and permission maps
├── api/                # Axios client setup and global interceptors
├── modules/            # Business modules (Self-contained)
│   ├── bookings/       # Reservation management
│   ├── rooms/          # Inventory & Room types
│   ├── pricing/        # Rate plans & Dynamic pricing
│   ├── finance/        # Invoices, GST, Settlements
│   ├── housekeeping/   # Staff assignment & Room status
│   └── ...             # CRM, Reports, AI, Training
├── components/         # Reusable UI primitives (StatCards, Badge, etc.)
├── hooks/              # Global custom hooks
├── stores/             # Light global state (e.g., Hotel Context)
├── utils/              # Formatters, configs, and helpers
└── types/              # Global TypeScript interfaces
```

---

## 📦 Implemented Modules

### Core Operations
- **Dashboard:** Real-time occupancy, revenue KPIs, and arrivals feed.
- **Bookings:** Unified view of Direct, OTA, and Walk-in reservations with Drawer-based CRUD.
- **Room Management:** Floor-wise inventory control and Room Category configuration.
- **Pricing:** Multi-rate plan management and Daily Pricing Grid.
- **Housekeeping:** Live floor board for room readiness and staff logging.
- **Maintenance:** "Out of Order" (OOO) blocking and repair tracking.

### Finance (India-Ready)
- **Payments:** Read-only transaction audit trail from gateways (Razorpay/Stripe).
- **Invoices & GST:** Automatic tax invoice generation with HSN/GSTIN compliance.
- **Settlements:** Reconciliation of channel payouts vs bank credits.

### Growth & Control
- **Guest CRM:** Lifetime value (LTV) tracking, VIP tagging, and internal notes.
- **Reports:** Deep-dive BI on ADR, RevPAR, and occupancy trends.
- **AI Concierge:** Sentiment analysis of reviews and automated guest responses.

---

## 🔐 RBAC & Access Control
Access is enforced via a centralized permission map in `src/auth/permissions.ts`.

- **SUPER_ADMIN:** Platform owner. Access to multi-hotel management and platform-wide settings.
- **HOTEL_ADMIN:** Full access to property-specific operations, finance, and staff management.
- **STAFF:** Operational access limited to Dashboard, Bookings, and Housekeeping.

---

## 🏢 Multi-Hotel (Chain) Support
Built to support hotel groups from day one.
- **Context Switcher:** Persistent property switcher in the top navigation.
- **Isolation:** Every API request is automatically injected with the `X-Hotel-Id` header.
- **White-Labeling:** Theme colors, logos, and fonts update instantly based on the active hotel context.

---

## 🚀 Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

### Environment Variables
Create a `.env` file in the root:
- `VITE_API_BASE_URL`: Path to backend API (default: `/api/v1`)
- `VITE_APP_ENV`: Deployment environment (`development` | `production`)

---

## 📝 API Expectations
- **Format:** JSON only.
- **Dates:** ISO 8601 (YYYY-MM-DD) for consistency across timezones.
- **Currency:** Provided explicitly by backend (e.g., "INR", "USD").
- **Errors:** Standardized error objects:
  ```json
  {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "You do not have access to the Settlements module."
  }
  ```

---

## ✅ Production Checklist
- [ ] RBAC routes and component-level visibility verified.
- [ ] Skeleton loaders active for all async data fetching.
- [ ] No hardcoded mock data in production builds.
- [ ] Multi-hotel switch clears relevant React Query cache.
- [ ] GST invoice previews match statutory requirements.
- [ ] Dark mode/Light mode contrast ratios verified.
- [ ] SPA fallback configured for deployment.

---

## 🏁 Final Note
> *"This is not just an admin panel — it’s an operating system for the modern hotel."*

For technical handover or support, please contact the **LuxeStay Engineering Team**.
