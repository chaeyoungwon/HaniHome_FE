import clsx from "clsx";
import { format } from "date-fns";

import CloseIcon from "@/public/svgs/common/close-icon.svg";

interface ScheduleInputListProps {
  schedules: { date: Date | null; time: string }[];
  activeIndex: number;
  mode: "calendar" | "time" | null;
  setMode: (mode: "calendar" | "time") => void;
  setActiveIndex: (idx: number) => void;
  removeSchedule: (idx: number) => void;
}

const ScheduleInputList = ({
  schedules,
  activeIndex,
  mode,
  setMode,
  setActiveIndex,
  removeSchedule,
}: ScheduleInputListProps) => {
  const activeClass = "border-mint-contrast bg-mint-contrast text-white";
  const inactiveClass = "border-gray-300 bg-white text-gray-700";
  const getButtonClass = (base: string, isActive: boolean) =>
    clsx(base, isActive ? activeClass : inactiveClass);

  return (
    <div className="pb-3">
      {schedules.map((schedule, idx) => (
        <div
          key={idx}
          className="bg-gray-0 flex items-center justify-between border-t border-gray-100 px-4 py-3"
        >
          <span className="text-body2-med text-gray-700">
            날짜 | 시간 {idx + 1}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveIndex(idx);
                setMode("calendar");
              }}
              className={getButtonClass(
                "text-body1-med w-[122px] rounded border px-3 py-1",
                activeIndex === idx && mode === "calendar",
              )}
            >
              {schedule.date
                ? format(schedule.date, "yyyy. MM. dd.")
                : "0000. 00. 00"}
            </button>

            <button
              onClick={() => {
                setActiveIndex(idx);
                setMode("time");
              }}
              className={getButtonClass(
                "text-body1-med flex w-[83px] items-center justify-center gap-1 rounded border px-3 py-1",
                activeIndex === idx && mode === "time",
              )}
            >
              {schedule.time.includes(":") ? (
                <>
                  <span>{schedule.time.split(":")[0]}</span>
                  <span>:</span>
                  <span>{schedule.time.split(":")[1]}</span>
                </>
              ) : (
                <span>{schedule.time}</span>
              )}
            </button>

            {schedules.length > 1 && (
              <button onClick={() => removeSchedule(idx)}>
                <CloseIcon className="text-mint-contrast h-4.5 w-4.5 cursor-pointer" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleInputList;
