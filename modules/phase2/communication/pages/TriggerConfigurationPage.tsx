/**
 * Trigger Configuration Page
 * Phase-2 Wave-1: Communication Automation
 * 
 * Route: /settings/phase2/communication/triggers
 * Who Uses: Admin
 */

import React, { useState } from 'react';
import { Zap, ToggleLeft, ToggleRight, Loader2 } from 'lucide-react';
import { useCommunicationTriggers, useConfigureCommunicationTrigger } from '../communication.api';
import { EmptyState } from '../../../../components/ui/EmptyState';
import { useToast } from '../../../../components/ui/Toast';

export const TriggerConfigurationPage: React.FC = () => {
  const { data: triggers, isLoading } = useCommunicationTriggers();
  const configureMutation = useConfigureCommunicationTrigger();
  const toast = useToast();

  const handleToggle = async (trigger: any) => {
    try {
      const result = await configureMutation.mutateAsync({
        event: trigger.event,
        templateId: trigger.templateId,
        channel: trigger.channel,
        isEnabled: !trigger.isEnabled,
        conditions: trigger.conditions,
      });
      if (result.success) {
        toast.success(`Trigger ${!trigger.isEnabled ? 'enabled' : 'disabled'}`);
      } else {
        toast.error(result.message || 'Failed to update trigger');
      }
    } catch (error) {
      toast.error('Failed to update trigger');
    }
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Zap className="text-slate-400" /> Communication Triggers
        </h1>
        <p className="text-slate-500 text-sm mt-1">Configure automated communications based on system events</p>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <Loader2 className="animate-spin text-indigo-600 mx-auto" size={32} />
        </div>
      ) : !triggers?.length ? (
        <EmptyState
          icon={Zap}
          title="No Triggers Configured"
          description="Configure triggers to automatically send communications when events occur."
        />
      ) : (
        <div className="space-y-4">
          {triggers.map((trigger) => (
            <div key={trigger.id} className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-slate-900">{trigger.event}</h3>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">
                      {trigger.channel}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Template: {trigger.template?.name || trigger.templateId}
                  </p>
                </div>
                <button
                  onClick={() => handleToggle(trigger)}
                  disabled={configureMutation.isPending}
                  className="flex items-center gap-2"
                >
                  {trigger.isEnabled ? (
                    <ToggleRight className="text-green-600" size={24} />
                  ) : (
                    <ToggleLeft className="text-slate-400" size={24} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
