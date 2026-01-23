
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  colorClass: string;
}

export const SopCard: React.FC<Props> = ({ title, description, icon: Icon, path, colorClass }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <Link to={path} className="block p-8 bg-white border border-slate-200 rounded-[32px] shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all">
        <div className={`w-14 h-14 rounded-2xl ${colorClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
          <Icon size={28} />
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          {description}
        </p>
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600">
          View Standard Procedures <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
};
