/**
 * Audit Logs Page
 * Phase-2 Wave-1: Audit Logs & Approval Workflows
 * 
 * Route: /settings/phase2/audit
 * Who Uses: Admin
 */

import React, { useState } from 'react';
import { FileText, Search, Calendar, Loader2 } from 'lucide-react';
import { useAuditLogs, useAuditLogDetail } from '../audit.api';
import { EmptyState } from '../../../../components/ui/EmptyState';
import { TableSkeleton } from '../../../../components/ui/TableSkeleton';

export const AuditLogsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [filters, setFilters] = useState({
    action: undefined as string | undefined,
    entityType: undefined as string | undefined,
    dateFrom: undefined as string | undefined,
    dateTo: undefined as string | undefined,
  });
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  const { data, isLoading } = useAuditLogs(filters, { page, pageSize });
  const { data: logDetail } = useAuditLogDetail(selectedLogId);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="text-slate-400" /> Audit Logs
        </h1>
        <p className="text-slate-500 text-sm mt-1">View all system actions and changes for compliance</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex gap-4 flex-wrap">
        <select
          value={filters.action || ''}
          onChange={(e) => setFilters({ ...filters, action: e.target.value || undefined })}
          className="px-4 py-2 border border-slate-300 rounded-lg text-sm"
        >
          <option value="">All Actions</option>
          <option value="CHECK_IN">Check In</option>
          <option value="CHECK_OUT">Check Out</option>
          <option value="PAYMENT_RECORDED">Payment</option>
          <option value="REFUND_PROCESSED">Refund</option>
          <option value="BOOKING_CREATED">Booking Created</option>
          <option value="BOOKING_UPDATED">Booking Updated</option>
        </select>

        <select
          value={filters.entityType || ''}
          onChange={(e) => setFilters({ ...filters, entityType: e.target.value || undefined })}
          className="px-4 py-2 border border-slate-300 rounded-lg text-sm"
        >
          <option value="">All Entities</option>
          <option value="BOOKING">Booking</option>
          <option value="GUEST">Guest</option>
          <option value="INVOICE">Invoice</option>
          <option value="PAYMENT">Payment</option>
          <option value="USER">User</option>
        </select>

        <input
          type="date"
          value={filters.dateFrom || ''}
          onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value || undefined })}
          className="px-4 py-2 border border-slate-300 rounded-lg text-sm"
          placeholder="From Date"
        />

        <input
          type="date"
          value={filters.dateTo || ''}
          onChange={(e) => setFilters({ ...filters, dateTo: e.target.value || undefined })}
          className="px-4 py-2 border border-slate-300 rounded-lg text-sm"
          placeholder="To Date"
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton rows={10} cols={6} />
      ) : !data?.data.length ? (
        <EmptyState
          icon={FileText}
          title="No Audit Logs Found"
          description="No audit logs match your current filters."
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">Action</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">Actor</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">Entity</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.data.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-900">{log.action}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-slate-900">{log.actor.email}</div>
                      <div className="text-xs text-slate-500">{log.actor.role}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-slate-900">{log.entityType}</div>
                      <div className="text-xs text-slate-500">{log.entityId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{log.ipAddress || '-'}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedLogId(log.id)}
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
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

      {/* Detail Modal */}
      {selectedLogId && logDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Audit Log Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600">Action</label>
                <div className="text-sm text-slate-900">{logDetail.action}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Actor</label>
                <div className="text-sm text-slate-900">{logDetail.actor.email} ({logDetail.actor.role})</div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Entity</label>
                <div className="text-sm text-slate-900">{logDetail.entityType} - {logDetail.entityId}</div>
              </div>
              {logDetail.beforeValues && (
                <div>
                  <label className="text-sm font-medium text-slate-600">Before Values</label>
                  <pre className="text-xs bg-slate-50 p-3 rounded-lg overflow-auto">
                    {JSON.stringify(logDetail.beforeValues, null, 2)}
                  </pre>
                </div>
              )}
              {logDetail.afterValues && (
                <div>
                  <label className="text-sm font-medium text-slate-600">After Values</label>
                  <pre className="text-xs bg-slate-50 p-3 rounded-lg overflow-auto">
                    {JSON.stringify(logDetail.afterValues, null, 2)}
                  </pre>
                </div>
              )}
            </div>
            <button
              onClick={() => setSelectedLogId(null)}
              className="mt-6 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
