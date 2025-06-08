import SelectableChip from "@/components/common/SelectableChip";

import { HOUSE_TYPES } from "@/constants/housing-options";

interface TypeSelectorProps {
  selectedType?: "쉐어" | "렌트";
  onSelect: (type: "쉐어" | "렌트") => void;
}

const TypeSelector = ({ selectedType, onSelect }: TypeSelectorProps) => (
  <div className="flex items-center py-4">
    <span className="text-heading3 px-4 py-1 text-gray-900">매물종류</span>
    <div className="flex flex-1 justify-end gap-3 px-4 py-1">
      {HOUSE_TYPES.map(type => (
        <SelectableChip
          key={type}
          label={type}
          selected={selectedType === type}
          onClick={() => onSelect(type as "쉐어" | "렌트")}
        />
      ))}
    </div>
  </div>
);

export default TypeSelector;
