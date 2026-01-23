import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../providers/ThemeProvider';

/**
 * ThemeToggle: Light/Dark mode switcher
 * - Uses useTheme hook from context
 * - Smooth animated transition
 * - Persists to localStorage automatically
 * - No page reload required
 */
export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-400 transition-colors group"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        {theme === 'light' ? (
          <Sun size={18} className="text-amber-500 group-hover:text-amber-600" />
        ) : (
          <Moon size={18} className="text-blue-400 group-hover:text-blue-300" />
        )}
      </motion.div>
    </motion.button>
  );
};
