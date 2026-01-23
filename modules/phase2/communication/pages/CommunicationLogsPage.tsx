/**
 * Communication Logs Page
 * Phase-2 Wave-1: Communication Automation
 * 
 * Route: /settings/phase2/communication/logs
 * Who Uses: Admin
 */

import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, RefreshCw, Loader2 } from 'lucide-react';
import { useCommunicationLogs, useResendCommunication } from '../communication.api';
import { EmptyState } from '../../../../components/ui/EmptyState';
import { TableSkeleton } from '../../../../components/ui/TableSkeleton';
import { useToast } from '../../../../components/ui/Toast';

export const CommunicationLogsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [filters, setFilters] = useState({
    channel: undefined as 'EMAIL' | 'SMS' | 'WHATSAPP' | undefined,
    status: undefined as 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED' | 'READ' | undefined,
  });

  const { data, isLoading } = useCommunicationLogs(filters, { page, pageSize });
  const resendMutation = useResendCommunication();
  const toast = useToast();

  const handleResend = async (logId: string) => {
    try {
      const result = await resendMutation.mutateAsync(logId);
      if (result.success) {
        toast.success('Communication resent successfully');
      } else {
        toast.error(result.message || 'Failed to resend communication');
      }
    } catch (error) {
      toast.error('Failed to resend communication');
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'EMAIL': return Mail;
      case 'SMS': return MessageSquare;
      case 'WHATSAPP': return Phone;
      default: return Mail;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SENT':
      case 'DELIVERED':
      case 'READ':
        return 'bg-green-100 text-green-700';
      case 'FAILED':
        return 'bg-red-100 text-red-700';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Communication Logs</h1>
        <p className="text-slate-500 text-sm mt-1">View all sent communications and their delivery status</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex gap-4">
        <select
          value={filters.channel || ''}
          onChange={(e) => setFilters({ ...filters, channel: e.target.value as any || undefined })}
          className="px-4 py-2 border border-slate-300 rounded-lg text-sm"
        >
          <option value="">All Channels</option>
          <option value="EMAIL">Email</option>
          <option value="SMS">SMS</option>
          <option value="WHATSAPP">WhatsApp</option>
        </select>

        <select
          value={filters.status || ''}
          onChange={(e) => setFilters({ ...filters, status: e.target.value as any || undefined })}
          className="px-4 py-2 border border-slate-300 rounded-lg text-sm"
        >
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="SENT">Sent</option>
          <option value="DELIVERED">Delivered</option>
          <option value="FAILED">Failed</option>
          <option value="READ">Read</option>
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton rows={10} cols={6} />
      ) : !data?.data.length ? (
        <EmptyState
          icon={Mail}
          title="No Communications Found"
          description="No communications have been sent yet."
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">Recipient</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">Template</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">Sent At</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.data.map((log) => {
                const ChannelIcon = getChannelIcon(log.channel);
                return (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <ChannelIcon size={16} className="text-slate-400" />
                        <span className="text-sm text-slate-900">{log.channel}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900">{log.recipient}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{log.template?.name || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {log.sentAt ? new Date(log.sentAt).toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4">
                      {log.status === 'FAILED' && (
                        <button
                          onClick={() => handleResend(log.id)}
                          disabled={resendMutation.isPending}
                          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1 disabled:opacity-50"
                        >
                          {resendMutation.isPending ? (
                            <Loader2 className="animate-spin" size={14} />
                          ) : (
                            <RefreshCw size={14} />
                          )}
                          Resend
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          {data.totalCount > pageSize && (
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-sm text-slate-600">
                Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, data.totalCount)} of {data.totalCount}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page * pageSize >= data.totalCount}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
