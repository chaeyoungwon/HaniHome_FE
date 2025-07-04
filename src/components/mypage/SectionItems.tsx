"use client";

import { SectionItem } from "@/types/mypageSection";

import Arrow from "@/public/svgs/common/left-arrow.svg";

interface SectionProps {
  label: string;
  items: SectionItem[];
}

const Section = ({ label, items }: SectionProps) => {
  return (
    <div className={`px-5 ${label === "나의 활동" ? "py-3" : "py-4"}`}>
      <div className="text-heading3 mb-2 text-gray-800">{label}</div>
      {items.map(({ label, onClick, color }) => (
        <div
          key={label}
          className="flex h-[46px] cursor-pointer items-center justify-between py-3"
          onClick={onClick}
        >
          <div
            className={`text-body1-med ${
              color === "danger" ? "text-red" : "text-gray-700"
            }`}
          >
            {label}
          </div>
          <Arrow
            className={`h-[18px] w-[18px] rotate-180 ${
              color === "danger" ? "text-red" : "text-gray-700"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default Section;
