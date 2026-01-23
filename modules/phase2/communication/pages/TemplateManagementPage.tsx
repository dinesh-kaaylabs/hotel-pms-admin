/**
 * Template Management Page
 * Phase-2 Wave-1: Communication Automation
 * 
 * Route: /settings/phase2/communication/templates
 * Who Uses: Admin
 */

import React, { useState } from 'react';
import { FileText, Plus, Edit2, Loader2 } from 'lucide-react';
import { useCommunicationTemplates, useCreateCommunicationTemplate, useUpdateCommunicationTemplate } from '../communication.api';
import { EmptyState } from '../../../../components/ui/EmptyState';
import { useToast } from '../../../../components/ui/Toast';

export const TemplateManagementPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  
  const { data: templates, isLoading } = useCommunicationTemplates();
  const createMutation = useCreateCommunicationTemplate();
  const updateMutation = useUpdateCommunicationTemplate();
  const toast = useToast();

  const handleCreate = async (templateData: any) => {
    try {
      const result = await createMutation.mutateAsync(templateData);
      if (result.success) {
        toast.success('Template created successfully');
        setShowCreateModal(false);
      } else {
        toast.error(result.message || 'Failed to create template');
      }
    } catch (error) {
      toast.error('Failed to create template');
    }
  };

  const handleUpdate = async (templateId: string, updates: any) => {
    try {
      const result = await updateMutation.mutateAsync({ templateId, input: updates });
      if (result.success) {
        toast.success('Template updated successfully');
        setEditingTemplate(null);
      } else {
        toast.error(result.message || 'Failed to update template');
      }
    } catch (error) {
      toast.error('Failed to update template');
    }
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="text-slate-400" /> Communication Templates
          </h1>
          <p className="text-slate-500 text-sm mt-1">Create and manage email, SMS, and WhatsApp templates</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus size={16} /> New Template
        </button>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <Loader2 className="animate-spin text-indigo-600 mx-auto" size={32} />
        </div>
      ) : !templates?.length ? (
        <EmptyState
          icon={FileText}
          title="No Templates"
          description="Create your first communication template to get started."
          action={{
            label: 'Create Template',
            onClick: () => setShowCreateModal(true),
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900">{template.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{template.category}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  template.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {template.channel}
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-4 line-clamp-3">{template.body}</p>
              <button
                onClick={() => setEditingTemplate(template)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2"
              >
                <Edit2 size={14} /> Edit
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal would go here - simplified for now */}
    </div>
  );
};
