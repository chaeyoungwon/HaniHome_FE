import { useRef } from "react";

import { useClickOutside } from "@/hooks/common/useClickOutside";

import Divider from "@/components/common/Divider";

import { WishListSortType } from "@/types/wishlist";

interface DropDownMenuProps {
  onSelect: (order: WishListSortType) => void;
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
        <button className="cursor-pointer" onClick={() => onSelect("latest")}>
          최신순
        </button>
        <Divider className="my-1" />
        <button className="cursor-pointer" onClick={() => onSelect("popular")}>
          인기순
        </button>
      </div>
    </div>
  );
};
export default DropDownMenu;
