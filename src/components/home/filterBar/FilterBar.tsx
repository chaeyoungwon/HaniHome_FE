"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/useAuthStore";
import { useFilterStore } from "@/stores/useFilterStore";
import { useLoginModalStore } from "@/stores/useLoginModalStore";
import dayjs from "dayjs";

import EditIcon from "@/public/svgs/home/filter-icon.svg";

import FilterChip from "./FilterChip";

const FilterBar = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { openModal } = useLoginModalStore();
  const {
    selectedTypes,
    selectedRoomTypes,
    minWeeklyCost,
    maxWeeklyCost,
    availableFrom,
    availableTo,
    selectedMetroStop,
    radiusKm,
  } = useFilterStore();

  const handleClick = () => {
    if (!isLoggedIn) {
      openModal();
    } else {
      router.push("/home/filter");
    }
  };

  const filterData = [
    {
      label: "매물종류",
      value:
        isLoggedIn && selectedTypes.length ? selectedTypes.join(" · ") : null,
    },
    {
      label: "매물유형",
      value:
        isLoggedIn && selectedRoomTypes.length
          ? selectedRoomTypes.slice(0, 3).join(" · ") +
            (selectedRoomTypes.length > 3 ? " ·· " : "")
          : null,
    },
    {
      label: "예산범위",
      value:
        isLoggedIn && (minWeeklyCost !== null || maxWeeklyCost !== null)
          ? `$/주 ${minWeeklyCost ?? "0"} - ${maxWeeklyCost ?? "무제한"}`
          : null,
    },
    {
      label: "입주 가능일",
      value:
        isLoggedIn && availableFrom && availableTo
          ? `${dayjs(availableFrom).format("YY.MM.DD")} ~ ${dayjs(availableTo).format("YY.MM.DD")}`
          : null,
    },
    {
      label: "지하철 역",
      value:
        isLoggedIn && selectedMetroStop && selectedMetroStop.name
          ? selectedMetroStop.name.length > 8
            ? `${selectedMetroStop.name.slice(0, 8)}··`
            : selectedMetroStop.name
          : null,
    },
    {
      label: "거리",
      value:
        isLoggedIn && radiusKm && selectedMetroStop
          ? `역에서 ${radiusKm}km 이내`
          : null,
    },
  ];

  const selected = filterData.filter(item => item.value);
  const unselected = filterData.filter(item => !item.value);

  const sortedFilters = [...selected, ...unselected];

  return (
    <div className="mb-3 flex w-full items-center gap-3 py-2">
      <div className="scrollbar-hide flex w-[calc(100%-46px)] max-w-[384px] gap-1 overflow-x-auto pl-4">
        {sortedFilters.map(({ label, value }) => (
          <FilterChip
            key={label}
            text={value ?? label}
            isSelected={!!value}
            onClick={handleClick}
          />
        ))}
      </div>

      <EditIcon className="cursor-pointer" onClick={handleClick} />
    </div>
  );
};

export default FilterBar;
