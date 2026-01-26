import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FileText, Download, Calendar, Clock } from 'lucide-react';
import { getReportCatalog, getScheduledReports, getReportHistory } from '../reports-export.api';

export const ReportsExportPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const { data: catalog, isLoading: catalogLoading } = useQuery({
    queryKey: ['reportCatalog'],
    queryFn: getReportCatalog,
  });

  const { data: scheduled, isLoading: scheduledLoading } = useQuery({
    queryKey: ['scheduledReports'],
    queryFn: getScheduledReports,
  });

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ['reportHistory'],
    queryFn: () => getReportHistory(10),
  });

  if (catalogLoading || scheduledLoading || historyLoading) {
    return <div className="text-sm text-slate-500">Loading reports...</div>;
  }

  const categorySet = new Set<string>();
  catalog?.forEach((r: any) => {
    const cat = r.category || r.type;
    if (cat && typeof cat === 'string') {
      categorySet.add(cat);
    }
  });
  const categories: string[] = ['ALL', ...Array.from(categorySet)];
  const filteredCatalog = selectedCategory === 'ALL' 
    ? catalog 
    : catalog?.filter((r: any) => (r.category || r.type) === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Reports & Export</h2>
        <p className="text-xs text-slate-500 mt-1 uppercase font-black tracking-widest">Generate & Schedule Reports</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredCatalog && filteredCatalog.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCatalog.map((report: any) => (
            <div key={report.id} className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FileText className="text-indigo-600" size={24} />
                  <div>
                    <h3 className="font-bold text-slate-900">{report.name}</h3>
                    <p className="text-xs text-slate-500">{report.category || report.type}</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-4">{report.description}</p>

              <div className="space-y-2 mb-4">
                <div className="text-xs text-slate-500">
                  <span className="font-semibold">Formats:</span> {report.outputFormats ? report.outputFormats.join(', ') : (report.format || 'N/A')}
                </div>
                <div className="text-xs text-slate-500">
                  <span className="font-semibold">Schedule:</span> {report.scheduleSupported ? 'Supported' : (report.schedule ? report.schedule : 'Manual Only')}
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                <Download size={16} /> Generate Report
              </button>
            </div>
          ))}
        </div>
      )}

      {scheduled && scheduled.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Calendar size={20} /> Scheduled Reports
          </h3>
          <div className="space-y-3">
            {scheduled.map((sched: any) => (
              <div key={sched.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <div className="font-semibold text-slate-900">{sched.reportName}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {sched.frequency} at {sched.schedule} | Format: {sched.format}
                  </div>
                  {sched.recipients && sched.recipients.length > 0 && (
                    <div className="text-xs text-slate-500 mt-1">
                      Recipients: {sched.recipients.join(', ')}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className={`text-xs font-bold ${sched.isActive ? 'text-green-600' : 'text-slate-400'}`}>
                    {sched.isActive ? 'Active' : 'Inactive'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Next: {new Date(sched.nextRunAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {history && history.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Clock size={20} /> Recent Reports
          </h3>
          <div className="space-y-3">
            {history.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <div className="font-semibold text-slate-900">{item.reportName}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Generated: {new Date(item.generatedAt).toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Format: {item.format} | Size: {(item.fileSize / 1024).toFixed(0)} KB
                  </div>
                </div>
                <a
                  href={item.fileUrl}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <Download size={16} /> Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
