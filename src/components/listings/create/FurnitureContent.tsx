import { furnitureIconMap } from "@/constants/furniture-lists";
import { QUESTION_MAP } from "@/constants/question-map";

interface FurnitureContentProps {
  value: string[];
  onChange: (value: string[]) => void;
}

function getFurnitureOptions() {
  for (const category of Object.values(QUESTION_MAP)) {
    const item = category.ListingDetails.find(
      detail => detail.id === "furniture",
    );
    if (
      item &&
      typeof item.options === "object" &&
      !Array.isArray(item.options)
    ) {
      return item.options;
    }
  }
  return null;
}

const FurnitureContent = ({ value, onChange }: FurnitureContentProps) => {
  const furnitureOptions = getFurnitureOptions();

  const selectedItems = value || [];

  const handleClick = (item: string) => {
    const newSelected = selectedItems.includes(item)
      ? selectedItems.filter(v => v !== item)
      : [...selectedItems, item];
    onChange(newSelected);
  };
  console.log("selectedItems:", selectedItems);
  if (!furnitureOptions) return null;
  return (
    <div className="mb-15">
      {Object.entries(furnitureOptions).map(([category, items]) => (
        <div key={category} className="flex flex-col gap-3 px-5 py-4">
          <div className="text-body1-sb text-gray-800">{category}</div>
          <ul className="scrollbar-hide flex max-w-[335px] gap-1 overflow-x-auto">
            {items.map(item => {
              const Icon = furnitureIconMap[item];
              const isSelected = selectedItems.includes(item);
              return (
                <li
                  key={item}
                  className="flex h-14 w-14 shrink-0 cursor-pointer flex-col items-center justify-center gap-1"
                  onClick={() => handleClick(item)}
                >
                  {Icon && (
                    <Icon
                      className={`${isSelected ? "text-mint-contrast" : "text-gray-600"}`}
                    />
                  )}
                  <span
                    className={`text-cap1-med ${isSelected ? "text-mint-contrast" : "text-gray-600"}`}
                  >
                    {item}
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
