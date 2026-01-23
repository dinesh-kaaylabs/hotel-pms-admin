
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Grid2X2, 
  List, 
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Wrench
} from 'lucide-react';
import { motion } from 'framer-motion';
import { RoomStatus } from '../../types';

interface Room {
  id: string;
  number: string;
  type: string;
  status: RoomStatus;
  floor: number;
}

const mockRooms: Room[] = [
  { id: '1', number: '101', type: 'Single', status: RoomStatus.AVAILABLE, floor: 1 },
  { id: '2', number: '102', type: 'Single', status: RoomStatus.DIRTY, floor: 1 },
  { id: '3', number: '103', type: 'Double', status: RoomStatus.OCCUPIED, floor: 1 },
  { id: '4', number: '104', type: 'Suite', status: RoomStatus.MAINTENANCE, floor: 1 },
  { id: '5', number: '201', type: 'Double', status: RoomStatus.AVAILABLE, floor: 2 },
  { id: '6', number: '202', type: 'Double', status: RoomStatus.OCCUPIED, floor: 2 },
  { id: '7', number: '203', type: 'Deluxe', status: RoomStatus.AVAILABLE, floor: 2 },
  { id: '8', number: '301', type: 'Penthouse', status: RoomStatus.OCCUPIED, floor: 3 },
  { id: '9', number: '302', type: 'Penthouse', status: RoomStatus.AVAILABLE, floor: 3 },
  { id: '10', number: '105', type: 'Double', status: RoomStatus.AVAILABLE, floor: 1 },
  { id: '11', number: '106', type: 'Double', status: RoomStatus.DIRTY, floor: 1 },
  { id: '12', number: '205', type: 'Deluxe', status: RoomStatus.MAINTENANCE, floor: 2 },
];

const statusStyles = {
  [RoomStatus.AVAILABLE]: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle2 },
  [RoomStatus.OCCUPIED]: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: Clock },
  [RoomStatus.DIRTY]: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', icon: AlertCircle },
  [RoomStatus.MAINTENANCE]: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-300', icon: Wrench },
  [RoomStatus.RESERVED]: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: Clock },
};

export const RoomsPage: React.FC = () => {
  const [filter, setFilter] = useState<RoomStatus | 'ALL'>('ALL');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredRooms = filter === 'ALL' ? mockRooms : mockRooms.filter(r => r.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Room Status</h1>
          <p className="text-slate-500 text-sm mt-1">Live overview of property rooms and housekeeping</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
            <Plus size={18} /> New Room
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', ...Object.values(RoomStatus)].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === s 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
          <button 
            onClick={() => setView('grid')}
            className={`p-2 rounded-lg ${view === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <Grid2X2 size={20} />
          </button>
          <button 
            onClick={() => setView('list')}
            className={`p-2 rounded-lg ${view === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filteredRooms.map((room) => {
          const style = statusStyles[room.status];
          const StatusIcon = style.icon;
          return (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={room.id}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer hover:shadow-md ${style.bg} ${style.border}`}
            >
              <div className="flex justify-between items-start mb-6">
                <span className={`text-lg font-bold ${style.text}`}>{room.number}</span>
                <StatusIcon size={20} className={style.text} />
              </div>
              <div>
                <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${style.text}`}>{room.type}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Floor {room.floor}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${style.bg} filter brightness-90 ${style.text}`}>
                    {room.status}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
