import { Fragment, useState } from "react";

import AlertMessage from "@/components/common/AlertMessage";
import TimeSpinner from "@/components/common/calendar/TimeSpinner";

const PERIODS = ["아침", "점심", "저녁"] as const;
type Period = (typeof PERIODS)[number];

const TimeSlotField = () => {
  const [times, setTimes] = useState<
    Record<Period, { start: string; end: string }>
  >({
    아침: { start: "06:00", end: "11:30" },
    점심: { start: "12:00", end: "17:30" },
    저녁: { start: "18:00", end: "00:00" },
  });

  const [activeSpinner, setActiveSpinner] = useState<{
    period: Period;
    type: "start" | "end";
  } | null>(null);

  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  const timeLimits = {
    아침: {
      start: { minHour: 6, minMinute: 0, maxHour: 11, maxMinute: 30 },
      end: { minHour: 6, minMinute: 0, maxHour: 11, maxMinute: 30 },
    },
    점심: {
      start: { minHour: 12, minMinute: 0, maxHour: 17, maxMinute: 30 },
      end: { minHour: 12, minMinute: 0, maxHour: 17, maxMinute: 30 },
    },
    저녁: {
      start: { minHour: 18, minMinute: 0, maxHour: 24, maxMinute: 0 },
      end: { minHour: 18, minMinute: 0, maxHour: 24, maxMinute: 0 },
    },
  };

  const handleTimeChange = (
    period: Period,
    type: "start" | "end",
    val: string,
  ) => {
    const otherType = type === "start" ? "end" : "start";
    const otherVal = times[period][otherType];

    const [valH, valM] = val.split(":").map(Number);
    const [otherH, otherM] = otherVal.split(":").map(Number);

    const valTotal = (valH === 0 ? 24 : valH) * 60 + valM;
    const otherTotal = (otherH === 0 ? 24 : otherH) * 60 + otherM;

    if (
      (type === "start" && valTotal >= otherTotal) ||
      (type === "end" && valTotal <= otherTotal)
    ) {
      setAlertMsg("시작 시간은 종료 시간보다 이전이어야 합니다.");
      return;
    }

    setTimes(prev => ({
      ...prev,
      [period]: {
        ...prev[period],
        [type]: val,
      },
    }));
  };

  const handleButtonClick = (period: Period, type: "start" | "end") => {
    if (activeSpinner?.period === period && activeSpinner?.type === type) {
      setActiveSpinner(null);
    } else {
      setActiveSpinner({ period, type });
    }
  };

  return (
    <div className="relative">
      {PERIODS.map(period => (
        <div key={period} className="px-4 py-3">
          <div className="flex items-center justify-between px-4 py-3">
            <div
              className={`text-body1-sb ${activeSpinner?.period === period ? "text-gray-800" : "text-gray-400"}`}
            >
              {period}
            </div>
            <div className="flex items-center gap-3">
              {(["start", "end"] as const).map((type, idx) => (
                <Fragment key={type}>
                  <button
                    key={type}
                    className={`flex h-[30px] items-center rounded-[4px] border px-3 py-1 ${
                      activeSpinner?.period === period &&
                      activeSpinner?.type === type
                        ? "bg-mint-contrast border-mint-contrast"
                        : "border-gray-400"
                    }`}
                    onClick={() => handleButtonClick(period, type)}
                  >
                    {times[period][type].split(":").map((t, i) => (
                      <span
                        key={i}
                        className={`text-body1-med ${
                          activeSpinner?.period === period &&
                          activeSpinner?.type === type
                            ? "text-white"
                            : "text-mint-contrast"
                        }`}
                      >
                        {t}
                        {i === 0 && <span className="mx-1">:</span>}
                      </span>
                    ))}
                  </button>
                  {idx === 0 && (
                    <span className="text-body1-med text-gray-700">~</span>
                  )}
                </Fragment>
              ))}
            </div>
          </div>

          {activeSpinner?.period === period && (
            <TimeSpinner
              key={`${period}-${activeSpinner.type}`}
              initialHour={parseInt(
                times[period][activeSpinner.type].split(":")[0],
              )}
              initialMinute={parseInt(
                times[period][activeSpinner.type].split(":")[1],
              )}
              onChange={val =>
                handleTimeChange(period, activeSpinner.type, val)
              }
              onClose={() => setActiveSpinner(null)}
              minHour={timeLimits[period][activeSpinner.type].minHour}
              maxHour={timeLimits[period][activeSpinner.type].maxHour}
              minMinute={timeLimits[period][activeSpinner.type].minMinute}
              maxMinute={timeLimits[period][activeSpinner.type].maxMinute}
            />
          )}
        </div>
      ))}

      {/* AlertMessage 표시 */}
      {alertMsg && (
        <AlertMessage
          message={alertMsg}
          onDone={() => setAlertMsg(null)}
          className="bottom-[70px]"
        />
      )}
    </div>
  );
};

export default TimeSlotField;
