"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/useAuthStore";
import { useFilterStore } from "@/stores/useFilterStore";
import { useLoginModalStore } from "@/stores/useLoginModalStore";

import EditIcon from "@/public/svgs/home/filter-icon.svg";

import FilterChip from "./FilterChip";

const filters = [
  "매물종류",
  "매물유형",
  "예산범위",
  "입주 가능일",
  "지하철 역",
];

const FilterBar = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { openModal } = useLoginModalStore();
  const selectedFilters = useFilterStore(state => state.selectedFilters);

  const handleClick = () => {
    if (!isLoggedIn) {
      openModal();
    } else {
      router.push("/home/filter");
    }
  };

  return (
    <div className="mb-3 flex w-full items-center gap-3 py-2">
      <div className="scrollbar-hide flex max-w-[329px] gap-1 overflow-x-auto pl-4">
        {filters.map(filter => (
          <FilterChip
            key={filter}
            text={filter}
            isSelected={selectedFilters.includes(filter)}
            onClick={handleClick}
          />
        ))}
      </div>

      <EditIcon className="cursor-pointer" onClick={handleClick} />
    </div>
  );
};

export default FilterBar;
