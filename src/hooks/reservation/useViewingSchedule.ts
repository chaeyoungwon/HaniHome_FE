import { useEffect, useState } from "react";

import { useViewingScheduleStore } from "@/stores/useViewingScheduleStore";
import {
  eachDayOfInterval,
  endOfMonth,
  isAfter,
  isBefore,
  startOfMonth,
} from "date-fns";

import { VIEWING_PERIOD } from "@/constants/mock/viewing-schedule-dummies";
import { TimeLabel } from "@/constants/time-options";

/**
 * 뷰잉 예약 일정 관리 훅
 * - 날짜/시간 선택 상태
 * - 사용된 일정 중복 확인
 * - 일정 추가/삭제/수정 로직 포함
 */
export const useViewingSchedules = (
  shownDate: Date,
  setShownDate: (date: Date) => void,
) => {
  const {
    activeId,
    getSchedules,
    getSelectedTimeLabels,
    getActiveIndex,
    setActiveIndex,
    setSchedules,
    setSelectedTimeLabels,
    push,
    remove,
  } = useViewingScheduleStore();

  const activeIndex = getActiveIndex();

  const [mode, setMode] = useState<"calendar" | "time" | null>("calendar");

  const schedules = activeId ? getSchedules() : [];
  const selectedTimeLabels = activeId ? getSelectedTimeLabels() : [];

  const selectedDates = schedules
    .filter((s): s is { date: Date; time: string } => s.date !== null)
    .map(s => s.date);

  const allowedStart = new Date(VIEWING_PERIOD.startDate);
  const allowedEnd = new Date(VIEWING_PERIOD.endDate);

  // 현재 인덱스 제외한 중복된 시간대
  const usedDateTimeSet = new Set(
    schedules
      .filter((_, i) => i !== activeIndex)
      .filter(s => s.date && s.time !== "NN : NN")
      .map(s => `${(s.date as Date).toDateString()}-${s.time}`),
  );

  // 캘린더에서 비활성화할 날짜 (범위 밖 + 같은 시간대 중복)
  const currentTime = schedules[activeIndex]?.time;
  const disabledByUsedTime = schedules
    .filter((_, i) => i !== activeIndex)
    .filter(s => s.date && s.time === currentTime && currentTime !== "NN : NN")
    .map(s => (s.date as Date).toDateString());

  const disabledDates = eachDayOfInterval({
    start: startOfMonth(shownDate),
    end: endOfMonth(shownDate),
  }).filter(date => {
    const isOutOfRange =
      isBefore(date, allowedStart) || isAfter(date, allowedEnd);

    const isTimeTaken = disabledByUsedTime.includes(date.toDateString());

    return isOutOfRange || isTimeTaken;
  });

  // 날짜나 시간 모두 입력되었는지 확인
  const isAllSchedulesFilled =
    schedules.length > 0 &&
    schedules.every(s => s.date !== null && s.time !== "NN : NN");

  const updateSchedule = (
    index: number,
    key: "date" | "time",
    value: Date | string,
  ) => {
    if (!activeId) return;
    const updated = schedules.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    setSchedules(activeId, updated);
  };

  const addSchedule = () => {
    if (!activeId || schedules.length >= 3) return;
    const newSchedules = [...schedules, { date: null, time: "NN : NN" }];
    const newLabels = [...selectedTimeLabels, "아침"];
    setSchedules(activeId, newSchedules);
    setSelectedTimeLabels(activeId, newLabels as TimeLabel[]);

    const newIndex = newSchedules.length - 1;
    setActiveIndex(newIndex);
    push(newIndex);
    setMode("calendar");
    setShownDate(new Date());
  };

  const removeSchedule = (index: number) => {
    if (!activeId) return;
    remove(index);
  };

  useEffect(() => {
    const selectedDate = schedules[activeIndex]?.date;
    setShownDate(selectedDate ?? new Date());
  }, [activeIndex, schedules, setShownDate]);

  return {
    schedules,
    selectedDates,
    selectedTimeLabels,
    activeIndex,
    mode,
    usedDateTimeSet,
    disabledDates,
    isAllSchedulesFilled,
    updateSchedule,
    addSchedule,
    removeSchedule,
    setActiveIndex,
    setMode,
    setSelectedTimeLabels: (id: string, labels: TimeLabel[]) =>
      activeId && setSelectedTimeLabels(id, labels),
  };
};
