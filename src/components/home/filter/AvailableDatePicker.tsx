"use client";

import { useEffect, useMemo, useState } from "react";

import { format } from "date-fns";

import CheckIcon from "@/components/common/CheckIcon";
import Calendar from "@/components/common/calendar/Calendar";

type Range = {
  startDate: Date;
  endDate: Date;
  key: string;
};

interface AvailableDatePickerProps {
  availableFrom: string | null;
  availableTo: string | null;
  immediate: boolean | null;
  negotiable: boolean | null;
  onDateChange: (from: string, to: string) => void;
  onImmediateToggle: () => void;
  onNegotiableToggle: () => void;
}

const toStartOfDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

const AvailableDatePicker = ({
  availableFrom,
  availableTo,
  immediate,
  negotiable,
  onDateChange,
  onImmediateToggle,
  onNegotiableToggle,
}: AvailableDatePickerProps) => {
  const [focusedRange, setFocusedRange] = useState<[number, number]>([0, 0]);
  const [currentMonth, setCurrentMonth] = useState<Date | null>(null);
  const [range, setRange] = useState<Range[] | null>(null);
  const [, setIsWheelOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    const fromDate = availableFrom ? new Date(availableFrom) : today;
    const toDate = availableTo ? new Date(availableTo) : today;

    setCurrentMonth(fromDate);
    setRange([
      {
        startDate: toStartOfDay(fromDate),
        endDate: toStartOfDay(toDate),
        key: "selection",
      },
    ]);
  }, [availableFrom, availableTo]);

  const isSingleSelection = useMemo(() => {
    if (!range) return true;
    const { startDate, endDate } = range[0];
    return startDate.toDateString() === endDate.toDateString();
  }, [range]);

  const handleRangeChange = (newRange: Range[]) => {
    const { startDate, endDate } = newRange[0];
    const start = toStartOfDay(startDate);
    const end = toStartOfDay(endDate);

    setRange([
      {
        startDate: start,
        endDate: end,
        key: "selection",
      },
    ]);

    onDateChange(
      format(start, "yyyy-MM-dd'T'00:00:00"),
      format(end, "yyyy-MM-dd'T'00:00:00"),
    );
  };

  if (!range || !currentMonth) return null;

  return (
    <>
      <Calendar
        range={range}
        focusedRange={focusedRange}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        isSingleSelection={isSingleSelection}
        onRangeChange={handleRangeChange}
        onFocusChange={setFocusedRange}
        onShownDateChange={setCurrentMonth}
        onOpenWheel={() => setTimeout(() => setIsWheelOpen(true), 0)}
        onCloseWheel={() => setTimeout(() => setIsWheelOpen(false), 0)}
      />

      <div className="mt-[6px] flex flex-col gap-2 px-4 py-3">
        <div
          className="text-cap1-med flex cursor-pointer items-center gap-1 text-gray-700"
          onClick={onImmediateToggle}
        >
          <CheckIcon checked={immediate || false} />
          즉시 입주 가능
        </div>

        <div
          className="text-cap1-med flex cursor-pointer items-center gap-1 text-gray-700"
          onClick={onNegotiableToggle}
        >
          <CheckIcon checked={negotiable || false} />
          입주 일자 협의 가능
        </div>
      </div>
    </>
  );
};

export default AvailableDatePicker;
