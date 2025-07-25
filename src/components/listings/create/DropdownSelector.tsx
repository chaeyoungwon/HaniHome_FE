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
        className="flex h-19 w-[375px] items-start justify-between p-4"
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
            className={`h-[18px] w-[18px] cursor-pointer ${isOpen ? "rotate-180 text-gray-900" : "text-gray-500"}`}
          />
        </div>
      </div>
      {isOpen && <div className="animate-fadeIn">{children}</div>}
    </>
  );
};

export default DropdownSelector;
