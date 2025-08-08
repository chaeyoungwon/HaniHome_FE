"use client";

import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { useViewingScheduleStore } from "@/stores/useViewingScheduleStore";

import { useSingleDateCalendar } from "@/hooks/calendar/useSingleDateHandlers";
import { useViewingReservation } from "@/hooks/reservation/useConfirmSchedule";
import { useMyViewingDates } from "@/hooks/viewing/useViewingApi";

import BottomActionBar from "@/components/common/BottomActionBar";
import ScheduleInputList from "@/components/reservation/ScheduleInputList";
import SingleDateCalendar from "@/components/reservation/SingleDateCalendar";
import TimePicker from "@/components/reservation/TimePicker";

const BackHeader = dynamic(
  () => import("@/components/layout/header/BackHeader"),
  { ssr: false },
);

const ViewingReservationPage = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const { moveMonthBy, shownDate, setShownDate } = useSingleDateCalendar();

  const {
    init,
    getSchedule,
    setSchedule,
    getSelectedTimeLabel,
    setSelectedTimeLabel,
  } = useViewingScheduleStore();

  const [mode, setMode] = useState<"calendar" | "time">("calendar");

  useEffect(() => {
    init(id);
  }, [id]);

  const schedule = getSchedule(id);
  const selectedTimeLabel = getSelectedTimeLabel(id);

  const { data: myViewingDatesData } = useMyViewingDates("REQUESTED");

  const {
    getTimeLabelByTime,
    disabledDates,
    usedDateTimeSet,
    isDisabledTime,
    isDisabledTimeWithoutDate,
  } = useViewingReservation({
    propertyId: Number(id),
    shownDate,
    selectedTime: schedule.time,
    selectedDate: schedule.date,
    currentId: id,
    myViewingDatesData,
  });

  const updateSchedule = (key: "date" | "time", value: Date | string) => {
    setSchedule(id, { ...schedule, [key]: value });
  };

  const isAllFilled = !!schedule.date && schedule.time !== "NN : NN";

  return (
    <div className="pb-16">
      <BackHeader title="뷰잉 예약" onBackClick={() => router.back()} />

      <div className="flex flex-col justify-center gap-1 p-4">
        <h1 className="text-heading3 text-gray-900">
          원하는 뷰잉 일정을 선택해주세요
        </h1>
        <span className="text-cap1-med text-gray-500">
          날짜 또는 시간부터 선택할 수 있어요. <br />
          중복 예약되었거나 호스트가 설정하지 않은 일정은 선택할 수 없어요.
        </span>
      </div>

      <ScheduleInputList
        schedules={[schedule]}
        activeIndex={0}
        mode={mode}
        setMode={setMode}
        setActiveIndex={() => {}}
      />

      {mode === "calendar" && (
        <SingleDateCalendar
          selectedDate={schedule.date}
          onSelectDate={date => updateSchedule("date", date)}
          moveMonthBy={moveMonthBy}
          shownDate={shownDate}
          setShownDate={setShownDate}
          disabledDates={disabledDates}
        />
      )}

      {mode === "time" && (
        <TimePicker
          selectedDate={schedule.date}
          selectedTime={schedule.time}
          setSelectedTime={time => {
            updateSchedule("time", time);
            const label = getTimeLabelByTime(time);
            setSelectedTimeLabel(id, label);
            setMode("calendar");
          }}
          selectedLabel={selectedTimeLabel}
          setSelectedLabel={label => setSelectedTimeLabel(id, label)}
          usedDateTimeSet={usedDateTimeSet}
          isDisabledTime={isDisabledTime}
          isDisabledTimeWithoutDate={isDisabledTimeWithoutDate}
        />
      )}

      <BottomActionBar
        label="다음"
        disabled={!isAllFilled}
        onClick={() => router.push(`/viewing/reservation/${id}/confirm`)}
      />
    </div>
  );
};

export default ViewingReservationPage;
