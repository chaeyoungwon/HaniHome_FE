import { useEffect, useRef, useState } from "react";

import { useWheelSnap } from "@/hooks/calendar/useWheelSnap";

import { getSafeDate } from "@/utils/calendar/getSafeDate";

import WheelColumn from "./WheelColumn";

interface WheelSelectorProps {
  value: Date;
  onChange: (newDate: Date) => void;
  onClose: () => void;
}

const BASE_YEARS = Array.from({ length: 11 }, (_, i) => 2020 + i);
const BASE_MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const PADDED = ["", ""];
const YEARS = [...PADDED, ...BASE_YEARS, ...PADDED];
const MONTHS = [...PADDED, ...BASE_MONTHS, ...PADDED];

const WheelSelector = ({ value, onChange }: WheelSelectorProps) => {
  const [year, setYear] = useState(value.getFullYear());
  const [month, setMonth] = useState(value.getMonth() + 1);

  const yearRef = useRef<HTMLDivElement>(null!);
  const monthRef = useRef<HTMLDivElement>(null!);
  const yearTimer = useRef<NodeJS.Timeout | null>(null);
  const monthTimer = useRef<NodeJS.Timeout | null>(null);

  const yearSnap = useWheelSnap({
    ref: yearRef,
    items: YEARS,
    selectedYear: year,
    selectedMonth: month,
    type: "year",
    value,
    onSelect: setYear,
    onChange,
  });

  const monthSnap = useWheelSnap({
    ref: monthRef,
    items: MONTHS,
    selectedYear: year,
    selectedMonth: month,
    type: "month",
    value,
    onSelect: setMonth,
    onChange,
  });

  const handleClick = (type: "year" | "month", val: number) => {
    const newYear = type === "year" ? val : year;
    const newMonth = type === "month" ? val - 1 : month - 1;
    const newDate = getSafeDate(newYear, newMonth, value.getDate());
    if (type === "year") setYear(val);
    else setMonth(val);
    onChange(newDate);
  };

  const debounceScroll = (
    timerRef: React.MutableRefObject<NodeJS.Timeout | null>,
    callback: () => void,
  ) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(callback, 100);
  };

  useEffect(() => {
    yearSnap.scrollToIndex(year);
    monthSnap.scrollToIndex(month);
  }, [year, month]);

  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="relative mx-auto flex justify-center">
        <div className="bg-gradient-upper-overlay pointer-events-none absolute top-0 left-0 z-10 h-[50px] w-full bg-white" />
        <div className="bg-gradient-bottom-overlay pointer-events-none absolute bottom-0 left-0 z-10 h-[50px] w-full bg-white" />
        {/* 연도 선택 */}
        <div className="relative flex h-[250px] w-[190px] items-center gap-3 text-center">
          <WheelColumn
            ref={yearRef}
            items={YEARS}
            selected={year}
            onClick={val => handleClick("year", val)}
            debounceScroll={() => debounceScroll(yearTimer, yearSnap.snap)}
            type="year"
            containerClassName="w-[106px]"
            scrollClassName="pl-[34px] w-[106px]"
            overlayClassName="mr-2"
          />
          {/* 연도 기준 중앙선 */}
          <div className="border-mint-contrast pointer-events-none absolute top-1/2 left-[34px] z-20 h-[50px] w-[72px] -translate-y-1/2 border-y" />

          <WheelColumn
            ref={monthRef}
            items={MONTHS}
            selected={month}
            onClick={val => handleClick("month", val)}
            debounceScroll={() => debounceScroll(monthTimer, monthSnap.snap)}
            type="month"
            containerClassName="w-[72px]"
          />
          {/* 월 기준 중앙선 */}
          <div className="border-mint-contrast pointer-events-none absolute top-1/2 left-[118px] z-20 h-[50px] w-[72px] -translate-y-1/2 border-y" />
        </div>
      </div>
    </div>
  );
};

export default WheelSelector;
