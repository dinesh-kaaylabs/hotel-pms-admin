
import React from 'react';
import { motion } from 'framer-motion';
import { User, History, UserPlus } from 'lucide-react';
import { HousekeepingRoom, HousekeepingStatus } from '../housekeeping.types';
import { HousekeepingStatusBadge } from './HousekeepingStatusBadge';

interface Props {
  room: HousekeepingRoom;
  onAssign: (room: HousekeepingRoom) => void;
  onViewLogs: (room: HousekeepingRoom) => void;
  onUpdateStatus: (room: HousekeepingRoom, status: HousekeepingStatus) => void;
}

export const RoomStatusCard: React.FC<Props> = ({ room, onAssign, onViewLogs, onUpdateStatus }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-black text-slate-900 leading-none">{room.roomNumber}</h3>
            <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">{room.roomType}</p>
          </div>
          <HousekeepingStatusBadge status={room.status} />
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <User size={14} className="text-slate-400" />
            {room.assignedStaff ? (
              <span className="font-bold text-slate-700">{room.assignedStaff.name}</span>
            ) : (
              <span className="italic">Unassigned</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
            <History size={14} className="text-slate-300" />
            Last cleaned: {room.lastCleanedAt || 'N/A'}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-4 border-t border-slate-50">
        <div className="grid grid-cols-2 gap-2">
           <button 
            onClick={() => onAssign(room)}
            className="flex items-center justify-center gap-1.5 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-[10px] font-black uppercase text-slate-600 transition-colors"
          >
            <UserPlus size={14} /> Assign
          </button>
          <button 
            onClick={() => onViewLogs(room)}
            className="flex items-center justify-center gap-1.5 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-[10px] font-black uppercase text-slate-600 transition-colors"
          >
            <History size={14} /> History
          </button>
        </div>
        
        <select 
          value={room.status}
          onChange={(e) => onUpdateStatus(room, e.target.value as HousekeepingStatus)}
          className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase rounded-xl border-none outline-none text-center appearance-none cursor-pointer transition-colors"
        >
          <option value="DIRTY">Set Dirty</option>
          <option value="CLEAN">Set Clean</option>
          <option value="INSPECTED">Set Inspected</option>
          <option value="OUT_OF_SERVICE">Set OOS</option>
        </select>
      </div>
    </motion.div>
  );
};
