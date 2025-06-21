import { useState } from "react";

export const useSingleDateCalendar = (initialDate: Date = new Date()) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [shownDate, setShownDate] = useState(initialDate);

  const moveMonthBy = (offset: number) => {
    setShownDate(prev => {
      const prevDate = new Date(prev);
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + offset);
      return newDate;
    });
  };
  return {
    selectedDate,
    setSelectedDate,
    shownDate,
    setShownDate,
    moveMonthBy,
  };
};
