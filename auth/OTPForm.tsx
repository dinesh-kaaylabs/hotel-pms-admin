
import React, { useState, useRef, useEffect } from 'react';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { authApi } from './auth.api';

export const OTPForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== '' && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const code = otp.join('');
    if (code.length < 6) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await authApi.verifyMfa(code);
      const result = data.verifyMFA;
      
      if (result?.success) {
        await queryClient.invalidateQueries({ queryKey: ['me'] });
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 100);
      } else {
        setError(result?.message || 'Invalid code');
        setOtp(['', '', '', '', '', '']);
        inputs.current[0]?.focus();
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (otp.join('').length === 6) {
      handleSubmit();
    }
  }, [otp]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between gap-2">
        {otp.map((data, index) => (
          <input
            key={index}
            ref={(el) => { inputs.current[index] = el; }}
            type="text"
            maxLength={1}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-14 bg-slate-50 border-2 border-slate-200 rounded-xl text-center text-xl font-bold text-indigo-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
          />
        ))}
      </div>

      {error && <p className="text-center text-rose-600 text-xs font-medium">{error}</p>}

      <div className="space-y-3">
        <button 
          type="submit"
          disabled={isLoading || otp.join('').length < 6}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Verify Account'}
        </button>
        <button 
          type="button"
          onClick={onCancel}
          className="w-full flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={16} /> Back to login
        </button>
      </div>
    </form>
  );
};
