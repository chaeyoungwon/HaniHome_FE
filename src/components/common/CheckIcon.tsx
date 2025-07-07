"use client";

import EmptyCheck from "@/public/svgs/common/empty-check.svg";
import FilledCheck from "@/public/svgs/common/filled-check.svg";

interface CheckIconProps {
  checked: boolean;
}

const CheckIcon = ({ checked }: CheckIconProps) => {
  return (
    <div className="relative h-[18px] w-[18px]">
      <EmptyCheck
        className={`absolute inset-0 transition-opacity duration-150 ${
          checked ? "opacity-0" : "opacity-100"
        }`}
      />
      <FilledCheck
        className={`absolute inset-0 transition-opacity duration-150 ${
          checked ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default CheckIcon;
