import React from "react";

import { CATEGORY_OPTIONS } from "@/constants/property-category";

import { OptionItem } from "@/types/property";

const advantageItems = CATEGORY_OPTIONS[1].items;

const ADVANTAGE_OPTIONID_MAP = Object.fromEntries(
  advantageItems.map(({ optionId, label }) => [optionId, label]),
);

const BadgeList = ({ badgeText }: { badgeText: OptionItem[] }) => {
  const mappedTexts = badgeText
    .map(item => ADVANTAGE_OPTIONID_MAP[item.optionItemId])
    .filter(Boolean);

  return (
    <div className="flex flex-wrap gap-2">
      {mappedTexts.map((text, index) => (
        <div
          key={index}
          className="text-body2-med w-fit rounded-[100px] border border-gray-300 bg-white px-[10px] py-1 break-words whitespace-normal text-gray-700"
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default BadgeList;
