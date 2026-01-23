import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Globe, CheckCircle, XCircle, AlertCircle, Clock, RefreshCw } from 'lucide-react';
import { getOTAConnections, getSyncLogs } from '../channel-manager.api';

export const ChannelManagerPage: React.FC = () => {
  const { data: connections, isLoading: connLoading } = useQuery({
    queryKey: ['otaConnections'],
    queryFn: getOTAConnections,
  });

  const { data: syncLogs, isLoading: logsLoading } = useQuery({
    queryKey: ['syncLogs'],
    queryFn: () => getSyncLogs(undefined, 10),
  });

  if (connLoading || logsLoading) {
    return <div className="text-sm text-slate-500">Loading channel manager...</div>;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONNECTED':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'ERROR':
        return <XCircle className="text-red-600" size={20} />;
      case 'DISCONNECTED':
        return <AlertCircle className="text-slate-400" size={20} />;
      default:
        return <Clock className="text-amber-600" size={20} />;
    }
  };

  const getSyncStatusBadge = (status: string) => {
    const styles = {
      SUCCESS: 'bg-green-100 text-green-700',
      FAILED: 'bg-red-100 text-red-700',
      PENDING: 'bg-amber-100 text-amber-700',
    };
    return styles[status as keyof typeof styles] || styles.PENDING;
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Channel Manager</h2>
        <p className="text-xs text-slate-500 mt-1 uppercase font-black tracking-widest">OTA Integrations & Sync</p>
      </div>

      {connections && connections.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connections.map((conn: any) => (
            <div key={conn.id} className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Globe className="text-indigo-600" size={24} />
                  <div>
                    <h3 className="font-bold text-slate-900">{conn.otaName}</h3>
                    <p className="text-xs text-slate-500">{conn.otaCode}</p>
                  </div>
                </div>
                {getStatusIcon(conn.status)}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Status</span>
                  <span className={`font-semibold ${conn.status === 'CONNECTED' ? 'text-green-600' : conn.status === 'ERROR' ? 'text-red-600' : 'text-slate-600'}`}>
                    {conn.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Rooms Mapped</span>
                  <span className="font-semibold text-slate-900">{conn.roomsMapped}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Sync Frequency</span>
                  <span className="font-semibold text-slate-900">{conn.syncFrequency}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Last Sync</span>
                  <span className="font-semibold text-slate-900">
                    {new Date(conn.lastSyncAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Connected Since</span>
                  <span className="font-semibold text-slate-900">
                    {new Date(conn.connectionDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                  <RefreshCw size={16} /> Sync Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {syncLogs && syncLogs.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Sync Logs</h3>
          <div className="space-y-3">
            {syncLogs.map((log: any) => (
              <div key={log.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getSyncStatusBadge(log.status)}`}>
                      {log.status}
                    </span>
                    <span className="font-semibold text-slate-900">{log.syncType}</span>
                    <span className="text-xs text-slate-500 uppercase">{log.direction}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {log.recordsProcessed} processed, {log.recordsFailed} failed
                  </div>
                  {log.errorMessage && (
                    <div className="text-xs text-red-600 mt-1">{log.errorMessage}</div>
                  )}
                </div>
                <div className="text-right text-xs text-slate-500">
                  {new Date(log.startedAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
