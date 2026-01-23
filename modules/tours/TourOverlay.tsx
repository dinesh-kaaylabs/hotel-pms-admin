
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTour } from './useTour';

export const TourOverlay: React.FC = () => {
  const { isActive, currentTour, currentStepIndex } = useTour();
  const [hole, setHole] = useState({ top: 0, left: 0, width: 0, height: 0 });

  const step = currentTour?.steps[currentStepIndex];

  useEffect(() => {
    if (!step || !isActive) return;

    const updateHole = () => {
      const element = document.querySelector(step.selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        setHole({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
    };

    updateHole();
    window.addEventListener('resize', updateHole);
    window.addEventListener('scroll', updateHole);
    return () => {
      window.removeEventListener('resize', updateHole);
      window.removeEventListener('scroll', updateHole);
    };
  }, [step, isActive]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9998] pointer-events-none"
    >
      <svg className="w-full h-full">
        <defs>
          <mask id="tour-mask">
            <rect width="100%" height="100%" fill="white" />
            <rect 
              x={hole.left - 4} 
              y={hole.top - 4} 
              width={hole.width + 8} 
              height={hole.height + 8} 
              rx="8" 
              fill="black" 
            />
          </mask>
        </defs>
        <rect 
          width="100%" 
          height="100%" 
          fill="rgba(15, 23, 42, 0.4)" 
          mask="url(#tour-mask)" 
          className="pointer-events-auto"
        />
      </svg>
    </motion.div>
  );
};
