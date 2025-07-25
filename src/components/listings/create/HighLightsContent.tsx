import { QUESTION_MAP } from "@/constants/question-map";

interface HighLightsContentProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const HighLightsContent = ({ value, onChange }: HighLightsContentProps) => {
  const highlightOptions = Array.from(
    new Set(
      Object.values(QUESTION_MAP).flatMap(category => {
        const highlightsItem = category.ListingDetails.find(
          (item): item is { id: string; label: string; options: string[] } =>
            item.id === "highlights" &&
            typeof item.label === "string" &&
            Array.isArray(item.options),
        );
        return highlightsItem ? highlightsItem.options : [];
      }),
    ),
  );

  const handleClick = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(o => o !== option));
    } else {
      if (value.length < 5) {
        onChange([...value, option]);
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 py-2 px-4">
      <div className="text-lab1-sb text-gray-700">5개 골라주세요</div>
      <div className="flex w-[343px] flex-wrap content-center items-center gap-3 self-stretch">
        {highlightOptions.map(option => {
          const isSelected = value.includes(option);
          return (
            <button
              key={option}
              type="button"
              className={`text-lab1-sb cursor-pointer rounded-[100px] border px-2 py-1 ${
                isSelected
                  ? "bg-mint-press border-transparent text-white"
                  : "border-gray-500 text-gray-600"
              }`}
              onClick={() => handleClick(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HighLightsContent;
