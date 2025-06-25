import { useRef } from "react";

import { useClickOutside } from "@/hooks/common/useClickOutside";

import Divider from "@/components/common/Divider";

interface DropDownMenuProps {
  onSelect: (order: "latest" | "popular") => void;
  onClose: () => void;
}
const DropDownMenu = ({ onSelect, onClose }: DropDownMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose);
  return (
    <div
      ref={ref}
      className="text-lab1-sb h-[86px] w-[70px] rounded border border-gray-300 bg-white px-4 py-3 text-gray-800"
    >
      <div className="flex flex-col gap-[8px]">
        <button
          className="cursor-pointer pb-1"
          onClick={() => onSelect("latest")}
        >
          최신순
        </button>
        <Divider />
        <button
          className="cursor-pointer pt-1"
          onClick={() => onSelect("popular")}
        >
          인기순
        </button>
      </div>
    </div>
  );
};
export default DropDownMenu;
