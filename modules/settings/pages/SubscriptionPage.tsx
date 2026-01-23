import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CreditCard, Package, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { getSubscriptionInfo, getBillingHistory } from '../tenant-subscription.api';

export const SubscriptionPage: React.FC = () => {
  const { data: subscription, isLoading: subLoading } = useQuery({
    queryKey: ['subscription'],
    queryFn: getSubscriptionInfo,
  });

  const { data: billingHistory, isLoading: billLoading } = useQuery({
    queryKey: ['billingHistory'],
    queryFn: getBillingHistory,
  });

  if (subLoading || billLoading) {
    return <div className="text-sm text-slate-500">Loading subscription details...</div>;
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      ACTIVE: 'bg-green-100 text-green-700',
      TRIAL: 'bg-blue-100 text-blue-700',
      EXPIRED: 'bg-red-100 text-red-700',
      CANCELLED: 'bg-slate-100 text-slate-700',
    };
    return styles[status as keyof typeof styles] || styles.ACTIVE;
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Subscription & Billing</h2>
        <p className="text-xs text-slate-500 mt-1 uppercase font-black tracking-widest">Manage Your Plan</p>
      </div>

      {subscription && (
        <>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Package className="text-indigo-600" size={24} />
                  <h3 className="text-xl font-bold text-slate-900">{subscription.plan?.name} Plan</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(subscription.status)}`}>
                    {subscription.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500">
                  Billing Cycle: <span className="font-semibold text-slate-700">{subscription.billingCycle}</span>
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-slate-900">
                  ₹{(subscription.amount / 100).toLocaleString()}
                </div>
                <div className="text-xs text-slate-500 uppercase font-black tracking-widest">
                  per {subscription.billingCycle === 'YEARLY' ? 'year' : 'month'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div>
                <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Max Hotels</div>
                <div className="text-lg font-bold text-slate-900">{subscription.plan?.maxHotels}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Max Rooms</div>
                <div className="text-lg font-bold text-slate-900">{subscription.plan?.maxRooms}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Max Users</div>
                <div className="text-lg font-bold text-slate-900">{subscription.plan?.maxUsers}</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-2">Included Features</div>
              <div className="flex flex-wrap gap-2">
                {subscription.plan?.features.map((feature: string) => (
                  <span key={feature} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold">
                    {feature.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Current Period</div>
                <div className="text-sm font-semibold text-slate-700">
                  {new Date(subscription.currentPeriodStart).toLocaleDateString()} - {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Next Billing</div>
                <div className="text-sm font-semibold text-slate-700">
                  {new Date(subscription.nextBillingDate).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Auto Renew</div>
                <div className="text-sm font-semibold text-slate-700">
                  {subscription.autoRenew ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle size={16} /> Enabled
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-600">
                      <AlertCircle size={16} /> Disabled
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {billingHistory && billingHistory.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CreditCard size={20} /> Billing History
              </h3>
              <div className="space-y-3">
                {billingHistory.map((bill: any) => (
                  <div key={bill.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-slate-900">{bill.invoiceNumber}</div>
                      <div className="text-xs text-slate-500 mt-1">{bill.description}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        Billed: {new Date(bill.billingDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">₹{(bill.amount / 100).toLocaleString()}</div>
                      <div className={`text-xs font-bold mt-1 ${bill.status === 'PAID' ? 'text-green-600' : 'text-amber-600'}`}>
                        {bill.status}
                      </div>
                      {bill.paidDate && (
                        <div className="text-xs text-slate-500 mt-1">
                          Paid: {new Date(bill.paidDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
