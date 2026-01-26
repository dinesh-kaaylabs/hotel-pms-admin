interface RoomStatsProps {
  total: number;
  clean: number;
  dirty: number;
  occupied: number;
  maintenance: number;
}

export const RoomStats: React.FC<RoomStatsProps> = ({ total, clean, dirty, occupied, maintenance }) => {
  return (
    <div className="grid grid-cols-5 gap-4 mb-6" role="region" aria-label="Room statistics">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <p className="text-sm text-gray-600">Total Rooms</p>
        <p className="text-2xl font-bold text-gray-900" aria-live="polite">{total}</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
        <p className="text-sm text-green-700">Clean</p>
        <p className="text-2xl font-bold text-green-900" aria-live="polite">{clean}</p>
      </div>
      <div className="bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-200">
        <p className="text-sm text-yellow-700">Dirty</p>
        <p className="text-2xl font-bold text-yellow-900" aria-live="polite">{dirty}</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
        <p className="text-sm text-blue-700">Occupied</p>
        <p className="text-2xl font-bold text-blue-900" aria-live="polite">{occupied}</p>
      </div>
      <div className="bg-red-50 p-4 rounded-lg shadow-sm border border-red-200">
        <p className="text-sm text-red-700">Maintenance</p>
        <p className="text-2xl font-bold text-red-900" aria-live="polite">{maintenance}</p>
      </div>
    </div>
  );
};
