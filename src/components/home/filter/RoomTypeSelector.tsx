import SelectableChip from "@/components/common/SelectableChip";

import { ROOM_TYPES } from "@/constants/Filter";

interface RoomTypeSelectorProps {
  selectedRoomTypes: string[];
  isDisabled: (type: string) => boolean;
  toggleRoomType: (type: string) => void;
}

const RoomTypeSelector = ({
  selectedRoomTypes,
  isDisabled,
  toggleRoomType,
}: RoomTypeSelectorProps) => {
  return (
    <div className="flex items-center gap-3 py-4">
      <span className="text-heading3 px-4 py-2 text-gray-900">매물유형</span>
      <div className="flex w-fit max-w-[269px] flex-wrap items-center justify-center gap-2 px-4 py-2">
        {ROOM_TYPES.map(type => (
          <SelectableChip
            key={type}
            label={type}
            selected={selectedRoomTypes.includes(type)}
            disabled={isDisabled(type)}
            onClick={() => toggleRoomType(type)}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomTypeSelector;
