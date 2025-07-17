import { useEffect, useState } from "react";

import clsx from "clsx";
import dayjs from "dayjs";

import { TIME_OPTIONS, TimeLabel } from "@/constants/time-options";

import AfternoonIcon from "@/public/svgs/reservation/afternoon-icon.svg";
import EveningIcon from "@/public/svgs/reservation/evening-icon.svg";
import MorningIcon from "@/public/svgs/reservation/morning-icon.svg";

interface TimePickerProps {
  selectedDate: Date | null;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  selectedLabel: TimeLabel;
  setSelectedLabel: (label: TimeLabel) => void;
  usedDateTimeSet: Set<string>;

  isDisabledTime: (time: string, date: string) => boolean;
  isDisabledTimeWithoutDate: (time: string) => boolean;
}

const TimePicker = ({
  selectedTime,
  selectedDate,
  setSelectedTime,
  selectedLabel,
  setSelectedLabel,
  isDisabledTime,
  isDisabledTimeWithoutDate,
}: TimePickerProps) => {
  const [tempLabel, setTempLabel] = useState<TimeLabel>("아침");

  useEffect(() => {
    setTempLabel(selectedLabel ?? "아침");
  }, [selectedLabel]);

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
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
          const isDisabled = selectedDate
            ? isDisabledTime(time, dayjs(selectedDate).format("YYYY-MM-DD"))
            : isDisabledTimeWithoutDate(time); // ✅ 날짜 없으면 이걸로 판단

          return (
            <button
              key={time}
              disabled={isDisabled}
              onClick={() => handleSelectTime(time)}
              className={clsx(
                "text-body1-sb h-10 w-24 rounded border py-2 text-center",
                isDisabled
                  ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400"
                  : selectedTime === time
                    ? "bg-mint-light text-mint-contrast border-mint-contrast cursor-pointer"
                    : "hover:text-mint-contrast hover:border-mint-contrast hover:bg-mint-light cursor-pointer border-gray-400 bg-white text-gray-700",
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
