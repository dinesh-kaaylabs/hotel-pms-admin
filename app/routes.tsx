
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { Loader2 } from 'lucide-react';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { RequireRole } from '../auth/RequireRole';
import { LoginPage } from '../auth/LoginPage';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';

// Lazy Loaded Modules
const DashboardPage = lazy(() => import('../modules/dashboard/DashboardPage').then(m => ({ default: m.DashboardPage })));
const BookingsPage = lazy(() => import('../modules/bookings/BookingsPage').then(m => ({ default: m.BookingsPage })));
const CheckInPage = lazy(() => import('../modules/bookings/pages/CheckInPage').then(m => ({ default: m.CheckInPage })));
const CheckOutPage = lazy(() => import('../modules/bookings/pages/CheckOutPage').then(m => ({ default: m.CheckOutPage })));
const RoomTypesPage = lazy(() => import('../modules/rooms/pages/RoomTypesPage').then(m => ({ default: m.RoomTypesPage })));
const RoomsInventoryPage = lazy(() => import('../modules/rooms/pages/RoomsInventoryPage').then(m => ({ default: m.RoomsInventoryPage })));
const HousekeepingDashboardPage = lazy(() => import('../modules/housekeeping/pages/HousekeepingDashboardPage').then(m => ({ default: m.HousekeepingDashboardPage })));
const MaintenanceDashboardPage = lazy(() => import('../modules/maintenance/pages/MaintenanceDashboardPage').then(m => ({ default: m.MaintenanceDashboardPage })));
const InvoicesPage = lazy(() => import('../modules/invoices/pages/InvoicesPage').then(m => ({ default: m.InvoicesPage })));
const SettlementsPage = lazy(() => import('../modules/settlements/pages/SettlementsPage').then(m => ({ default: m.SettlementsPage })));
const GuestsPage = lazy(() => import('../modules/guests/pages/GuestsPage').then(m => ({ default: m.GuestsPage })));
const GuestProfilePage = lazy(() => import('../modules/guests/pages/GuestProfilePage').then(m => ({ default: m.GuestProfilePage })));
const RatePlansPage = lazy(() => import('../modules/pricing/pages/RatePlansPage').then(m => ({ default: m.RatePlansPage })));
const PricingCalendarPage = lazy(() => import('../modules/pricing/pages/PricingCalendarPage').then(m => ({ default: m.PricingCalendarPage })));
const PaymentsPage = lazy(() => import('../modules/payments/pages/PaymentsPage').then(m => ({ default: m.PaymentsPage })));
const ReportsDashboardPage = lazy(() => import('../modules/reports/pages/ReportsDashboardPage').then(m => ({ default: m.ReportsDashboardPage })));
const SettingsPage = lazy(() => import('../modules/settings/pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const HotelSettingsPage = lazy(() => import('../modules/settings/pages/HotelSettingsPage').then(m => ({ default: m.HotelSettingsPage })));
const UsersPage = lazy(() => import('../modules/settings/pages/UsersPage').then(m => ({ default: m.UsersPage })));
const SubscriptionPage = lazy(() => import('../modules/settings/pages/SubscriptionPage').then(m => ({ default: m.SubscriptionPage })));
const TenantSubscriptionDashboardPage = lazy(() => import('../modules/settings/pages/TenantSubscriptionDashboardPage').then(m => ({ default: m.TenantSubscriptionDashboardPage })));
const TaxConfigurationPage = lazy(() => import('../modules/settings/pages/TaxConfigurationPage').then(m => ({ default: m.TaxConfigurationPage })));
const ChannelManagerPage = lazy(() => import('../modules/settings/pages/ChannelManagerPage').then(m => ({ default: m.ChannelManagerPage })));
const PromotionsPage = lazy(() => import('../modules/pricing/pages/PromotionsPage').then(m => ({ default: m.PromotionsPage })));
const ReportsExportPage = lazy(() => import('../modules/reports/pages/ReportsExportPage').then(m => ({ default: m.ReportsExportPage })));
const AIInsightsPage = lazy(() => import('../modules/ai/AIInsightsPage').then(m => ({ default: m.AIInsightsPage })));

// Phase-2 Wave-1 Modules
const CommunicationSettingsPage = lazy(() => import('../modules/phase2/communication/pages/CommunicationSettingsPage').then(m => ({ default: m.CommunicationSettingsPage })));
const CommunicationLogsPage = lazy(() => import('../modules/phase2/communication/pages/CommunicationLogsPage').then(m => ({ default: m.CommunicationLogsPage })));
const TemplateManagementPage = lazy(() => import('../modules/phase2/communication/pages/TemplateManagementPage').then(m => ({ default: m.TemplateManagementPage })));
const TriggerConfigurationPage = lazy(() => import('../modules/phase2/communication/pages/TriggerConfigurationPage').then(m => ({ default: m.TriggerConfigurationPage })));
const AuditLogsPage = lazy(() => import('../modules/phase2/audit/pages/AuditLogsPage').then(m => ({ default: m.AuditLogsPage })));
const ApprovalDashboardPage = lazy(() => import('../modules/phase2/approval/pages/ApprovalDashboardPage').then(m => ({ default: m.ApprovalDashboardPage })));

// Training Module
const TrainingHomePage = lazy(() => import('../modules/training/pages/TrainingHomePage').then(m => ({ default: m.TrainingHomePage })));
const StaffSopPage = lazy(() => import('../modules/training/pages/StaffSopPage').then(m => ({ default: m.StaffSopPage })));
const AdminSopPage = lazy(() => import('../modules/training/pages/AdminSopPage').then(m => ({ default: m.AdminSopPage })));
const FinanceSopPage = lazy(() => import('../modules/training/pages/FinanceSopPage').then(m => ({ default: m.FinanceSopPage })));

const PageLoader = () => (
  <div className="h-full w-full flex items-center justify-center min-h-[400px]">
    <Loader2 className="animate-spin text-indigo-600" size={32} />
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="/" element={
            <RequireRole permission="dashboard:view">
              <DashboardPage />
            </RequireRole>
          } />
          
          <Route path="/bookings" element={
            <RequireRole permission="bookings:view">
              <BookingsPage />
            </RequireRole>
          } />
          
          <Route path="/checkin/:bookingId" element={
            <RequireRole permission="bookings:update">
              <CheckInPage />
            </RequireRole>
          } />
          
          <Route path="/checkout/:bookingId" element={
            <RequireRole permission="bookings:update">
              <CheckOutPage />
            </RequireRole>
          } />
          
          <Route path="/rooms">
            <Route path="types" element={
              <RequireRole permission="rooms:edit">
                <RoomTypesPage />
              </RequireRole>
            } />
            <Route path="inventory" element={
              <RequireRole permission="rooms:view">
                <RoomsInventoryPage />
              </RequireRole>
            } />
          </Route>

          <Route path="/housekeeping" element={
            <RequireRole permission="rooms:view">
              <HousekeepingDashboardPage />
            </RequireRole>
          } />

          <Route path="/maintenance" element={
            <RequireRole permission="rooms:view">
              <MaintenanceDashboardPage />
            </RequireRole>
          } />

          <Route path="/invoices" element={
            <RequireRole permission="payments:view">
              <InvoicesPage />
            </RequireRole>
          } />

          <Route path="/settlements" element={
            <RequireRole permission="payments:view">
              <SettlementsPage />
            </RequireRole>
          } />

          <Route path="/guests">
            <Route index element={
              <RequireRole permission="bookings:view">
                <GuestsPage />
              </RequireRole>
            } />
            <Route path=":id" element={
              <RequireRole permission="bookings:view">
                <GuestProfilePage />
              </RequireRole>
            } />
          </Route>

          <Route path="/pricing">
            <Route path="rate-plans" element={
              <RequireRole permission="pricing:edit">
                <RatePlansPage />
              </RequireRole>
            } />
            <Route path="calendar" element={
              <RequireRole permission="pricing:view">
                <PricingCalendarPage />
              </RequireRole>
            } />
            <Route path="promotions" element={
              <RequireRole permission="pricing:edit">
                <PromotionsPage />
              </RequireRole>
            } />
          </Route>

          <Route path="/payments" element={
            <RequireRole permission="payments:view">
              <PaymentsPage />
            </RequireRole>
          } />

          <Route path="/reports">
            <Route index element={
              <RequireRole permission="reports:view">
                <ReportsDashboardPage />
              </RequireRole>
            } />
            <Route path="export" element={
              <RequireRole permission="reports:view">
                <ReportsExportPage />
              </RequireRole>
            } />
          </Route>

          <Route path="/training">
            <Route index element={<TrainingHomePage />} />
            <Route path="staff" element={<StaffSopPage />} />
            <Route path="admin" element={
              <RequireRole permission="rooms:edit">
                <AdminSopPage />
              </RequireRole>
            } />
            <Route path="finance" element={
              <RequireRole permission="payments:view">
                <FinanceSopPage />
              </RequireRole>
            } />
          </Route>

          <Route path="/settings" element={
            <RequireRole permission="settings:view">
              <SettingsPage />
            </RequireRole>
          }>
            <Route index element={<Navigate to="/settings/hotel" replace />} />
            <Route path="hotel" element={<HotelSettingsPage />} />
            <Route path="users" element={
              <RequireRole permission="users:manage">
                <UsersPage />
              </RequireRole>
            } />
            <Route path="subscription" element={<SubscriptionPage />} />
            <Route path="tenant-subscription" element={
              <RequireRole permission="settings:view">
                <TenantSubscriptionDashboardPage />
              </RequireRole>
            } />
            <Route path="tax" element={<TaxConfigurationPage />} />
            <Route path="channel-manager" element={<ChannelManagerPage />} />
            
            {/* Phase-2 Wave-1 Routes */}
            <Route path="phase2">
              <Route path="communication" element={<CommunicationSettingsPage />} />
              <Route path="communication/logs" element={<CommunicationLogsPage />} />
              <Route path="communication/templates" element={<TemplateManagementPage />} />
              <Route path="communication/triggers" element={<TriggerConfigurationPage />} />
              <Route path="audit" element={<AuditLogsPage />} />
              <Route path="approval" element={<ApprovalDashboardPage />} />
            </Route>
          </Route>

          <Route path="/ai-insights" element={<AIInsightsPage />} />
        </Route>

        <Route path="/unauthorized" element={
          <div className="h-screen flex items-center justify-center bg-slate-50 flex-col gap-4">
            <h1 className="text-4xl font-bold text-slate-900">403</h1>
            <p className="text-slate-500 text-lg">Unauthorized Access.</p>
            <a href="/#/" className="text-indigo-600 font-semibold underline">Back to Dashboard</a>
          </div>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};
