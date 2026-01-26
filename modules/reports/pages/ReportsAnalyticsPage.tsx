import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Users, Percent, BarChart3, Download } from 'lucide-react';

interface ReportSummary {
  totalRevenue: number;
  totalBookings: number;
  averageOccupancy: number;
  revPAR: number;
  adr: number;
}

interface RevenueTrend {
  date: string;
  revenue: number;
  bookings: number;
}

interface OccupancyTrend {
  date: string;
  occupancy: number;
}

export default function ReportsAnalyticsPage() {
  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [revenueTrend, setRevenueTrend] = useState<RevenueTrend[]>([]);
  const [occupancyTrend, setOccupancyTrend] = useState<OccupancyTrend[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState('30');

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [summaryRes, revenueRes, occupancyRes] = await Promise.all([
        fetch(`/api/reports/summary?days=${dateRange}`),
        fetch(`/api/reports/revenue-trend?days=${dateRange}`),
        fetch(`/api/reports/occupancy-trend?days=${dateRange}`),
      ]);
      setSummary(await summaryRes.json());
      setRevenueTrend(await revenueRes.json());
      setOccupancyTrend(await occupancyRes.json());
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportReport = async (reportType: string) => {
    try {
      const response = await fetch(`/api/reports/export/${reportType}?days=${dateRange}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType}-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export report:', error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">View performance metrics and insights</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
          <option value="365">Last Year</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading reports...</p>
        </div>
      ) : (
        <>
          {summary && (
            <div className="grid grid-cols-5 gap-4 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="text-blue-600" size={24} />
                  <p className="text-sm text-gray-600">Total Revenue</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">₹{summary.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="text-green-600" size={24} />
                  <p className="text-sm text-gray-600">Total Bookings</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">{summary.totalBookings}</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Percent className="text-purple-600" size={24} />
                  <p className="text-sm text-gray-600">Avg Occupancy</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">{summary.averageOccupancy}%</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="text-orange-600" size={24} />
                  <p className="text-sm text-gray-600">RevPAR</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">₹{summary.revPAR.toLocaleString()}</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="text-indigo-600" size={24} />
                  <p className="text-sm text-gray-600">ADR</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">₹{summary.adr.toLocaleString()}</p>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Revenue Trend</h2>
                <button
                  onClick={() => handleExportReport('revenue')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Download size={16} />
                  Export
                </button>
              </div>
              <div className="space-y-2">
                {revenueTrend.slice(0, 10).map((trend, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{new Date(trend.date).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-600">{trend.bookings} bookings</p>
                    </div>
                    <p className="text-lg font-bold text-blue-600">₹{trend.revenue.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Occupancy Trend</h2>
                <button
                  onClick={() => handleExportReport('occupancy')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Download size={16} />
                  Export
                </button>
              </div>
              <div className="space-y-2">
                {occupancyTrend.slice(0, 10).map((trend, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-gray-900">{new Date(trend.date).toLocaleDateString()}</p>
                      <p className="text-sm font-bold text-gray-900">{trend.occupancy}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          trend.occupancy >= 80 ? 'bg-green-600' :
                          trend.occupancy >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${trend.occupancy}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Export Reports</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => handleExportReport('revenue')}
                className="flex items-center justify-center gap-3 p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Download className="text-blue-600" size={20} />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Revenue Report</p>
                  <p className="text-xs text-gray-600">Detailed revenue breakdown</p>
                </div>
              </button>
              <button
                onClick={() => handleExportReport('occupancy')}
                className="flex items-center justify-center gap-3 p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition-colors"
              >
                <Download className="text-green-600" size={20} />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Occupancy Report</p>
                  <p className="text-xs text-gray-600">Room occupancy analysis</p>
                </div>
              </button>
              <button
                onClick={() => handleExportReport('financial')}
                className="flex items-center justify-center gap-3 p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <Download className="text-purple-600" size={20} />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Financial Report</p>
                  <p className="text-xs text-gray-600">Complete financial summary</p>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
