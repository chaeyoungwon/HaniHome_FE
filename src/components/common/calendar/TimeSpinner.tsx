import { useEffect, useRef, useState } from "react";

import { useWheelSnap } from "@/hooks/calendar/useWheelSnap";

import WheelColumn from "./WheelColumn";

const BASE_HOURS = Array.from({ length: 19 }, (_, i) => 6 + i); // 6~24
const BASE_MINUTES = [0, 30];

interface TimeSpinnerProps {
  initialHour: number; // 6 ~ 24 (24 -> 00시)
  initialMinute: number; // 0 or 30
  onChange: (time: string) => void;
  onClose: () => void;

  minHour?: number;
  maxHour?: number;
  minMinute?: number;
  maxMinute?: number;
  scrollTarget?: { hour: number; minute: number } | null;
}

const TimeSpinner = ({
  initialHour,
  initialMinute,
  onChange,
  minHour = 6,
  maxHour = 24,
  minMinute = 0,
  maxMinute = 30,
  scrollTarget,
}: TimeSpinnerProps) => {
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);
  const [touched, setTouched] = useState(false);

  const hourRef = useRef<HTMLDivElement>(null!);
  const minuteRef = useRef<HTMLDivElement>(null!);

  const hourTimer = useRef<NodeJS.Timeout | null>(null);
  const minuteTimer = useRef<NodeJS.Timeout | null>(null);

  // 시간 필터링
  const filteredHours = BASE_HOURS.filter(h => h >= minHour && h <= maxHour);

  // 분 필터링
  const filteredMinutes = BASE_MINUTES.filter(
    m => m >= minMinute && m <= maxMinute,
  );

  const PADDED: (number | null)[] = [null, null];
  const HOURS = [...PADDED, ...filteredHours, ...PADDED];
  const MINUTES = [...PADDED, ...filteredMinutes, ...PADDED];

  const hourSnap = useWheelSnap({
    ref: hourRef,
    items: HOURS,
    type: "hour",
    onSelect: setHour,
  });

  const minuteSnap = useWheelSnap({
    ref: minuteRef,
    items: MINUTES,
    type: "minute",
    onSelect: setMinute,
  });

  const handleHourChange = (val: number) => {
    const index = HOURS.findIndex(v => v === val);
    if (index !== -1) hourSnap.scrollToIndex(index);
    setHour(val);
    setTouched(true);
  };

  const handleMinuteChange = (val: number) => {
    const index = MINUTES.findIndex(v => v === val);
    if (index !== -1) minuteSnap.scrollToIndex(index);
    setMinute(val);
    setTouched(true);
  };

  useEffect(() => {
    const h = initialHour === 0 ? 24 : initialHour;
    const hourIndex = HOURS.findIndex(val => val === h);
    if (hourIndex !== -1) hourSnap.scrollToIndex(hourIndex);

    const minuteIndex = MINUTES.findIndex(val => val === initialMinute);
    if (minuteIndex !== -1) minuteSnap.scrollToIndex(minuteIndex);
  }, []);

  useEffect(() => {
    if (!touched) return;
    onChange(
      `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    );
  }, [hour, minute]);

  useEffect(() => {
    hourSnap.scrollToIndex(hour);
    minuteSnap.scrollToIndex(minute);
  }, [hour, minute]);

  useEffect(() => {
    if (!scrollTarget) return;
    const hIndex = HOURS.findIndex(val => val === scrollTarget.hour);
    const mIndex = MINUTES.findIndex(val => val === scrollTarget.minute);
    if (hIndex !== -1) hourSnap.scrollToIndex(hIndex);
    if (mIndex !== -1) minuteSnap.scrollToIndex(mIndex);
  }, [scrollTarget]);

  const debounceScroll = (
    timerRef: React.MutableRefObject<NodeJS.Timeout | null>,
    callback: () => void,
  ) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(callback, 100);
  };

  return (
    <div className="relative z-30 flex w-full justify-center gap-3 border-b border-gray-200 bg-white py-3">
      <WheelColumn
        ref={hourRef}
        items={HOURS}
        selected={hour}
        onClick={handleHourChange}
        debounceScroll={() => debounceScroll(hourTimer, hourSnap.snap)}
        type="hour"
        containerClassName="w-[72px]"
      />
      <div className="border-mint-contrast pointer-events-none absolute top-1/2 left-[92px] z-20 h-[50px] w-[72px] -translate-y-1/2 border-y" />

      <WheelColumn
        ref={minuteRef}
        items={MINUTES}
        selected={minute}
        onClick={handleMinuteChange}
        debounceScroll={() => debounceScroll(minuteTimer, minuteSnap.snap)}
        type="minute"
        containerClassName="w-[72px]"
      />
      <div className="border-mint-contrast pointer-events-none absolute top-1/2 left-[176px] z-20 h-[50px] w-[72px] -translate-y-1/2 border-y" />
    </div>
  );
};

export default TimeSpinner;
