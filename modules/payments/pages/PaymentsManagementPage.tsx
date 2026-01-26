import { useState, useEffect } from 'react';
import { Search, CreditCard, DollarSign, CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react';

interface Payment {
  id: string;
  hotelId: string;
  bookingId: string;
  amount: number;
  status: string;
  method: string;
  createdAt: string;
  paymentGatewayRef: string;
  settlementStatus: string;
  refunds: Array<{
    amount: number;
    reason: string;
    date: string;
  }>;
  businessDate: string;
}

interface Settlement {
  id: string;
  hotelId: string;
  date: string;
  totalAmount: number;
  status: string;
  settledAt: string | null;
}

export default function PaymentsManagementPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [methodFilter, setMethodFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [activeTab, setActiveTab] = useState<'payments' | 'settlements'>('payments');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [paymentsRes, settlementsRes] = await Promise.all([
        fetch('/api/payments'),
        fetch('/api/settlements'),
      ]);
      setPayments(await paymentsRes.json());
      setSettlements(await settlementsRes.json());
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'FAILED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSettlementStatusColor = (status: string) => {
    switch (status) {
      case 'SETTLED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'CARD': return <CreditCard size={16} className="text-blue-600" />;
      case 'CASH': return <DollarSign size={16} className="text-green-600" />;
      case 'UPI': return <TrendingUp size={16} className="text-purple-600" />;
      case 'BANK_TRANSFER': return <CheckCircle size={16} className="text-indigo-600" />;
      default: return <DollarSign size={16} className="text-gray-600" />;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.paymentGatewayRef.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMethod = methodFilter === 'ALL' || payment.method === methodFilter;
    const matchesStatus = statusFilter === 'ALL' || payment.status === statusFilter;
    return matchesSearch && matchesMethod && matchesStatus;
  });

  const paymentStats = {
    total: payments.length,
    totalAmount: payments.filter(p => p.status === 'SUCCESS').reduce((sum, p) => sum + p.amount, 0),
    success: payments.filter(p => p.status === 'SUCCESS').length,
    pending: payments.filter(p => p.status === 'PENDING').length,
    failed: payments.filter(p => p.status === 'FAILED').length,
  };

  const settlementStats = {
    total: settlements.length,
    totalSettled: settlements.filter(s => s.status === 'SETTLED').reduce((sum, s) => sum + s.totalAmount, 0),
    totalPending: settlements.filter(s => s.status === 'PENDING').reduce((sum, s) => sum + s.totalAmount, 0),
    settled: settlements.filter(s => s.status === 'SETTLED').length,
    pending: settlements.filter(s => s.status === 'PENDING').length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments & Settlements</h1>
          <p className="text-gray-600 mt-1">Track payments and settlement records</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'payments' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Payments
          </button>
          <button
            onClick={() => setActiveTab('settlements')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'settlements' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Settlements
          </button>
        </div>
      </div>

      {activeTab === 'payments' && (
        <>
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900">{paymentStats.total}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
              <p className="text-sm text-blue-700">Total Amount</p>
              <p className="text-2xl font-bold text-blue-900">₹{paymentStats.totalAmount.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
              <p className="text-sm text-green-700">Success</p>
              <p className="text-2xl font-bold text-green-900">{paymentStats.success}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-200">
              <p className="text-sm text-yellow-700">Pending</p>
              <p className="text-2xl font-bold text-yellow-900">{paymentStats.pending}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg shadow-sm border border-red-200">
              <p className="text-sm text-red-700">Failed</p>
              <p className="text-2xl font-bold text-red-900">{paymentStats.failed}</p>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by booking ID or reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Methods</option>
              <option value="CARD">Card</option>
              <option value="CASH">Cash</option>
              <option value="UPI">UPI</option>
              <option value="BANK_TRANSFER">Bank Transfer</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Status</option>
              <option value="SUCCESS">Success</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Settlement
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono text-gray-900">{payment.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{payment.bookingId}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{new Date(payment.createdAt).toLocaleDateString()}</span>
                        <p className="text-xs text-gray-500">{new Date(payment.createdAt).toLocaleTimeString()}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getMethodIcon(payment.method)}
                          <span className="text-sm text-gray-900">{payment.method}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">₹{payment.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-xs font-medium ${
                          payment.settlementStatus === 'SETTLED' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {payment.settlementStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {activeTab === 'settlements' && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600">Total Settlements</p>
              <p className="text-2xl font-bold text-gray-900">{settlementStats.total}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
              <p className="text-sm text-green-700">Settled Amount</p>
              <p className="text-2xl font-bold text-green-900">₹{settlementStats.totalSettled.toLocaleString()}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-200">
              <p className="text-sm text-yellow-700">Pending Amount</p>
              <p className="text-2xl font-bold text-yellow-900">₹{settlementStats.totalPending.toLocaleString()}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
              <p className="text-sm text-blue-700">Pending Count</p>
              <p className="text-2xl font-bold text-blue-900">{settlementStats.pending}</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : (
            <div className="grid gap-4">
              {settlements.map((settlement) => (
                <div key={settlement.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <CheckCircle className="text-blue-600" size={24} />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Settlement {settlement.id}</h3>
                          <p className="text-sm text-gray-600">Business Date: {settlement.date}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Total Amount</p>
                          <p className="font-semibold text-gray-900 text-lg">₹{settlement.totalAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Status</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getSettlementStatusColor(settlement.status)}`}>
                            {settlement.status}
                          </span>
                        </div>
                        <div>
                          <p className="text-gray-600">Settled At</p>
                          <p className="font-medium text-gray-900">
                            {settlement.settledAt ? new Date(settlement.settledAt).toLocaleDateString() : 'Pending'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
