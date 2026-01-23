
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Check } from 'lucide-react';
import { useTour } from './useTour';

export const TourTooltip: React.FC = () => {
  const { currentTour, currentStepIndex, nextStep, skipTour, isActive } = useTour();
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  const step = currentTour?.steps[currentStepIndex];
  const isLastStep = currentTour && currentStepIndex === currentTour.steps.length - 1;

  useEffect(() => {
    if (!step || !isActive) return;

    const updatePosition = () => {
      const element = document.querySelector(step.selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        setCoords({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        });
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [step, isActive, currentStepIndex]);

  if (!isActive || !step || coords.width === 0) return null;

  // Simple positioning logic
  const getTooltipStyle = (): React.CSSProperties => {
    const gap = 12;
    switch (step.position) {
      case 'right':
        return { top: coords.top, left: coords.left + coords.width + gap };
      case 'bottom':
        return { top: coords.top + coords.height + gap, left: coords.left };
      case 'top':
        return { top: coords.top - gap, left: coords.left, transform: 'translateY(-100%)' };
      case 'left':
        return { top: coords.top, left: coords.left - gap, transform: 'translateX(-100%)' };
      default:
        return { top: coords.top, left: coords.left };
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <motion.div
        ref={tooltipRef}
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={getTooltipStyle()}
        className="absolute pointer-events-auto w-72 bg-slate-900 text-white rounded-2xl shadow-2xl p-5 border border-white/10"
      >
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-sm font-black text-indigo-400 uppercase tracking-widest">{step.title}</h4>
          <button onClick={skipTour} className="text-slate-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        
        <p className="text-xs text-slate-300 leading-relaxed mb-6 font-medium">
          {step.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {currentTour?.steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all ${i === currentStepIndex ? 'w-4 bg-indigo-500' : 'w-1 bg-slate-700'}`} 
              />
            ))}
          </div>
          
          <button 
            onClick={nextStep}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
          >
            {isLastStep ? <><Check size={14} /> Got it</> : <><ChevronRight size={14} /> Next</>}
          </button>
        </div>

        {/* Pointer Arrow */}
        <div 
          className={`absolute w-3 h-3 bg-slate-900 border-t border-l border-white/10 rotate-45 pointer-events-none ${
            step.position === 'right' ? '-left-1.5 top-6' : 
            step.position === 'bottom' ? '-top-1.5 left-6' : 
            step.position === 'top' ? '-bottom-1.5 left-6' : 
            '-right-1.5 top-6'
          }`}
        />
      </motion.div>
    </div>
  );
};
