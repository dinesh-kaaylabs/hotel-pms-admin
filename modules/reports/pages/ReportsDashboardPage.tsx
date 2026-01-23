
import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, CreditCard, Percent, Download } from 'lucide-react';
import { 
  useReportSummary, 
  useRevenueTrend, 
  useOccupancyTrend, 
  useTopRoomTypes 
} from '../reports.api';
import { ReportKpiCard } from '../components/ReportKpiCard';
import { RevenueChart } from '../components/RevenueChart';
import { OccupancyChart } from '../components/OccupancyChart';
import { TopRoomTypesTable } from '../components/TopRoomTypesTable';
import { ReportFilters } from '../components/ReportFilters';
import { ReportParams } from '../reports.types';
import { useCurrency } from '../../../providers/CurrencyProvider';
import { PageTransition } from '../../../app/layout/PageTransition';
import { KpiSkeleton } from '../../../components/ui/KpiSkeleton';
import { AnimatedNumber } from '../../../components/ui/AnimatedNumber';

export const ReportsDashboardPage: React.FC = () => {
  const { format } = useCurrency();
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const today = new Date();

  const [params, setParams] = useState<ReportParams>({
    startDate: lastMonth.toISOString().split('T')[0],
    endDate: today.toISOString().split('T')[0]
  });

  const { data: summary, isLoading: isSummaryLoading } = useReportSummary(params);
  const { data: revenue, isLoading: isRevenueLoading } = useRevenueTrend(params);
  const { data: occupancy, isLoading: isOccupancyLoading } = useOccupancyTrend(params);
  const { data: topRooms, isLoading: isTopRoomsLoading } = useTopRoomTypes(params);

  return (
    <PageTransition>
      <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="text-indigo-600" /> Reports & Analytics
            </h1>
            <p className="text-slate-500 text-sm mt-1">Property BI: Performance metrics and revenue trends</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all shadow-lg">
            <Download size={18} /> Export Full Report
          </button>
        </div>

        <ReportFilters params={params} onParamsChange={setParams} />

        {isSummaryLoading ? (
          <KpiSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ReportKpiCard 
              label="Total Revenue" 
              value={<AnimatedNumber value={summary ? format(summary.totalRevenue) : '...'} />} 
              icon={CreditCard} 
              colorClass="bg-indigo-50 text-indigo-600"
            />
            <ReportKpiCard 
              label="Total Bookings" 
              value={<AnimatedNumber value={summary ? summary.totalBookings : '...'} />} 
              icon={Users} 
              colorClass="bg-sky-50 text-sky-600"
            />
            <ReportKpiCard 
              label="Occupancy Rate" 
              value={<AnimatedNumber value={summary ? `${summary.occupancyRate}%` : '...'} />} 
              icon={Percent} 
              colorClass="bg-emerald-50 text-emerald-600"
            />
            <ReportKpiCard 
              label="ADR" 
              value={<AnimatedNumber value={summary ? `$${summary.adr.toFixed(2)}` : '...'} />} 
              icon={TrendingUp} 
              colorClass="bg-amber-50 text-amber-600"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Revenue Trend</h3>
            <RevenueChart data={revenue || []} isLoading={isRevenueLoading} />
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Occupancy Trend</h3>
            <OccupancyChart data={occupancy || []} isLoading={isOccupancyLoading} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Performance by Room Category</h3>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">Top 5 Segments</span>
            </div>
            <TopRoomTypesTable data={topRooms || []} isLoading={isTopRoomsLoading} />
          </div>
          
          <div className="bg-indigo-900 text-white rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative shadow-2xl">
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            <div>
              <h3 className="text-xl font-black mb-2 flex items-center gap-2">
                <TrendingUp size={24} className="text-indigo-400" /> Market Insight
              </h3>
              <p className="text-indigo-200 text-sm leading-relaxed">
                Based on your ADR trend, your property is currently performing 12% above local market average.
              </p>
            </div>
            <div className="mt-8">
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-[10px] uppercase font-bold text-indigo-300">Strategy Suggestion</p>
                <p className="text-xs font-medium mt-1">Consider a 5% increase in base rates for Penthouse suites during upcoming weekends.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
