import { useEffect, useState } from "react";

import {
  convertLocalTimeToUtcString,
  convertUtcStringToLocalTime,
} from "@/utils/formatter/dateFormatter";
import { timeToMinutes } from "@/utils/listing/create/timeslotUtils";

import {
  DEFAULT_SLOTS,
  PERIODS,
  PERIOD_LIMITS,
} from "@/constants/time-options";

import { TimeSlot } from "@/types/listingDetailPost.type";

type Period = (typeof PERIODS)[number];

export const useTimeSlotField = (
  value: TimeSlot[] | null,
  onChange: (updated: TimeSlot[]) => void,
) => {
  const initialSlots: TimeSlot[] = PERIODS.map(() => ({
    timeFrom: null,
    timeTo: null,
  }));

  const [slots, setSlots] = useState<TimeSlot[]>(() => {
    // value가 주어졌고 길이가 정확하면 그대로 사용
    if (value?.length === PERIODS.length) return value;
    // 그렇지 않으면 초기값 사용
    return initialSlots;
  });

  const [tempTime, setTempTime] = useState<string | null>(null);
  const [activeSpinner, setActiveSpinner] = useState<{
    period: Period;
    type: "start" | "end";
  } | null>(null);
  const [alertMsg, setAlertMsg] = useState<string | null>(null);
  const [scrollTarget, setScrollTarget] = useState<{
    hour: number;
    minute: number;
  } | null>(null);

  useEffect(() => {
    if (!value) {
      setSlots(DEFAULT_SLOTS);
      return;
    }
    const isSame =
      value.length === slots.length &&
      value.every(
        (slot, i) =>
          slot.timeFrom === slots[i]?.timeFrom &&
          slot.timeTo === slots[i]?.timeTo,
      );
    if (!isSame) {
      setSlots(value.length === 0 ? DEFAULT_SLOTS : value);
    }
  }, [value]);

  const handleTimeChange = (
    period: Period,
    type: "start" | "end",
    val: string,
  ) => {
    const { minTime, maxTime } = PERIOD_LIMITS[period];
    const valMin = timeToMinutes(val);
    const minLimit = timeToMinutes(minTime);
    const maxLimit = timeToMinutes(maxTime === "00:00" ? "24:00" : maxTime);

    if (valMin < minLimit || valMin > maxLimit) {
      setAlertMsg(`${period} 시간대(${minTime}~ ${maxTime}) 사이여야 합니다.`);
      return;
    }

    const idx = PERIODS.indexOf(period);
    const otherVal =
      slots[idx][type === "start" ? "timeTo" : "timeFrom"] || "00:00";
    const localOtherVal = convertUtcStringToLocalTime(otherVal);

    if (type === "start") {
      if (val >= localOtherVal && localOtherVal !== "00:00") {
        setAlertMsg("시작 시간은 종료 시간보다 이전이어야 합니다.");
        return;
      }
    } else {
      if (val <= localOtherVal && val !== "00:00") {
        setAlertMsg("시작 시간은 종료 시간보다 이전이어야 합니다.");
        return;
      }
    }

    setTempTime(val);
  };

  const handleSpinnerClose = () => {
    if (activeSpinner && tempTime !== null) {
      const { period, type } = activeSpinner;
      const idx = PERIODS.indexOf(period);
      const updatedSlots = [...slots];
      const saveTime =
        type === "end" && tempTime === "24:00" ? "00:00" : tempTime;

      const utcTime = convertLocalTimeToUtcString(saveTime);

      updatedSlots[idx] = {
        ...updatedSlots[idx],
        [type === "start" ? "timeFrom" : "timeTo"]: utcTime,
      };
      setSlots(updatedSlots);
      onChange(updatedSlots);
    }
    setTempTime(null);
    setActiveSpinner(null);
  };

  const handleButtonClick = (period: Period, type: "start" | "end") => {
    const incomplete = slots.find((slot, idx) => {
      const isCurrent = PERIODS[idx] === period;
      return (
        !isCurrent &&
        (slot.timeFrom === null || slot.timeFrom === null) !==
          (slot.timeTo === null || slot.timeTo === null)
      );
    });

    if (incomplete) {
      setAlertMsg(
        "현재 시간대의 시작 시간과 종료 시간을 모두 설정한 후\n다른 시간대를 선택해 주세요",
      );
      return;
    }

    if (activeSpinner?.period === period && activeSpinner?.type === type) {
      handleSpinnerClose();
    } else {
      setActiveSpinner({ period, type });
      const idx = PERIODS.indexOf(period);
      const currentTime =
        slots[idx]?.[type === "start" ? "timeFrom" : "timeTo"] || null;
      setTempTime(currentTime);

      if (currentTime) {
        const [hour, minute] = currentTime.split(":").map(Number);
        setScrollTarget({ hour, minute });
      }
    }
  };

  return {
    slots,
    activeSpinner,
    tempTime,
    alertMsg,
    scrollTarget,
    handleButtonClick,
    handleTimeChange,
    handleSpinnerClose,
    setAlertMsg,
  };
};
