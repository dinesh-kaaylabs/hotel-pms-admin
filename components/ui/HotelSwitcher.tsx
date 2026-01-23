
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Building2, Check, Landmark } from 'lucide-react';
import { useHotelStore } from '../../stores/hotelStore';
import { motion, AnimatePresence } from 'framer-motion';

export const HotelSwitcher: React.FC = () => {
  const { hotels, activeHotelId, activeHotelName, setActiveHotel } = useHotelStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // If user only has one hotel, don't show the switcher dropdown capability
  const isChain = hotels.length > 1;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (hotels.length === 0) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => isChain && setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-all hover:border-indigo-300 group max-w-[240px] ${isChain ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm shadow-indigo-200">
          <Landmark size={16} />
        </div>
        <div className="text-left overflow-hidden">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Active Property</p>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate pr-2">
            {activeHotelName}
          </p>
        </div>
        {isChain && (
          <ChevronDown 
            size={16} 
            className={`text-slate-400 group-hover:text-indigo-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute left-0 top-full mt-2 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 z-[100] p-2 overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-slate-50 dark:border-slate-700 mb-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Your Hotel Group</p>
            </div>
            
            <div className="space-y-1 max-h-64 overflow-y-auto scrollbar-hide">
              {hotels.map((hotel) => (
                <button
                  key={hotel.id}
                  onClick={() => {
                    setActiveHotel(hotel.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl transition-all text-left ${
                    activeHotelId === hotel.id 
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building2 size={18} className={activeHotelId === hotel.id ? 'text-indigo-600' : 'text-slate-400'} />
                    <span className="text-sm font-bold truncate">{hotel.name}</span>
                  </div>
                  {activeHotelId === hotel.id && <Check size={16} className="shrink-0" />}
                </button>
              ))}
            </div>
            
            <div className="mt-2 pt-2 border-t border-slate-50 dark:border-slate-700">
               <button className="w-full text-center py-2 text-[10px] font-black uppercase text-slate-400 hover:text-indigo-600 transition-colors tracking-widest">
                 Manage Properties
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
