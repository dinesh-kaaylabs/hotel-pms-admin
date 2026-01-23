/**
 * Approval Dashboard Page
 * Phase-2 Wave-1: Audit Logs & Approval Workflows
 * 
 * Route: /settings/phase2/approval
 * Who Uses: Admin, Managers
 */

import React, { useState } from 'react';
import { CheckCircle2, XCircle, Clock, Loader2 } from 'lucide-react';
import { useApprovalRequests, useApproveRequest, useRejectRequest } from '../approval.api';
import { EmptyState } from '../../../../components/ui/EmptyState';
import { TableSkeleton } from '../../../../components/ui/TableSkeleton';
import { useToast } from '../../../../components/ui/Toast';

export const ApprovalDashboardPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [filters, setFilters] = useState({
    status: 'PENDING' as 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED' | undefined,
  });

  const { data, isLoading } = useApprovalRequests(filters, { page, pageSize });
  const approveMutation = useApproveRequest();
  const rejectMutation = useRejectRequest();
  const toast = useToast();

  const handleApprove = async (requestId: string, comments?: string) => {
    try {
      const result = await approveMutation.mutateAsync({ requestId, comments });
      if (result.success) {
        toast.success('Request approved successfully');
      } else {
        toast.error(result.message || 'Failed to approve request');
      }
    } catch (error) {
      toast.error('Failed to approve request');
    }
  };

  const handleReject = async (requestId: string, comments: string) => {
    try {
      const result = await rejectMutation.mutateAsync({ requestId, comments });
      if (result.success) {
        toast.success('Request rejected');
      } else {
        toast.error(result.message || 'Failed to reject request');
      }
    } catch (error) {
      toast.error('Failed to reject request');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle2 className="text-green-600" size={16} />;
      case 'REJECTED':
        return <XCircle className="text-red-600" size={16} />;
      case 'PENDING':
        return <Clock className="text-yellow-600" size={16} />;
      default:
        return <Clock className="text-slate-400" size={16} />;
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="text-slate-400" /> Approval Dashboard
        </h1>
        <p className="text-slate-500 text-sm mt-1">Review and approve pending requests</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex gap-4">
        <select
          value={filters.status || ''}
          onChange={(e) => setFilters({ ...filters, status: e.target.value as any || undefined })}
          className="px-4 py-2 border border-slate-300 rounded-lg text-sm"
        >
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="EXPIRED">Expired</option>
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton rows={10} cols={6} />
      ) : !data?.data.length ? (
        <EmptyState
          icon={CheckCircle2}
          title="No Approval Requests"
          description={filters.status === 'PENDING' 
            ? "No pending approval requests at this time."
            : "No approval requests match your filters."}
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">Action</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">Requester</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">Entity</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">Created</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.data.map((request) => (
                <tr key={request.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-900">{request.action}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-slate-900">{request.requester.email}</div>
                      <div className="text-xs text-slate-500">{request.requester.role}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-slate-900">{request.entityType}</div>
                      <div className="text-xs text-slate-500">{request.entityId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(request.status)}
                      <span className="text-sm text-slate-900">{request.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(request.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {request.status === 'PENDING' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(request.id)}
                          disabled={approveMutation.isPending}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 flex items-center gap-1"
                        >
                          {approveMutation.isPending ? (
                            <Loader2 className="animate-spin" size={14} />
                          ) : (
                            <CheckCircle2 size={14} />
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            const comments = prompt('Rejection reason:');
                            if (comments) handleReject(request.id, comments);
                          }}
                          disabled={rejectMutation.isPending}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50 flex items-center gap-1"
                        >
                          {rejectMutation.isPending ? (
                            <Loader2 className="animate-spin" size={14} />
                          ) : (
                            <XCircle size={14} />
                          )}
                          Reject
                        </button>
                      </div>
                    )}
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
    </div>
  );
};
