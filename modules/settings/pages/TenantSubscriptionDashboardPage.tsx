import React, { useState } from 'react';
import { useAllPlans, useAllTenants, useAllSubscriptions, useAllFeatureFlags, useBillingHistory } from '../tenant-subscription.api';
import { Plan, Tenant, Subscription, FeatureFlag, BillingRecord } from '../tenant-subscription.types';
import { 
  Building2, 
  CreditCard, 
  Package, 
  Flag, 
  DollarSign, 
  Search, 
  CheckCircle, 
  XCircle,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Loader2
} from 'lucide-react';
import { PageTransition } from '../../../app/layout/PageTransition';

export const TenantSubscriptionDashboardPage: React.FC = () => {
  const { data: plans = [], isLoading: plansLoading } = useAllPlans();
  const { data: tenants = [], isLoading: tenantsLoading } = useAllTenants();
  const { data: subscriptions = [], isLoading: subsLoading } = useAllSubscriptions();
  const { data: featureFlags = [], isLoading: flagsLoading } = useAllFeatureFlags();
  const { data: billingHistory = [], isLoading: billingLoading } = useBillingHistory();

  const [activeTab, setActiveTab] = useState<'plans' | 'tenants' | 'subscriptions' | 'features' | 'billing'>('plans');
  const [searchQuery, setSearchQuery] = useState('');

  const isLoading = plansLoading || tenantsLoading || subsLoading || flagsLoading || billingLoading;

  const getPlanForTenant = (tenantId: string): Plan | undefined => {
    const subscription = subscriptions.find(s => s.tenantId === tenantId);
    if (!subscription) return undefined;
    return plans.find(p => p.id === subscription.planId);
  };

  const getSubscriptionForTenant = (tenantId: string): Subscription | undefined => {
    return subscriptions.find(s => s.tenantId === tenantId);
  };

  const getFeatureFlagsForTenant = (tenantId: string): FeatureFlag[] => {
    return featureFlags.filter(ff => ff.tenantId === tenantId);
  };

  const getBillingForTenant = (tenantId: string): BillingRecord[] => {
    return billingHistory.filter(b => b.tenantId === tenantId);
  };

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.contactEmail?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const styles = {
      ACTIVE: 'bg-green-100 text-green-700',
      INACTIVE: 'bg-slate-100 text-slate-700',
      PAID: 'bg-green-100 text-green-700',
      DUE: 'bg-amber-100 text-amber-700',
      PENDING: 'bg-blue-100 text-blue-700',
    };
    return styles[status as keyof typeof styles] || 'bg-slate-100 text-slate-700';
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  if (isLoading) {
    return (
      <PageTransition>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="animate-spin mx-auto text-indigo-600" size={48} />
            <p className="text-slate-500 mt-4">Loading tenant subscription data...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="text-indigo-600" /> Tenant & Subscription Management
            </h1>
            <p className="text-slate-500 text-sm mt-1">Manage hotel groups, subscription plans, and feature entitlements</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'plans', label: 'Subscription Plans', icon: Package, count: plans.length },
              { id: 'tenants', label: 'Tenants', icon: Building2, count: tenants.length },
              { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard, count: subscriptions.length },
              { id: 'features', label: 'Feature Flags', icon: Flag, count: featureFlags.length },
              { id: 'billing', label: 'Billing History', icon: DollarSign, count: billingHistory.length },
            ].map(({ id, label, icon: Icon, count }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon size={18} />
                {label}
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs">{count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        {(activeTab === 'tenants' || activeTab === 'subscriptions') && (
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search tenants by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="text-indigo-600" size={24} />
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                </div>
                <div className="text-3xl font-black text-slate-900 mb-2">
                  {formatCurrency(plan.price)}
                </div>
                <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-6">
                  per {plan.billingCycle.toLowerCase()}
                </div>
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 uppercase font-black tracking-widest">Max Hotels</span>
                    <span className="text-lg font-bold text-slate-900">{plan.maxHotels === 999 ? 'Unlimited' : plan.maxHotels}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 uppercase font-black tracking-widest">Max Users</span>
                    <span className="text-lg font-bold text-slate-900">{plan.maxUsers === 999 ? 'Unlimited' : plan.maxUsers}</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-2">Subscribers</div>
                  <div className="text-2xl font-black text-indigo-600">
                    {subscriptions.filter(s => s.planId === plan.id).length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tenants Tab */}
        {activeTab === 'tenants' && (
          <div className="space-y-4">
            {filteredTenants.map((tenant) => {
              const plan = getPlanForTenant(tenant.id);
              const subscription = getSubscriptionForTenant(tenant.id);
              const tenantFlags = getFeatureFlagsForTenant(tenant.id);
              const tenantBilling = getBillingForTenant(tenant.id);

              return (
                <div key={tenant.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Building2 className="text-indigo-600" size={24} />
                        <h3 className="text-xl font-bold text-slate-900">{tenant.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(tenant.status)}`}>
                          {tenant.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                        {tenant.contactEmail && (
                          <div className="flex items-center gap-2">
                            <Mail className="text-slate-400" size={16} />
                            <span className="text-slate-600">{tenant.contactEmail}</span>
                          </div>
                        )}
                        {tenant.contactPhone && (
                          <div className="flex items-center gap-2">
                            <Phone className="text-slate-400" size={16} />
                            <span className="text-slate-600">{tenant.contactPhone}</span>
                          </div>
                        )}
                        {tenant.billingAddress && (
                          <div className="flex items-start gap-2 md:col-span-2">
                            <MapPin className="text-slate-400 mt-0.5" size={16} />
                            <span className="text-slate-600">{tenant.billingAddress}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="text-slate-400" size={16} />
                          <span className="text-slate-600">
                            Created: {new Date(tenant.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subscription Info */}
                  {subscription && plan && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 mb-3">
                        <CreditCard className="text-green-600" size={18} />
                        <span className="font-semibold text-slate-900">Subscription Details</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Plan</div>
                          <div className="font-bold text-slate-900">{plan.name}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Amount</div>
                          <div className="font-bold text-slate-900">{formatCurrency(subscription.amount)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Period End</div>
                          <div className="font-bold text-slate-900">
                            {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Feature Flags */}
                  {tenantFlags.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Flag className="text-indigo-600" size={18} />
                        <span className="font-semibold text-slate-900">Feature Flags ({tenantFlags.length})</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tenantFlags.slice(0, 5).map((flag) => (
                          <span
                            key={flag.id}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                              flag.defaultValue
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'bg-slate-50 text-slate-600'
                            }`}
                          >
                            {flag.defaultValue ? <CheckCircle size={12} /> : <XCircle size={12} />}
                            {flag.name}
                          </span>
                        ))}
                        {tenantFlags.length > 5 && (
                          <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600">
                            +{tenantFlags.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === 'subscriptions' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-widest">Tenant</th>
                    <th className="px-6 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-widest">Plan</th>
                    <th className="px-6 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-widest">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-widest">Period End</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {subscriptions
                    .filter(sub => {
                      const tenant = tenants.find(t => t.id === sub.tenantId);
                      return !searchQuery || tenant?.name.toLowerCase().includes(searchQuery.toLowerCase());
                    })
                    .map((subscription) => {
                      const tenant = tenants.find(t => t.id === subscription.tenantId);
                      const plan = plans.find(p => p.id === subscription.planId);
                      return (
                        <tr key={subscription.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-slate-900">{tenant?.name || 'N/A'}</div>
                            <div className="text-xs text-slate-500">{tenant?.contactEmail || ''}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-slate-900">{plan?.name || 'N/A'}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-slate-900">{formatCurrency(subscription.amount)}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(subscription.status)}`}>
                              {subscription.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-slate-700">
                              {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Feature Flags Tab */}
        {activeTab === 'features' && (
          <div className="space-y-4">
            {tenants.map((tenant) => {
              const tenantFlags = getFeatureFlagsForTenant(tenant.id);
              if (tenantFlags.length === 0) return null;

              return (
                <div key={tenant.id} className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="text-indigo-600" size={20} />
                    <h3 className="text-lg font-bold text-slate-900">{tenant.name}</h3>
                    <span className="px-2 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                      {tenantFlags.length} flags
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {tenantFlags.map((flag) => (
                      <div
                        key={flag.id}
                        className={`p-4 rounded-lg border ${
                          flag.defaultValue
                            ? 'bg-indigo-50 border-indigo-200'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-slate-900 text-sm">{flag.name}</span>
                          {flag.defaultValue ? (
                            <CheckCircle className="text-green-600" size={18} />
                          ) : (
                            <XCircle className="text-slate-400" size={18} />
                          )}
                        </div>
                        <div className="text-xs text-slate-500 font-mono">{flag.key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Billing History Tab */}
        {activeTab === 'billing' && (
          <div className="space-y-4">
            {tenants.map((tenant) => {
              const tenantBilling = getBillingForTenant(tenant.id);
              if (tenantBilling.length === 0) return null;

              return (
                <div key={tenant.id} className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="text-indigo-600" size={20} />
                    <h3 className="text-lg font-bold text-slate-900">{tenant.name}</h3>
                    <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                      {tenantBilling.length} records
                    </span>
                  </div>
                  <div className="space-y-3">
                    {tenantBilling.map((bill) => (
                      <div
                        key={bill.id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-slate-900">{bill.invoiceNumber}</div>
                          <div className="text-xs text-slate-500 mt-1">
                            Paid: {new Date(bill.paidAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-slate-900">{formatCurrency(bill.amount)}</div>
                          <div className={`text-xs font-bold mt-1 ${getStatusBadge(bill.status)}`}>
                            {bill.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PageTransition>
  );
};
