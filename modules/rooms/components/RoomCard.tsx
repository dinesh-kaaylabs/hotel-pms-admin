import { DoorOpen, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { Room } from '../rooms.types';
import { RoomStatusBadge } from './RoomStatusBadge';

interface RoomCardProps {
  room: Room;
  roomTypeName: string;
  onEdit: (room: Room) => void;
  onDelete: (roomId: string) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, roomTypeName, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <DoorOpen className="text-blue-600" size={20} aria-hidden="true" />
          <span className="text-lg font-bold text-gray-900">{room.roomNumber}</span>
        </div>
        <RoomStatusBadge status={room.status} />
      </div>
      <div className="space-y-1 text-sm mb-3">
        <p className="text-gray-600">
          Type: <span className="font-medium text-gray-900">{roomTypeName}</span>
        </p>
        <p className="text-gray-600">
          Floor: <span className="font-medium text-gray-900">{room.floor}</span>
        </p>
        <p className="text-gray-600">
          View: <span className="font-medium text-gray-900">{room.viewType}</span>
        </p>
      </div>
      {room.outOfOrderReason && (
        <div className="flex items-start gap-2 p-2 bg-red-50 rounded text-xs text-red-700 mb-3" role="alert">
          <AlertCircle size={14} className="mt-0.5" aria-hidden="true" />
          <span>{room.outOfOrderReason}</span>
        </div>
      )}
      <div className="flex gap-2 pt-3 border-t border-gray-200">
        <button
          onClick={() => onEdit(room)}
          className="flex-1 px-2 py-1 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded text-sm transition-colors"
          aria-label={`Edit room ${room.roomNumber}`}
        >
          <Edit2 size={14} className="inline mr-1" aria-hidden="true" />
          Edit
        </button>
        <button
          onClick={() => onDelete(room.id)}
          className="px-2 py-1 text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors"
          aria-label={`Delete room ${room.roomNumber}`}
        >
          <Trash2 size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
