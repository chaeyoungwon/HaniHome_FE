import { useEffect, useState } from "react";

import clsx from "clsx";

import { getTimeRange } from "@/utils/getTimeRange";

import { TIME_OPTIONS, TimeLabel } from "@/constants/time-options";

import AfternoonIcon from "@/public/svgs/reservation/afternoon-icon.svg";
import EveningIcon from "@/public/svgs/reservation/evening-icon.svg";
import MorningIcon from "@/public/svgs/reservation/morning-icon.svg";

const TimePicker = ({
  activeIndex,
  schedules,
  updateSchedule,
  selectedLabel,
  setSelectedLabel,
  usedDateTimeSet,
  viewingTimeSlots,
}: {
  activeIndex: number;
  schedules: { date: Date | null; time: string }[];
  updateSchedule: (index: number, key: "time", value: string) => void;
  selectedLabel: TimeLabel;
  setSelectedLabel: (label: TimeLabel) => void;
  usedDateTimeSet: Set<string>;
  viewingTimeSlots: {
    label: TimeLabel;
    start: string;
    end: string;
  }[];
}) => {
  const [tempLabel, setTempLabel] = useState<TimeLabel>("아침");

  useEffect(() => {
    setTempLabel(selectedLabel ?? "아침");
  }, [activeIndex, selectedLabel]);

  const handleSelectTime = (time: string) => {
    updateSchedule(activeIndex, "time", time);
    setSelectedLabel(tempLabel);
  };

  return (
    <div className="border-b border-gray-200 pb-12">
      {/* 상단 시간대 탭 */}
      <div className="px-4">
        <div className="flex items-center justify-center gap-10 border-y border-gray-200 px-[41.5px] py-3">
          {[
            { label: "아침", icon: MorningIcon },
            { label: "점심", icon: AfternoonIcon },
            { label: "저녁", icon: EveningIcon },
          ].map(({ label, icon: Icon }) => {
            const isActive = tempLabel === label;

            return (
              <button
                key={label}
                onClick={() => setTempLabel(label as TimeLabel)}
                className={clsx(
                  "text-body1-sb flex cursor-pointer items-center gap-2 rounded-full",
                  isActive ? "bg-green text-mint" : "text-gray-500",
                )}
              >
                <Icon
                  className={clsx("h-6 w-6 fill-current", {
                    "text-mint": isActive,
                    "text-gray-500": !isActive,
                  })}
                />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 시간 버튼 목록 */}
      <div className="grid grid-cols-3 gap-x-3 gap-y-2 px-[31.5px] pt-5">
        {TIME_OPTIONS[tempLabel].map(time => {
          const currentDate = schedules[activeIndex].date;

          const isAllowed = viewingTimeSlots.some(
            slot =>
              slot.label === tempLabel &&
              getTimeRange(slot.start, slot.end).includes(time),
          );

          const isUsed =
            currentDate instanceof Date &&
            usedDateTimeSet.has(`${currentDate.toDateString()}-${time}`);
          const isDisabled = !isAllowed || isUsed;

          return (
            <button
              key={time}
              disabled={!!isDisabled}
              onClick={() => handleSelectTime(time)}
              className={clsx(
                "text-body1-sb h-10 w-24 rounded border py-2 text-center",
                isDisabled
                  ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400"
                  : schedules[activeIndex].time === time
                    ? "bg-mint-light text-mint-contrast border-mint-contrast cursor-pointer"
                    : "border-mint-contrast cursor-pointer bg-white text-gray-700",
              )}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimePicker;
