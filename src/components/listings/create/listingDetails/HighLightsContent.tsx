import { CATEGORY_OPTIONS } from "@/constants/property-category";

interface HighLightsContentProps {
  value: number[];
  onChange: (value: number[]) => void;
}

const HighLightsContent = ({ value, onChange }: HighLightsContentProps) => {
  const highlightOptions = CATEGORY_OPTIONS[1].items;
  const handleClick = (optionId: number) => {
    if (value.includes(optionId)) {
      onChange(value.filter(id => id !== optionId));
    } else {
      if (value.length < 5) {
        onChange([...value, optionId]);
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 px-4 py-2">
      <div className="text-lab1-sb text-gray-700">5개 골라주세요</div>
      <div className="flex w-full max-w-[398px] flex-wrap content-center items-center gap-3 self-stretch">
        {highlightOptions.map(({ optionId, label }) => {
          const isSelected = value.includes(optionId);
          return (
            <button
              key={optionId}
              type="button"
              className={`text-lab1-sb cursor-pointer rounded-[100px] border px-2 py-1 ${
                isSelected
                  ? "bg-mint-press border-transparent text-white"
                  : "border-gray-500 text-gray-600"
              }`}
              onClick={() => handleClick(optionId)}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HighLightsContent;
