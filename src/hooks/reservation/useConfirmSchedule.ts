import { useEffect, useState } from "react";

import { useViewingScheduleStore } from "@/stores/useViewingScheduleStore";
import { format } from "date-fns";

import { normalizeTime } from "@/utils/time";

import { ValidSchedule } from "@/types/schedule";

// 임시로 겹치는 일정 (mock 데이터)
// 실제로는 서버에서 받아오는 구조로 대체될 예정
const mockedOverlappingTimes = [
  { date: "2025-06-19", time: "06:30" },
  { date: "2025-06-30", time: "14:00" },
];

// 해당 날짜/시간이 겹치는 일정인지 여부 확인
const isOverlapping = (date: Date, time: string) => {
  const formatted = format(date, "yyyy-MM-dd");
  const normalized = normalizeTime(time);
  return mockedOverlappingTimes.some(
    o => o.date === formatted && o.time === normalized,
  );
};

// 뷰잉 예약 확정 페이지에서 사용될 일정 필터링 훅
export const useConfirmSchedules = (id: string) => {
  const { setActiveId, getSchedules } = useViewingScheduleStore();
  const [selectedSchedule, setSelectedSchedule] = useState<{
    date: Date;
    time: string;
  } | null>(null);

  // 현재 보고 있는 매물 ID 설정
  useEffect(() => {
    setActiveId(id);
  }, [id, setActiveId]);

  // 유효한 일정만 필터링 ("NN : NN" 제외)
  const rawSchedules = getSchedules().filter(
    (s): s is ValidSchedule => s.date !== null && s.time !== "NN : NN",
  );

  // 일정 정렬 (가장 빠른 시간 순으로)
  const sorted = rawSchedules.sort((a, b) => {
    const dateA = new Date(
      `${a.date!.toISOString().split("T")[0]}T${a.time}:00`,
    );
    const dateB = new Date(
      `${b.date!.toISOString().split("T")[0]}T${b.time}:00`,
    );
    return dateA.getTime() - dateB.getTime();
  });

  // 중복되지 않는 가장 빠른 일정
  const firstValid = sorted.find(s => !isOverlapping(s.date!, s.time));

  // 변경 가능한 나머지 일정 (중복되지 않고, 선택된 일정과는 다른)
  const valid = sorted.filter(
    s =>
      !isOverlapping(s.date, s.time) &&
      (selectedSchedule == null ||
        s.date.getTime() !== selectedSchedule.date.getTime() ||
        s.time !== selectedSchedule.time),
  );
  // 중복된 일정 리스트
  const overlaps = sorted.filter(s => isOverlapping(s.date!, s.time));

  // 초기 선택 일정 설정
  useEffect(() => {
    if (firstValid) setSelectedSchedule(firstValid);
  }, [firstValid]);

  return {
    selectedSchedule, // 선택된 일정
    changeableSchedules: valid, // 변경 가능한 일정들
    overlappingSchedules: overlaps, // 겹치는 일정들
    handleSelectSchedule: setSelectedSchedule, // 일정 선택 핸들러
  };
};
