"use client";

import { useEffect, useRef, useState } from "react";

import clsx from "clsx";

import DropdownArrow from "@/public/svgs/signup/down-arrow.svg";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownFieldProps {
  label?: string;
  value: string;
  placeholder?: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
}

const DropdownField = ({
  label,
  value: selectedValue,
  placeholder = "선택해주세요",
  options,
  onChange,
}: DropdownFieldProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation();
    onChange(optionValue);
    setIsDropdownOpen(false);
  };

  const selectedLabel =
    options.find(opt => opt.value === selectedValue)?.label ?? placeholder;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={clsx("flex flex-col gap-2", label ? "py-4" : "py-0")}>
      {label && <span className="text-body1-sb text-gray-800">{label}</span>}

      <div
        ref={dropdownRef}
        className={clsx(
          "relative box-border w-full rounded-sm border px-4",
          isDropdownOpen ? "pt-[11px] pb-[3px]" : "py-[9px]",
          isDropdownOpen || selectedValue
            ? "border-gray-600"
            : "border-gray-400",
        )}
        onClick={() => setIsDropdownOpen(prev => !prev)}
      >
        <div className="flex cursor-pointer items-center justify-between">
          <span
            className={clsx(
              "text-body1-med",
              !selectedValue &&
                (isDropdownOpen ? "text-gray-900" : "text-gray-500"),
            )}
          >
            {selectedLabel}
          </span>
          <DropdownArrow
            width={24}
            height={24}
            className={clsx(
              isDropdownOpen && "rotate-180",
              isDropdownOpen || selectedValue
                ? "text-gray-600"
                : "text-gray-400",
            )}
          />
        </div>

        {isDropdownOpen && (
          <ul className="mt-2 flex flex-col">
            {options.map(opt => (
              <li
                key={opt.value}
                onClick={e => handleSelect(e, opt.value)}
                className="text-body1-med cursor-pointer py-2"
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownField;
