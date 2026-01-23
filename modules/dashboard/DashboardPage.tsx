
import React, { useMemo, useState, useEffect } from 'react';
import { 
  Users, 
  BedDouble, 
  CreditCard, 
  TrendingUp, 
  ChevronRight,
  Filter,
  Sparkles,
  Loader2,
  RefreshCcw
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../../app/layout/PageTransition';
import { useReportSummary, useRevenueTrend } from '../reports/reports.api';
import { useBookings } from '../bookings/bookings.api';
import { useCurrency } from '../../providers/CurrencyProvider';
import { GoogleGenAI } from "@google/genai";
import { BookingStatusBadge } from '../bookings/components/BookingStatusBadge';

export const DashboardPage: React.FC = () => {
  const { format } = useCurrency();
  const today = new Date().toISOString().split('T')[0];
  const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const { data: summary, isLoading: isSummaryLoading, refetch: refetchSummary } = useReportSummary({ startDate: lastWeek, endDate: today });
  const { data: revenueTrend, isLoading: isRevenueLoading } = useRevenueTrend({ startDate: lastWeek, endDate: today });
  const { data: recentBookingsData, isLoading: isBookingsLoading } = useBookings({ page: 1, pageSize: 5 });

  const [aiPulse, setAiPulse] = useState<string>('');
  const [isGeneratingPulse, setIsGeneratingPulse] = useState(false);

  const generateAIPulse = async () => {
    if (!summary) return;
    setIsGeneratingPulse(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `As a Hotel Operations AI, summarize the current property performance in 2 punchy sentences. 
      Data: Revenue: ${summary.totalRevenue}, Occupancy: ${summary.occupancyRate}%, ADR: ${summary.adr}. 
      Context: Comparing last 7 days.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      setAiPulse(response.text || 'Operations are within normal parameters.');
    } catch (e) {
      setAiPulse('AI Pulse unavailable. Check connectivity.');
    } finally {
      setIsGeneratingPulse(false);
    }
  };

  useEffect(() => {
    if (summary) generateAIPulse();
  }, [summary]);

  return (
    <PageTransition>
      <div className="space-y-8 max-w-[1400px] mx-auto pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">Real-time performance snapshot</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => refetchSummary()}
              className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            >
              <RefreshCcw size={20} />
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              Export Report
            </button>
          </div>
        </div>

        {/* AI Pulse Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-900 text-white p-4 rounded-3xl flex items-center justify-between gap-4 shadow-xl overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles size={80} />
          </div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20 backdrop-blur-sm">
              <Sparkles className="text-indigo-300" size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Executive AI Pulse</p>
              {isGeneratingPulse ? (
                <div className="flex items-center gap-2 mt-1">
                  <Loader2 size={14} className="animate-spin text-white/50" />
                  <p className="text-sm font-medium text-white/70 animate-pulse">Analyzing operations...</p>
                </div>
              ) : (
                <p className="text-sm font-bold leading-snug max-w-2xl">{aiPulse}</p>
              )}
            </div>
          </div>
          <button 
            onClick={generateAIPulse}
            className="hidden md:block px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10"
          >
            Re-Analyze
          </button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-tour="dashboard-kpis">
          <StatCard 
            label="Total Revenue" 
            value={isSummaryLoading ? '...' : format(summary?.totalRevenue || 0)} 
            trend={{ value: 12.5, isUp: true }} 
            icon={CreditCard} 
            color="indigo" 
          />
          <StatCard 
            label="Occupancy Rate" 
            value={isSummaryLoading ? '...' : `${summary?.occupancyRate}%`} 
            trend={{ value: 4.2, isUp: true }} 
            icon={BedDouble} 
            color="emerald" 
          />
          <StatCard 
            label="ADR (Average Daily Rate)" 
            value={isSummaryLoading ? '...' : format(summary?.adr || 0)} 
            icon={TrendingUp} 
            color="amber" 
          />
          <StatCard 
            label="Total Bookings" 
            value={isSummaryLoading ? '...' : summary?.totalBookings || '0'} 
            trend={{ value: 2.1, isUp: false }} 
            icon={Users} 
            color="rose" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest">Revenue Performance</h3>
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase">
                  <span className="w-2 h-2 rounded-full bg-brand-primary"></span> Net Revenue (7D)
                </span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              {isRevenueLoading ? (
                <div className="h-full w-full bg-slate-50 animate-pulse rounded-2xl flex items-center justify-center">
                   <Loader2 className="animate-spin text-slate-200" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueTrend}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--brand-primary)" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="var(--brand-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '11px', fontWeight: 'bold' }} />
                    <Area type="monotone" dataKey="revenue" stroke="var(--brand-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col">
            <h3 className="font-bold text-slate-900 mb-6 text-[10px] uppercase tracking-[0.2em] text-slate-400">Inventory Health</h3>
            <div className="flex-1 space-y-6">
              {[
                { type: 'Deluxe Suites', count: 8, total: 10, color: 'bg-indigo-500' },
                { type: 'Standard Rooms', count: 15, total: 20, color: 'bg-emerald-500' },
                { type: 'Penthouse', count: 1, total: 2, color: 'bg-amber-500' },
              ].map((room) => (
                <div key={room.type}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-600 font-bold">{room.type}</span>
                    <span className="text-slate-900 font-black">{room.count} / {room.total} Available</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(room.count / room.total) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={cn("h-full rounded-full", room.color)} 
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-8 w-full py-3.5 flex items-center justify-center gap-2 bg-slate-50 text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 rounded-2xl transition-all border border-slate-100">
              Manage Grid <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-900 text-[10px] uppercase tracking-[0.2em]">Expected Feed</h3>
            <button className="text-[10px] font-black text-indigo-600 hover:underline uppercase tracking-widest">Global Arrivals</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Guest Profile</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isBookingsLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={4} className="px-8 py-6"><div className="h-4 bg-slate-100 rounded-full w-3/4"></div></td>
                    </tr>
                  ))
                ) : (recentBookingsData?.data || []).map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-400 text-[11px] group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          {booking.guestName.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-slate-900">{booking.guestName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">{booking.roomType}</span>
                    </td>
                    <td className="px-8 py-5">
                      <BookingStatusBadge status={booking.status} />
                    </td>
                    <td className="px-8 py-5 text-sm font-black text-slate-900 text-right">{format(booking.totalAmount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
