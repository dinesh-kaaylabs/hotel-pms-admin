import { useState, useEffect } from 'react';
import { Search, FileText, Download, Eye, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  bookingId: string;
  hotelId: string;
  guestName: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  issuedAt: string;
  taxBreakdown: {
    cgst: number;
    sgst: number;
    igst: number;
  };
}

export default function InvoicesManagementPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/invoices');
      setInvoices(await response.json());
    } catch (error) {
      // Error handled silently - user will see empty state
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (invoiceId: string) => {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/download`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      // Error handled silently
    }
  };

  const openDetailsModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowDetailsModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ISSUED': return 'bg-green-100 text-green-800';
      case 'DRAFT': return 'bg-gray-100 text-gray-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'text-green-600';
      case 'PARTIALLY_PAID': return 'text-yellow-600';
      case 'DUE': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'PAID': return <CheckCircle size={16} className="text-green-600" />;
      case 'PARTIALLY_PAID': return <Clock size={16} className="text-yellow-600" />;
      case 'DUE': return <XCircle size={16} className="text-red-600" />;
      default: return null;
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.guestName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || invoice.status === statusFilter;
    const matchesPayment = paymentFilter === 'ALL' || invoice.paymentStatus === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const invoiceStats = {
    total: invoices.length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.totalAmount, 0),
    paid: invoices.filter(i => i.paymentStatus === 'PAID').length,
    due: invoices.filter(i => i.paymentStatus === 'DUE').length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices & Finance</h1>
          <p className="text-gray-600 mt-1">Manage invoices and financial records</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Invoices</p>
          <p className="text-2xl font-bold text-gray-900">{invoiceStats.total}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
          <p className="text-sm text-blue-700">Total Amount</p>
          <p className="text-2xl font-bold text-blue-900">₹{invoiceStats.totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
          <p className="text-sm text-green-700">Paid</p>
          <p className="text-2xl font-bold text-green-900">{invoiceStats.paid}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow-sm border border-red-200">
          <p className="text-sm text-red-700">Due</p>
          <p className="text-2xl font-bold text-red-900">{invoiceStats.due}</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by invoice number or guest name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Status</option>
          <option value="ISSUED">Issued</option>
          <option value="DRAFT">Draft</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Payments</option>
          <option value="PAID">Paid</option>
          <option value="PARTIALLY_PAID">Partially Paid</option>
          <option value="DUE">Due</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading invoices...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issued Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <FileText className="text-blue-600" size={18} />
                      <span className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{invoice.guestName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{new Date(invoice.issuedAt).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} className="text-gray-400" />
                      <span className="text-sm font-semibold text-gray-900">₹{invoice.totalAmount.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getPaymentStatusIcon(invoice.paymentStatus)}
                      <span className={`text-sm font-medium ${getPaymentStatusColor(invoice.paymentStatus)}`}>
                        {invoice.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openDetailsModal(invoice)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDownload(invoice.id)}
                        className="text-green-600 hover:text-green-900 p-1"
                        title="Download"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showDetailsModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Invoice Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Invoice Number</p>
                  <p className="font-semibold text-gray-900">{selectedInvoice.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600">Booking ID</p>
                  <p className="font-semibold text-gray-900">{selectedInvoice.bookingId}</p>
                </div>
                <div>
                  <p className="text-gray-600">Guest Name</p>
                  <p className="font-semibold text-gray-900">{selectedInvoice.guestName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Issued Date</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedInvoice.issuedAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedInvoice.status)}`}>
                    {selectedInvoice.status}
                  </span>
                </div>
                <div>
                  <p className="text-gray-600">Payment Status</p>
                  <p className={`font-semibold ${getPaymentStatusColor(selectedInvoice.paymentStatus)}`}>
                    {selectedInvoice.paymentStatus}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Tax Breakdown</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">CGST</p>
                    <p className="font-semibold text-gray-900">₹{selectedInvoice.taxBreakdown.cgst.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">SGST</p>
                    <p className="font-semibold text-gray-900">₹{selectedInvoice.taxBreakdown.sgst.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">IGST</p>
                    <p className="font-semibold text-gray-900">₹{selectedInvoice.taxBreakdown.igst.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-600">₹{selectedInvoice.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleDownload(selectedInvoice.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Download Invoice
              </button>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedInvoice(null);
                }}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
