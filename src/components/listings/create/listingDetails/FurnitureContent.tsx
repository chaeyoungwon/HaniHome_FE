import { furnitureIconMap } from "@/constants/furniture-lists";
import { CATEGORY_OPTIONS } from "@/constants/property-category";

interface FurnitureContentProps {
  value: number[];
  onChange: (value: number[]) => void;
}

const FurnitureContent = ({ value, onChange }: FurnitureContentProps) => {
  const furnitureItems = CATEGORY_OPTIONS[2].items;

  const handleClick = (optionId: number) => {
    const newSelected = value.includes(optionId)
      ? value.filter(id => id !== optionId)
      : [...value, optionId];
    onChange(newSelected);
  };

  return (
    <div className="mb-15">
      {Object.entries(furnitureItems).map(([category, items]) => (
        <div key={category} className="flex flex-col gap-3 px-5 py-4">
          <div className="text-body1-sb text-gray-800">{category}</div>
          <ul className="scrollbar-hide flex max-w-[335px] gap-1 overflow-x-auto">
            {items.map(({ optionId, label }) => {
              const Icon = furnitureIconMap[label];
              const isSelected = value.includes(optionId);
              return (
                <li
                  key={optionId}
                  className="flex h-14 w-14 shrink-0 cursor-pointer flex-col items-center justify-center gap-1"
                  onClick={() => handleClick(optionId)}
                >
                  {Icon && (
                    <Icon
                      className={`${isSelected ? "text-mint-contrast" : "text-gray-600"}`}
                    />
                  )}
                  <span
                    className={`text-cap1-med ${isSelected ? "text-mint-contrast" : "text-gray-600"}`}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FurnitureContent;
