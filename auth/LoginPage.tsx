
import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Loader2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { OTPForm } from './OTPForm';
import { useBrandTheme } from '../components/providers/BrandThemeProvider';
import { authApi } from './auth.api';
import { useAuth } from './AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'LOGIN' | 'MFA'>('LOGIN');
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { theme } = useBrandTheme();
  const { isAuthenticated } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await authApi.login(email, password);
      const result = data.adminLogin;

      if (result.status === 'MFA_REQUIRED') {
        setStep('MFA');
        setIsLoading(false);
      } else if (result.status === 'SUCCESS') {
        // Extract first hotel from login response
        const firstHotel = result.user.hotels?.[0];
        
        if (!firstHotel?.id) {
          setError('No hotel assigned to this user');
          setIsLoading(false);
          return;
        }

        // 1. Persist hotelId BEFORE enabling query
        sessionStorage.setItem('pms_active_hotel_id', firstHotel.id);

        // 2. Invalidate queries to trigger re-fetch with hotelId now in storage
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['me'] }),
          queryClient.invalidateQueries({ queryKey: ['branding'] })
        ]);

        // 3. Navigate after auth state is prepared
        navigate('/', { replace: true });
      } else {
        setError(result.message || 'Authentication failed');
        setIsLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Invalid credentials or network error.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.4]" 
           style={{ 
             backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', 
             backgroundSize: '32px 32px' 
           }}>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden z-10 p-12"
      >
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-indigo-600 rounded-[24px] flex items-center justify-center mb-6 shadow-[0_10px_25px_-5px_rgba(79,70,229,0.4)]">
            <ShieldCheck className="text-white" size={40} />
          </div>

          <h1 className="text-[32px] font-bold text-[#1e293b] tracking-tight">LuxeStay PMS</h1>
          <p className="text-[#64748b] text-lg mt-2 mb-10">
            {step === 'LOGIN' ? 'Sign in to access the PMS' : 'Enter security code'}
          </p>

          <AnimatePresence mode="wait">
            {step === 'LOGIN' && (
              <motion.form 
                key="login"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleLogin} 
                className="w-full space-y-6"
              >
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#475569] ml-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]">
                      <Mail size={22} />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-base focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all placeholder:text-[#94a3b8] text-[#1e293b]"
                      placeholder="admin@luxestay.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#475569] ml-1">Password</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]">
                      <Lock size={22} />
                    </div>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-14 py-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-base focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all placeholder:text-[#94a3b8] text-[#1e293b]"
                      placeholder="••••••••"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#475569] transition-colors p-1"
                    >
                      {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-2xl text-center">
                    {error}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-[#4f46e5] text-white rounded-2xl font-bold text-lg hover:bg-[#4338ca] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_10px_20px_-5px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2 mt-4"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={24} /> : 'Sign In'}
                </button>

                <div className="pt-2 text-center">
                   <p className="text-xs text-[#94a3b8] font-medium italic">
                     Use <span className="font-bold text-indigo-500">admin@luxestay.com</span> / <span className="font-bold text-indigo-500">Password123!</span> to demo
                   </p>
                </div>
              </motion.form>
            )}

            {step === 'MFA' && (
              <motion.div
                key="mfa"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <OTPForm onCancel={() => setStep('LOGIN')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
