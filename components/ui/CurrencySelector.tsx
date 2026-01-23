import React from 'react';
import { DollarSign, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency, CURRENCY_CONFIG, CurrencyCode } from '../../providers/CurrencyProvider';

/**
 * CurrencySelector: Dropdown to select currency
 * - Defaults to INR (₹)
 * - Shows symbol and code
 * - Persists selection automatically
 * - Global app updates on selection
 */
export const CurrencySelector: React.FC = () => {
  const { currency, setCurrency, config } = useCurrency();
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const currencies = Object.values(CURRENCY_CONFIG);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCurrencyChange = (code: CurrencyCode) => {
    setCurrency(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-400 transition-all group"
        title="Change currency"
      >
        <DollarSign size={18} className="text-slate-400 group-hover:text-indigo-500" />
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
          {config.symbol}
        </span>
        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase hidden sm:inline">
          {config.code}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 z-[110] p-2 overflow-hidden"
          >
            <div className="space-y-1">
              {currencies.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => handleCurrencyChange(curr.code)}
                  className={`w-full flex items-center justify-between gap-3 p-2.5 rounded-xl transition-all text-left ${
                    currency === curr.code
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-lg font-bold">{curr.symbol}</span>
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase">{curr.code}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-500">
                        {curr.label}
                      </p>
                    </div>
                  </div>
                  {currency === curr.code && (
                    <Check size={14} className="shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
