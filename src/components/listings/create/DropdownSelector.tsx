import clsx from "clsx";

import DownArrow from "@/public/svgs/common/down-arrow.svg";

interface DropdownSelectorProps {
  label: string;
  answer?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const DropdownSelector = ({
  label,
  answer,
  children,
  isOpen,
  onClick,
}: DropdownSelectorProps) => {
  return (
    <>
      <div
        className={clsx(
          "flex h-19 w-[375px] cursor-pointer items-start justify-between p-4",
          isOpen && "mb-1",
        )}
        onClick={onClick}
      >
        <div className="flex flex-col gap-1">
          <div
            className={`text-heading3 ${isOpen ? "text-gray-900" : "text-gray-500"}`}
          >
            {label}
          </div>
          <div className="text-cap1-med text-gray-400">
            {answer || "답변 내용"}
          </div>
        </div>
        <div>
          <DownArrow
            className={`h-6 w-6 cursor-pointer ${isOpen ? "rotate-180 text-gray-900" : "text-gray-500"}`}
          />
        </div>
      </div>
      {isOpen && <div className="animate-fadeIn">{children}</div>}
    </>
  );
};

export default DropdownSelector;
