import { CATEGORY_OPTIONS } from "@/constants/propertyCategory";

import { OptionItem } from "@/types/property";

const ADDITIONAL_ITEMS = CATEGORY_OPTIONS[3].items;

const LABEL_PREFIX: Record<keyof typeof ADDITIONAL_ITEMS, string> = {
  주방: "주방 사용",
  "외부인 방문": "외부인 방문",
  흡연자: "흡연자",
  반려동물: "반려동물",
  주차: "주차",
};

const ExtraConditions = ({ data }: { data: OptionItem[] }) => {
  const tags: string[] = [];

  Object.entries(ADDITIONAL_ITEMS).forEach(([category, items]) => {
    const matched = data.find(option =>
      items.some(i => i.optionId === option.optionItemId),
    );
    if (!matched) return;

    const prefix = LABEL_PREFIX[category as keyof typeof LABEL_PREFIX];
    const suffix = matched.itemName;
    tags.push(`${prefix} ${suffix}`);
  });

  return (
    <div className="grid w-full grid-cols-2 gap-2">
      {tags.map((tag, idx) => (
        <div
          key={idx}
          className="text-body2-med flex items-center justify-center rounded bg-gray-200 py-[7.5px] text-gray-700"
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default ExtraConditions;
