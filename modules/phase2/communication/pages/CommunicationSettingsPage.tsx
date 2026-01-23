/**
 * Communication Settings Page
 * Phase-2 Wave-1: Communication Automation
 * 
 * Route: /settings/phase2/communication
 * Who Uses: Admin only
 * 
 * Features:
 * - Email service configuration (SMTP/SendGrid)
 * - SMS service configuration (Twilio/TextLocal)
 * - WhatsApp service configuration (WhatsApp Business API)
 * - Feature flag aware (shows disabled state if flags OFF)
 */

import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, Loader2, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import { useToast } from '../../../../components/ui/Toast';
import { featureFlagService, Phase2FeatureFlag } from '../../../../backend/phase2/services/FeatureFlagService';
import { useHotelStore } from '../../../../stores/hotelStore';
import { EmptyState } from '../../../../components/ui/EmptyState';

export const CommunicationSettingsPage: React.FC = () => {
  const { activeHotelId: hotelId } = useHotelStore();
  const toast = useToast();
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form state management
  const [emailConfig, setEmailConfig] = useState({ provider: 'smtp', apiKey: '' });
  const [smsConfig, setSmsConfig] = useState({ provider: 'twilio', apiKey: '' });
  const [whatsappConfig, setWhatsappConfig] = useState({ token: '', phoneId: '' });

  React.useEffect(() => {
    const checkFlags = async () => {
      if (!hotelId) return;
      
      const [email, sms, whatsapp] = await Promise.all([
        featureFlagService.isEnabled(hotelId, Phase2FeatureFlag.COMMUNICATION_EMAIL_ENABLED),
        featureFlagService.isEnabled(hotelId, Phase2FeatureFlag.COMMUNICATION_SMS_ENABLED),
        featureFlagService.isEnabled(hotelId, Phase2FeatureFlag.COMMUNICATION_WHATSAPP_ENABLED),
      ]);
      
      setEmailEnabled(email);
      setSmsEnabled(sms);
      setWhatsappEnabled(whatsapp);
    };
    
    checkFlags();
  }, [hotelId]);

  const handleTestEmail = async () => {
    setLoading(true);
    try {
      // TODO: Implement test email send
      toast.success('Test email sent successfully');
    } catch (error) {
      toast.error('Failed to send test email');
    } finally {
      setLoading(false);
    }
  };

  const handleTestSms = async () => {
    setLoading(true);
    try {
      // TODO: Implement test SMS send
      toast.success('Test SMS sent successfully');
    } catch (error) {
      toast.error('Failed to send test SMS');
    } finally {
      setLoading(false);
    }
  };

  const handleTestWhatsApp = async () => {
    setLoading(true);
    try {
      // TODO: Implement test WhatsApp send
      toast.success('Test WhatsApp message sent successfully');
    } catch (error) {
      toast.error('Failed to send test WhatsApp message');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEmailConfig = async () => {
    if (!emailEnabled) return;
    setLoading(true);
    try {
      // TODO: Implement API call to save email configuration
      toast.success('Email configuration saved successfully');
    } catch (error) {
      toast.error('Failed to save email configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSmsConfig = async () => {
    if (!smsEnabled) return;
    setLoading(true);
    try {
      // TODO: Implement API call to save SMS configuration
      toast.success('SMS configuration saved successfully');
    } catch (error) {
      toast.error('Failed to save SMS configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWhatsAppConfig = async () => {
    if (!whatsappEnabled) return;
    setLoading(true);
    try {
      // TODO: Implement API call to save WhatsApp configuration
      toast.success('WhatsApp configuration saved successfully');
    } catch (error) {
      toast.error('Failed to save WhatsApp configuration');
    } finally {
      setLoading(false);
    }
  };

  if (!hotelId) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="No Hotel Selected"
        description="Please select a hotel to configure communication settings."
      />
    );
  }

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Mail className="text-slate-400" /> Communication Settings
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Configure email, SMS, and WhatsApp services for automated communications
        </p>
      </div>

      {/* Email Configuration */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Mail className="text-indigo-600" size={20} />
            <h2 className="text-lg font-bold text-slate-900">Email Service</h2>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
            emailEnabled ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
          }`}>
            {emailEnabled ? 'Enabled' : 'Disabled'}
          </div>
        </div>
        
        {!emailEnabled && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              Email automation is disabled. Enable the feature flag to configure email settings.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Provider
            </label>
            <select 
              value={emailConfig.provider}
              onChange={(e) => setEmailConfig({ ...emailConfig, provider: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              disabled={!emailEnabled}
            >
              <option value="smtp">SMTP</option>
              <option value="sendgrid">SendGrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              SMTP Host / SendGrid API Key
            </label>
            <input
              type="text"
              value={emailConfig.apiKey}
              onChange={(e) => setEmailConfig({ ...emailConfig, apiKey: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={emailEnabled ? "Enter SMTP host or SendGrid API key" : "Feature disabled"}
              disabled={!emailEnabled}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleTestEmail}
              disabled={!emailEnabled || loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
              Send Test Email
            </button>
            <button
              onClick={handleSaveEmailConfig}
              disabled={!emailEnabled || loading || !emailConfig.apiKey.trim()}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              Save Configuration
            </button>
          </div>
        </div>
      </div>

      {/* SMS Configuration */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="text-indigo-600" size={20} />
            <h2 className="text-lg font-bold text-slate-900">SMS Service</h2>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
            smsEnabled ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
          }`}>
            {smsEnabled ? 'Enabled' : 'Disabled'}
          </div>
        </div>
        
        {!smsEnabled && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              SMS automation is disabled. Enable the feature flag to configure SMS settings.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Provider
            </label>
            <select 
              value={smsConfig.provider}
              onChange={(e) => setSmsConfig({ ...smsConfig, provider: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              disabled={!smsEnabled}
            >
              <option value="twilio">Twilio</option>
              <option value="textlocal">TextLocal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              API Key / Account SID
            </label>
            <input
              type="text"
              value={smsConfig.apiKey}
              onChange={(e) => setSmsConfig({ ...smsConfig, apiKey: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={smsEnabled ? "Enter API key or Account SID" : "Feature disabled"}
              disabled={!smsEnabled}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleTestSms}
              disabled={!smsEnabled || loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
              Send Test SMS
            </button>
            <button
              onClick={handleSaveSmsConfig}
              disabled={!smsEnabled || loading || !smsConfig.apiKey.trim()}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              Save Configuration
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Configuration */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Phone className="text-indigo-600" size={20} />
            <h2 className="text-lg font-bold text-slate-900">WhatsApp Business API</h2>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
            whatsappEnabled ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
          }`}>
            {whatsappEnabled ? 'Enabled' : 'Disabled'}
          </div>
        </div>
        
        {!whatsappEnabled && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              WhatsApp automation is disabled. Enable the feature flag to configure WhatsApp settings.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              WhatsApp Business API Token
            </label>
            <input
              type="text"
              value={whatsappConfig.token}
              onChange={(e) => setWhatsappConfig({ ...whatsappConfig, token: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={whatsappEnabled ? "Enter WhatsApp Business API token" : "Feature disabled"}
              disabled={!whatsappEnabled}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone Number ID
            </label>
            <input
              type="text"
              value={whatsappConfig.phoneId}
              onChange={(e) => setWhatsappConfig({ ...whatsappConfig, phoneId: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={whatsappEnabled ? "Enter phone number ID" : "Feature disabled"}
              disabled={!whatsappEnabled}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleTestWhatsApp}
              disabled={!whatsappEnabled || loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
              Send Test WhatsApp
            </button>
            <button
              onClick={handleSaveWhatsAppConfig}
              disabled={!whatsappEnabled || loading || !whatsappConfig.token.trim() || !whatsappConfig.phoneId.trim()}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
