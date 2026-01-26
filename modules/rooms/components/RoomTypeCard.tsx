import { Bed, Trash2 } from 'lucide-react';
import { RoomType } from '../rooms.types';

interface RoomTypeCardProps {
  type: RoomType;
  formatPrice: (amount: number) => string;
  onDelete: (typeId: string) => void;
}

export const RoomTypeCard: React.FC<RoomTypeCardProps> = ({ type, formatPrice, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <Bed className="text-blue-600" size={24} aria-hidden="true" />
          <h3 className="text-xl font-semibold text-gray-900">{type.name}</h3>
        </div>
        <button
          onClick={() => onDelete(type.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          aria-label={`Delete room type ${type.name}`}
        >
          <Trash2 size={18} aria-hidden="true" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-600">Base Price</p>
          <p className="font-semibold text-gray-900">{formatPrice(type.basePrice)}</p>
        </div>
        <div>
          <p className="text-gray-600">Capacity</p>
          <p className="font-semibold text-gray-900">{type.capacity} guests</p>
        </div>
        <div>
          <p className="text-gray-600">Max Adults</p>
          <p className="font-semibold text-gray-900">{type.maxAdults}</p>
        </div>
        <div>
          <p className="text-gray-600">Max Children</p>
          <p className="font-semibold text-gray-900">{type.maxChildren}</p>
        </div>
        <div>
          <p className="text-gray-600">Extra Bed</p>
          <p className="font-semibold text-gray-900">{type.extraBedAllowed ? 'Yes' : 'No'}</p>
        </div>
        {type.extraBedAllowed && type.extraBedPrice && (
          <div>
            <p className="text-gray-600">Extra Bed Price</p>
            <p className="font-semibold text-gray-900">{formatPrice(type.extraBedPrice)}</p>
          </div>
        )}
      </div>
    </div>
  );
};
