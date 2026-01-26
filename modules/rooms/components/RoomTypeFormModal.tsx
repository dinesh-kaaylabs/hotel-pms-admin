import { VALIDATION_RULES } from '../rooms.constants';

interface RoomTypeFormData {
  name: string;
  capacity: number;
  basePrice: number;
  maxAdults: number;
  maxChildren: number;
  extraBedAllowed: boolean;
  extraBedPrice: number;
}

interface RoomTypeFormModalProps {
  isOpen: boolean;
  formData: RoomTypeFormData;
  isLoading: boolean;
  errors: Partial<Record<keyof RoomTypeFormData, string>>;
  onChange: (field: keyof RoomTypeFormData, value: string | number | boolean) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export const RoomTypeFormModal: React.FC<RoomTypeFormModalProps> = ({
  isOpen,
  formData,
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
      aria-labelledby="room-type-form-title"
    >
      <div 
        className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="room-type-form-title" className="text-2xl font-bold mb-4">
          Create Room Type
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="typeName" className="block text-sm font-medium text-gray-700 mb-1">
              Type Name <span className="text-red-500">*</span>
            </label>
            <input
              id="typeName"
              type="text"
              value={formData.name}
              onChange={(e) => onChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Deluxe Suite"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'typeName-error' : undefined}
            />
            {errors.name && (
              <p id="typeName-error" className="text-red-500 text-xs mt-1" role="alert">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700 mb-1">
              Base Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              id="basePrice"
              type="number"
              value={formData.basePrice}
              onChange={(e) => onChange('basePrice', parseFloat(e.target.value) || 0)}
              min={VALIDATION_RULES.basePrice.min}
              max={VALIDATION_RULES.basePrice.max}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.basePrice ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.basePrice}
              aria-describedby={errors.basePrice ? 'basePrice-error' : undefined}
            />
            {errors.basePrice && (
              <p id="basePrice-error" className="text-red-500 text-xs mt-1" role="alert">
                {errors.basePrice}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                Capacity
              </label>
              <input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => onChange('capacity', parseInt(e.target.value) || 0)}
                min={VALIDATION_RULES.capacity.min}
                max={VALIDATION_RULES.capacity.max}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.capacity ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!errors.capacity}
                aria-describedby={errors.capacity ? 'capacity-error' : undefined}
              />
              {errors.capacity && (
                <p id="capacity-error" className="text-red-500 text-xs mt-1" role="alert">
                  {errors.capacity}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="maxAdults" className="block text-sm font-medium text-gray-700 mb-1">
                Max Adults
              </label>
              <input
                id="maxAdults"
                type="number"
                value={formData.maxAdults}
                onChange={(e) => onChange('maxAdults', parseInt(e.target.value) || 0)}
                min={VALIDATION_RULES.maxAdults.min}
                max={VALIDATION_RULES.maxAdults.max}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.maxAdults ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!errors.maxAdults}
                aria-describedby={errors.maxAdults ? 'maxAdults-error' : undefined}
              />
              {errors.maxAdults && (
                <p id="maxAdults-error" className="text-red-500 text-xs mt-1" role="alert">
                  {errors.maxAdults}
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="maxChildren" className="block text-sm font-medium text-gray-700 mb-1">
              Max Children
            </label>
            <input
              id="maxChildren"
              type="number"
              value={formData.maxChildren}
              onChange={(e) => onChange('maxChildren', parseInt(e.target.value) || 0)}
              min={VALIDATION_RULES.maxChildren.min}
              max={VALIDATION_RULES.maxChildren.max}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.maxChildren ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.maxChildren}
              aria-describedby={errors.maxChildren ? 'maxChildren-error' : undefined}
            />
            {errors.maxChildren && (
              <p id="maxChildren-error" className="text-red-500 text-xs mt-1" role="alert">
                {errors.maxChildren}
              </p>
            )}
          </div>
          <div className="flex items-center">
            <input
              id="extraBed"
              type="checkbox"
              checked={formData.extraBedAllowed}
              onChange={(e) => onChange('extraBedAllowed', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="extraBed" className="ml-2 text-sm font-medium text-gray-700">
              Extra Bed Allowed
            </label>
          </div>
          {formData.extraBedAllowed && (
            <div>
              <label htmlFor="extraBedPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Extra Bed Price (₹)
              </label>
              <input
                id="extraBedPrice"
                type="number"
                value={formData.extraBedPrice}
                onChange={(e) => onChange('extraBedPrice', parseFloat(e.target.value) || 0)}
                min={VALIDATION_RULES.extraBedPrice.min}
                max={VALIDATION_RULES.extraBedPrice.max}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.extraBedPrice ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!errors.extraBedPrice}
                aria-describedby={errors.extraBedPrice ? 'extraBedPrice-error' : undefined}
              />
              {errors.extraBedPrice && (
                <p id="extraBedPrice-error" className="text-red-500 text-xs mt-1" role="alert">
                  {errors.extraBedPrice}
                </p>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Create room type"
          >
            {isLoading ? 'Creating...' : 'Create'}
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
