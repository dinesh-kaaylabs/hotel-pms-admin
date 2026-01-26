import { Room, RoomStatus } from '../rooms.types';
import { RoomType } from '../rooms.types';
import { VIEW_TYPES, ROOM_STATUS_OPTIONS, VALIDATION_RULES } from '../rooms.constants';

interface RoomFormData {
  roomNumber: string;
  roomTypeId: string;
  floor: number;
  viewType: string;
  status: RoomStatus | string;
}

interface RoomFormModalProps {
  isOpen: boolean;
  isEdit: boolean;
  formData: RoomFormData;
  roomTypes: RoomType[];
  isLoading: boolean;
  errors: Partial<Record<keyof RoomFormData, string>>;
  onChange: (field: keyof RoomFormData, value: string | number) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export const RoomFormModal: React.FC<RoomFormModalProps> = ({
  isOpen,
  isEdit,
  formData,
  roomTypes,
  isLoading,
  errors,
  onChange,
  onSubmit,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="room-form-title"
    >
      <div 
        className="bg-white rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="room-form-title" className="text-2xl font-bold mb-4">
          {isEdit ? 'Edit Room' : 'Create New Room'}
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Room Number <span className="text-red-500">*</span>
            </label>
            <input
              id="roomNumber"
              type="text"
              value={formData.roomNumber}
              onChange={(e) => onChange('roomNumber', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.roomNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 101"
              aria-invalid={!!errors.roomNumber}
              aria-describedby={errors.roomNumber ? 'roomNumber-error' : undefined}
            />
            {errors.roomNumber && (
              <p id="roomNumber-error" className="text-red-500 text-xs mt-1" role="alert">
                {errors.roomNumber}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="roomTypeId" className="block text-sm font-medium text-gray-700 mb-1">
              Room Type <span className="text-red-500">*</span>
            </label>
            <select
              id="roomTypeId"
              value={formData.roomTypeId}
              onChange={(e) => onChange('roomTypeId', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.roomTypeId ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.roomTypeId}
              aria-describedby={errors.roomTypeId ? 'roomTypeId-error' : undefined}
            >
              <option value="">Select room type</option>
              {roomTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
            {errors.roomTypeId && (
              <p id="roomTypeId-error" className="text-red-500 text-xs mt-1" role="alert">
                {errors.roomTypeId}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="floor" className="block text-sm font-medium text-gray-700 mb-1">
              Floor
            </label>
            <input
              id="floor"
              type="number"
              value={formData.floor}
              onChange={(e) => onChange('floor', parseInt(e.target.value) || 0)}
              min={VALIDATION_RULES.floor.min}
              max={VALIDATION_RULES.floor.max}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.floor ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.floor}
              aria-describedby={errors.floor ? 'floor-error' : undefined}
            />
            {errors.floor && (
              <p id="floor-error" className="text-red-500 text-xs mt-1" role="alert">
                {errors.floor}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="viewType" className="block text-sm font-medium text-gray-700 mb-1">
              View Type
            </label>
            <select
              id="viewType"
              value={formData.viewType}
              onChange={(e) => onChange('viewType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {VIEW_TYPES.map(view => (
                <option key={view.value} value={view.value}>{view.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => onChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {ROOM_STATUS_OPTIONS.filter(opt => opt.value !== 'ALL').map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label={isEdit ? 'Update room' : 'Create room'}
          >
            {isLoading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
