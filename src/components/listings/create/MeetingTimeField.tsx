import { useEffect, useMemo, useState } from "react";

import { format } from "date-fns";

import Calendar from "@/components/common/calendar/Calendar";

import StatusOffIcon from "@/public/svgs/listings/status-off-icon.svg";
import StatusOnIcon from "@/public/svgs/listings/status-on-icon.svg";

interface Range {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface MeetingTimeFieldProps {
  meetingDateFrom: string | null;
  meetingDateTo: string | null;
  onDateChange: (from: string | null, to: string | null) => void;
}

const toStartOfDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};
const MeetingTimeField = ({
  meetingDateFrom,
  meetingDateTo,
  onDateChange,
}: MeetingTimeFieldProps) => {
  const [focusedRange, setFocusedRange] = useState<[number, number]>([0, 0]);
  const [currentMonth, setCurrentMonth] = useState<Date | null>(null);
  const [range, setRange] = useState<Range[] | null>(null);
  const [, setIsWheelOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const today = new Date();
    const fromDate = meetingDateFrom ? new Date(meetingDateFrom) : today;
    const toDate = meetingDateTo ? new Date(meetingDateTo) : today;

    setCurrentMonth(fromDate);
    setRange([
      {
        startDate: toStartOfDay(fromDate),
        endDate: toStartOfDay(toDate),
        key: "selection",
      },
    ]);
  }, [meetingDateFrom, meetingDateTo]);

  const handleStatus = () => {
    setIsClicked(prev => !prev);
  };

  const isSingleSelection = useMemo(() => {
    if (!range) return true;
    const { startDate, endDate } = range[0];
    return startDate.toDateString() === endDate.toDateString();
  }, [range]);

  const handleRangeChange = (newRange: Range[]) => {
    const { startDate, endDate } = newRange[0];
    const start = toStartOfDay(startDate);
    const end = toStartOfDay(endDate);

    setRange([
      {
        startDate: start,
        endDate: end,
        key: "selection",
      },
    ]);

    onDateChange(
      format(start, "yyyy-MM-dd'T'00:00:00"),
      format(end, "yyyy-MM-dd'T'00:00:00"),
    );
  };

  if (!range || !currentMonth) return null;

  return (
    <div>
      <Calendar
        range={range}
        focusedRange={focusedRange}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        isSingleSelection={isSingleSelection}
        onRangeChange={handleRangeChange}
        onFocusChange={setFocusedRange}
        onShownDateChange={setCurrentMonth}
        onOpenWheel={() => setTimeout(() => setIsWheelOpen(true), 0)}
        onCloseWheel={() => setTimeout(() => setIsWheelOpen(false), 0)}
        disabled={isClicked}
      />
      <div className="flex justify-between px-4 py-3" onClick={handleStatus}>
        <div
          className={`text-body1-med ${isClicked ? "text-mint" : "text-gray-500"}`}
        >
          기한 상관 없음
        </div>
        {isClicked ? <StatusOnIcon /> : <StatusOffIcon />}
      </div>
    </div>
  );
};
export default MeetingTimeField;
