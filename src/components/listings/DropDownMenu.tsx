import { useState } from "react";

import DownArrow from "@/public/svgs/signup/down-arrow.svg";

const TABS = [
  { label: "거래 중", key: "active" },
  { label: "거래 완료", key: "completed" },
] as const;

interface DropDownMenuProps {
  selectedKey: TradeStatus;
  onSelect: (key: TradeStatus) => void;
}

type TradeStatus = (typeof TABS)[number]["key"];

const DropDownMenu = ({ selectedKey, onSelect }: DropDownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedTab = TABS.find(tab => tab.key === selectedKey);
  const unselectedTabs = TABS.filter(tab => tab.key !== selectedKey);

  const handleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (key: TradeStatus) => {
    onSelect(key);
    setIsOpen(false);
  };

  return (
    <div className="text-body1-med relative mx-4 w-[109px]">
      <div
        className={`rounded-[4px] border bg-white text-gray-800 ${
          selectedKey === "active" ? "border-gray-400" : "border-gray-600"
        }`}
      >
        <div
          onClick={handleDropdown}
          className="flex h-[36px] cursor-pointer items-center justify-between px-3"
        >
          <span>{selectedTab?.label}</span>
          <DownArrow
            className={`h-[18px] w-[18px] ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
        {/* 열림 상태 */}
        {isOpen && (
          <div className="absolute top-0 left-0 z-10 flex w-full flex-col gap-2 rounded-[4px] border border-gray-600 bg-white py-[6px]">
            <div
              className="flex cursor-pointer items-center justify-between px-3 text-gray-800"
              onClick={handleDropdown}
            >
              {selectedTab?.label}
              <DownArrow className="h-[18px] w-[18px] rotate-180" />
            </div>

            {unselectedTabs.map(tab => (
              <div
                key={tab.key}
                onClick={() => handleSelect(tab.key)}
                className="hover:text-mint cursor-pointer px-3 text-gray-800"
              >
                {tab.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default DropDownMenu;
