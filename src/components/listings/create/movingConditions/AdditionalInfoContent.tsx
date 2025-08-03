import { useEffect, useState } from "react";

interface OptionItem {
  optionId: number;
  label: string;
}
interface AdditionalInfoContentProps {
  options: Record<string, readonly OptionItem[]>;
  defaultValue?: number[];
  onSelect: (selectedIds: number[]) => void;
}

const AdditionalInfoContent = ({
  options,
  defaultValue = [],
  onSelect,
}: AdditionalInfoContentProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>(defaultValue);

  useEffect(() => {
    setSelectedIds(defaultValue);
  }, [defaultValue]);

  const handleToggle = (optionId: number, categoryKey: string) => {
    const isMultiple = categoryKey === "주차";

    let nextSelected: number[];
    if (isMultiple) {
      nextSelected = selectedIds.includes(optionId)
        ? selectedIds.filter(id => id !== optionId)
        : [...selectedIds, optionId];
    } else {
      const categoryOptionIds = options[categoryKey].map(opt => opt.optionId);
      const filtered = selectedIds.filter(
        id => !categoryOptionIds.includes(id),
      );
      nextSelected = selectedIds.includes(optionId)
        ? filtered
        : [...filtered, optionId];
    }

    setSelectedIds(nextSelected);
    onSelect(nextSelected);
  };

  const isSelected = (optionId: number) => selectedIds.includes(optionId);

  return (
    <div className="flex flex-col gap-2">
      {Object.entries(options).map(([key, values]) => (
        <div key={key} className="flex flex-col gap-3 px-4 py-3">
          <div className="flex gap-2">
            <div className="text-body1-sb text-gray-700">{key}</div>
            {key === "주차" && (
              <div className="text-cap1-med flex items-end text-gray-600">
                중복 선택 가능
              </div>
            )}
          </div>

          <ul className="flex gap-2">
            {values.map(option => (
              <li
                key={option.optionId}
                className={`text-body1-med flex h-9 flex-1 cursor-pointer items-center justify-center rounded-[4px] border py-[10px] ${
                  isSelected(option.optionId)
                    ? "text-mint bg-mint-light border-mint"
                    : "border-gray-600 text-gray-800"
                }`}
                onClick={() => handleToggle(option.optionId, key)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdditionalInfoContent;
