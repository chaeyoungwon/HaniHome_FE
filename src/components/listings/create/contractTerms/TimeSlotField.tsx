import { useTimeSlotField } from "@/hooks/property/useTimeSlotField";

import { convertUtcStringToLocalTime } from "@/utils/formatter/dateFormatter";

import AlertMessage from "@/components/common/AlertMessage";
import TimeSpinner from "@/components/common/calendar/TimeSpinner";

import { PERIODS, PERIOD_LIMITS } from "@/constants/time-options";

import { TimeSlot } from "@/types/listingDetailPost.type";

interface TimeSlotFieldProps {
  value: TimeSlot[] | null;
  onChange: (updated: TimeSlot[]) => void;
}

const TimeSlotField = ({ value, onChange }: TimeSlotFieldProps) => {
  const {
    slots,
    activeSpinner,
    tempTime,
    alertMsg,
    handleButtonClick,
    handleTimeChange,
    handleSpinnerClose,
    setAlertMsg,
    scrollTarget,
  } = useTimeSlotField(value, onChange);

  const getDisplayTime = (time: string | null, isActive: boolean) => {
    if (!time) {
      return isActive ? <span>nn : nn</span> : <span>00 : 00</span>;
    }

    const localTime = convertUtcStringToLocalTime(time);
    const [hour, minute] = (localTime || "00:00").split(":");

    return (
      <span className="flex items-center gap-[2px]">
        <span>{hour}</span>
        <span>:</span>
        <span>{minute}</span>
      </span>
    );
  };

  const getButtonClass = (time: string | null, isActive: boolean) => {
    if (isActive) return "bg-mint-contrast border-mint-contrast text-white";
    if (!time) return "bg-gray-0 border-gray-300 text-gray-300";
    if (time === "00:00") return "text-mint bg-white border-gray-400";
    return "text-mint border-gray-400";
  };

  return (
    <div className="relative">
      {PERIODS.map((period, idx) => (
        <div key={period} className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div
              className={`text-body1-sb ${
                activeSpinner?.period === period
                  ? "text-gray-800"
                  : "text-gray-400"
              }`}
            >
              {period}
            </div>
            <div className="flex items-center gap-3">
              <button
                key="start"
                className={`text-body1-med flex h-[33px] w-[77px] items-center justify-center gap-1 rounded-[4px] border px-3 py-1 ${getButtonClass(
                  slots[idx].timeFrom,
                  activeSpinner?.period === period &&
                    activeSpinner?.type === "start",
                )}`}
                onClick={() => handleButtonClick(period, "start")}
              >
                {getDisplayTime(
                  slots[idx].timeFrom,
                  activeSpinner?.period === period &&
                    activeSpinner?.type === "start",
                )}
              </button>

              <span className="text-body1-med text-gray-700">~</span>

              <button
                key="end"
                className={`text-body1-med flex h-[33px] w-[77px] items-center justify-center gap-1 rounded-[4px] border px-3 py-1 ${getButtonClass(
                  slots[idx].timeTo,
                  activeSpinner?.period === period &&
                    activeSpinner?.type === "end",
                )}`}
                onClick={() => handleButtonClick(period, "end")}
              >
                {getDisplayTime(
                  slots[idx].timeTo,
                  activeSpinner?.period === period &&
                    activeSpinner?.type === "end",
                )}
              </button>
            </div>
          </div>

          {activeSpinner?.period === period && (
            <TimeSpinner
              key={`${period}-${activeSpinner.type}`}
              initialHour={parseInt(tempTime?.split(":")[0] ?? "0")}
              initialMinute={parseInt(tempTime?.split(":")[1] ?? "0")}
              onChange={val =>
                handleTimeChange(period, activeSpinner.type, val)
              }
              scrollTarget={scrollTarget}
              onClose={handleSpinnerClose}
              minHour={parseInt(PERIOD_LIMITS[period].minTime.split(":")[0])}
              maxHour={
                PERIOD_LIMITS[period].maxTime === "00:00"
                  ? 24
                  : parseInt(PERIOD_LIMITS[period].maxTime.split(":")[0])
              }
            />
          )}
        </div>
      ))}

      {alertMsg && (
        <AlertMessage
          message={alertMsg}
          onDone={() => setAlertMsg(null)}
          className="bottom-[70px] whitespace-pre-line"
        />
      )}
    </div>
  );
};

export default TimeSlotField;
