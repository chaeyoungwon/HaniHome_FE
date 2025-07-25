import { useState } from "react";

interface Props {
  options: Record<string, string[]>;
  defaultValue?: Record<string, string | string[]>;
  multiSelectKeys?: string[];
  onSelect: (value: Record<string, string | string[]>) => void;
}

const AvailableOptionsContent = ({
  options,
  defaultValue = {},
  multiSelectKeys = [],
  onSelect,
}: Props) => {
  const [selectedOptions, setSelectedOptions] =
    useState<Record<string, string | string[]>>(defaultValue);

  const handleToggle = (key: string, option: string) => {
    const prevValue = selectedOptions[key];
    let nextValue: string | string[];

    if (multiSelectKeys.includes(key)) {
      const list = Array.isArray(prevValue) ? prevValue : [];
      nextValue = list.includes(option)
        ? list.filter(o => o !== option)
        : [...list, option];
    } else {
      nextValue = option === prevValue ? "" : option;
    }

    const updated = { ...selectedOptions, [key]: nextValue };
    setSelectedOptions(updated);
    onSelect(
      Object.entries(updated).reduce(
        (acc, [key, value]) => {
          const isEmpty =
            value === "" || (Array.isArray(value) && value.length === 0);

          if (!isEmpty) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, string | string[]>,
      ),
    );
  };

  const isSelected = (key: string, option: string): boolean => {
    const value = selectedOptions[key];
    return Array.isArray(value) ? value.includes(option) : value === option;
  };

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
                key={option}
                className={`text-body1-med flex h-9 flex-1 cursor-pointer items-center justify-center rounded-[4px] border py-[10px] ${
                  isSelected(key, option)
                    ? "text-mint bg-mint-light border-mint"
                    : "border-gray-600 text-gray-800"
                }`}
                onClick={() => handleToggle(key, option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AvailableOptionsContent;
