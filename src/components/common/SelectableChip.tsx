"use client";

import clsx from "clsx";

interface SelectableChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const SelectableChip = ({
  label,
  selected,
  onClick,
  disabled = false,
}: SelectableChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "text-lab1-sb cursor-pointer rounded-[100px] border px-[7px] py-[3px] transition-all",
        disabled
          ? "cursor-not-allowed border-gray-200 text-gray-300"
          : selected
            ? "bg-mint-press text-gray-0 border-mint-press"
            : "hover:bg-mint-press hover:border-mint-press hover:text-gray-0 border-gray-500 bg-white text-gray-600",
      )}
    >
      {label}
    </button>
  );
};

export default SelectableChip;
