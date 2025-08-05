import { useEffect, useState } from "react";

import { calculateNewRange } from "@/utils/calendar/calculateNewRange";

import { CalendarProps } from "@/types/calendar.type";

export const useCalendarHandlers = ({
  range,
  focusedRange,
  onRangeChange,
  onFocusChange,
  onShownDateChange,
  onOpenWheel,
  onCloseWheel,
}: Omit<CalendarProps, "currentMonth" | "setCurrentMonth">) => {
  const [tempDate, setTempDate] = useState(new Date());
  const [showWheel, setShowWheel] = useState(false);

  // 날짜 focus 변경
  const handleDateClick = (targetIndex: 0 | 1) => {
    onFocusChange([0, targetIndex]);
    const selectedDate =
      targetIndex === 0 ? range[0].startDate : range[0].endDate;
    setTempDate(selectedDate);
  };

  // 상단 날짜 클릭 시 Wheel toggle
  const toggleShowWheel = () => {
    setShowWheel(prev => {
      const next = !prev;
      next ? onOpenWheel?.() : setTimeout(() => onCloseWheel?.(), 0);
      return next;
    });
  };

  const moveMonthBy = (offset: number) => {
    const newDate = new Date(tempDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setTempDate(newDate);
    onShownDateChange?.(newDate);
  };

  const handleWheelChange = (date: Date) => {
    setTempDate(date);
    const newRange = calculateNewRange(date, range[0], focusedRange[1]);
    onRangeChange?.([newRange]);
    onShownDateChange?.(date);
  };

  const handleWheelClose = () => {
    setShowWheel(false);
    setTimeout(() => onCloseWheel?.(), 0);
  };

  useEffect(() => {
    const firstRange = range[0];
    if (!firstRange) return;

    const selected =
      focusedRange[1] === 0
        ? (firstRange.startDate ?? new Date())
        : (firstRange.endDate ?? new Date());

    setTempDate(selected);
  }, [focusedRange, range]);

  return {
    tempDate,
    showWheel,
    handleDateClick,
    toggleShowWheel,
    moveMonthBy,
    handleWheelChange,
    handleWheelClose,
  };
};
