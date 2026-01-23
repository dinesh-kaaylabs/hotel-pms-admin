/**
 * Room Selector Component
 * Phase 1 - Go-Live Ready PMS
 * 
 * Displays available rooms for selection during check-in
 * Mobile-friendly, large touch targets
 */

import React from 'react';
import { Room } from '../checkin-checkout.api';
import { CheckCircle2 } from 'lucide-react';

interface RoomSelectorProps {
  rooms: Room[];
  selectedRoomId: string;
  onSelectRoom: (roomId: string) => void;
}

export const RoomSelector: React.FC<RoomSelectorProps> = ({
  rooms,
  selectedRoomId,
  onSelectRoom,
}) => {
  if (rooms.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No available rooms found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => {
        const isSelected = room.id === selectedRoomId;
        return (
          <button
            key={room.id}
            type="button"
            onClick={() => onSelectRoom(room.id)}
            className={`
              relative p-4 border-2 rounded-lg text-left transition-all min-h-[100px]
              ${isSelected
                ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200'
                : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
              }
            `}
          >
            {isSelected && (
              <div className="absolute top-2 right-2">
                <CheckCircle2 className="text-indigo-600" size={20} />
              </div>
            )}
            <div className="pr-8">
              <p className="font-semibold text-gray-900 text-lg">Room {room.number}</p>
              <p className="text-sm text-gray-600 mt-1">Floor {room.floor}</p>
              <p className="text-sm text-gray-600 font-medium">{room.roomType.name}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
