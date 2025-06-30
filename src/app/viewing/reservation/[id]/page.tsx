"use client";

import { useParams, useRouter } from "next/navigation";

import { useEffect, useMemo } from "react";

import { useViewingScheduleStore } from "@/stores/useViewingScheduleStore";

import { useSingleDateCalendar } from "@/hooks/calendar/useSingleDateHandlers";
import { useViewingSchedules } from "@/hooks/reservation/useViewingSchedule";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";
import ScheduleInputList from "@/components/reservation/ScheduleInputList";
import SingleDateCalendar from "@/components/reservation/SingleDateCalendar";
import TimePicker from "@/components/reservation/TimePicker";

import { VIEWING_TIME_SLOTS } from "@/constants/mock/viewing-schedule-dummies";
import { TimeLabel } from "@/constants/time-options";

import PlusIcon from "@/public/svgs/reservation/plus-squared-icon.svg";

const ViewingReservationPage = () => {
  const { id } = useParams() as { id: string };
  const { moveMonthBy, shownDate, setShownDate } = useSingleDateCalendar();

  useEffect(() => {
    setActiveId(id);
  }, [id]);

  const {
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
    setSelectedTimeLabels,
  } = useViewingSchedules(shownDate, setShownDate);

  const { push, pop, reset, setActiveId } = useViewingScheduleStore();
  const correctedShownDate = useMemo(() => {
    return shownDate instanceof Date ? shownDate : new Date(shownDate);
  }, [shownDate]);

  const router = useRouter();
  const handleBack = () => {
    let prev = pop();
    while (prev !== undefined && prev >= schedules.length) {
      prev = pop();
    }
    if (prev !== undefined && prev !== activeIndex) {
      setActiveIndex(prev);
      setMode("time");
    } else {
      router.back();
    }
  };

  useEffect(() => {
    return () => {
      reset(); // 페이지 이탈 시 히스토리 초기화
    };
  }, []);

  return (
    <div className="pb-16">
      <BackHeader title="뷰잉 예약" onBackClick={handleBack} />

      <div className="flex flex-col justify-center gap-1 p-4">
        <h1 className="text-heading3 text-gray-900">
          원하는 뷰잉 날짜를 선택해주세요
        </h1>
        <span className="text-cap1-med text-gray-500">
          최대 3개까지 일정 신청이 가능하고, <br />
          가능한 가장 빠른 일정으로 예약이 자동 확정됩니다.
        </span>
      </div>

      <ScheduleInputList
        schedules={schedules}
        activeIndex={activeIndex}
        mode={mode}
        setMode={setMode}
        setActiveIndex={index => {
          setActiveIndex(index);
          push(index);
        }}
        removeSchedule={removeSchedule}
      />

      {schedules.length < 3 && (
        <div className="flex justify-center pb-3">
          <button
            type="button"
            onClick={addSchedule}
            className="bg-mint-contrast h-fit w-fit cursor-pointer rounded-full p-1"
          >
            <PlusIcon className="h-4.5 w-4.5 text-white" />
          </button>
        </div>
      )}

      {mode === "time" && (
        <TimePicker
          activeIndex={activeIndex}
          schedules={schedules}
          updateSchedule={updateSchedule}
          selectedLabel={selectedTimeLabels[activeIndex] ?? "아침"}
          setSelectedLabel={label =>
            setSelectedTimeLabels(
              id,
              selectedTimeLabels.map((l: TimeLabel, i: number) =>
                i === activeIndex ? label : l,
              ),
            )
          }
          usedDateTimeSet={usedDateTimeSet as Set<string>}
          viewingTimeSlots={VIEWING_TIME_SLOTS}
        />
      )}

      {mode === "calendar" && (
        <SingleDateCalendar
          activeIndex={activeIndex}
          schedules={schedules}
          updateSchedule={updateSchedule}
          selectedDates={selectedDates}
          moveMonthBy={moveMonthBy}
          shownDate={correctedShownDate}
          setShownDate={setShownDate}
          disabledDates={disabledDates}
        />
      )}

      <BottomActionBar
        label="뷰잉 예약하기"
        disabled={!isAllSchedulesFilled}
        onClick={() => router.push(`/viewing/reservation/${id}/confirm`)}
      />
    </div>
  );
};

export default ViewingReservationPage;
