
import React, { useState } from 'react';
import { Plus, Settings2 } from 'lucide-react';
import { useRoomTypes } from '../rooms.api';
import { RoomTypesTable } from '../components/RoomTypesTable';
import { RoomTypeDrawer } from '../components/RoomTypeDrawer';
import { RoomType } from '../rooms.types';

export const RoomTypesPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<RoomType | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const { data, isLoading } = useRoomTypes();

  const handleEdit = (type: RoomType) => {
    setSelectedType(type);
    setDrawerOpen(true);
  };

  const handleCreate = () => {
    setSelectedType(null);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Settings2 className="text-indigo-600" /> Room Configuration
          </h1>
          <p className="text-slate-500 text-sm mt-1">Define property inventory categories and occupancy rules</p>
        </div>
        <button 
          onClick={handleCreate}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
        >
          <Plus size={18} /> Add Room Type
        </button>
      </div>

      <RoomTypesTable 
        data={data || []} 
        isLoading={isLoading} 
        onEdit={handleEdit} 
      />

      <RoomTypeDrawer 
        roomType={selectedType} 
        isOpen={isDrawerOpen} 
        onClose={() => setDrawerOpen(false)} 
      />
    </div>
  );
};
