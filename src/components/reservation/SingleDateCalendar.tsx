import { Calendar } from "react-date-range";

import { format } from "date-fns";

import RightArrow from "@/public/svgs/common/right-filled-arrow.svg";

interface SingleDateCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  moveMonthBy: (offset: number) => void;
  shownDate: Date;
  setShownDate: React.Dispatch<React.SetStateAction<Date>>;
  disabledDates: Date[];
}

const SingleDateCalendar = ({
  selectedDate,
  onSelectDate,
  moveMonthBy,
  shownDate,
  setShownDate,
  disabledDates,
}: SingleDateCalendarProps) => (
  <>
    <div className="flex items-center justify-between gap-17 border-y border-gray-200 px-11 py-3 text-gray-900">
      <button onClick={() => moveMonthBy(-1)}>
        <RightArrow className="h-4.5 w-4.5 rotate-180 cursor-pointer" />
      </button>
      <span>{format(shownDate, "yyyy. MM.")}</span>
      <button onClick={() => moveMonthBy(1)}>
        <RightArrow className="h-4.5 w-4.5 cursor-pointer" />
      </button>
    </div>

    <div className="flex items-center justify-center border-b border-gray-200 pb-6">
      <Calendar
        key={shownDate.toISOString()}
        date={selectedDate ?? undefined}
        shownDate={shownDate}
        onChange={(date: Date) => {
          onSelectDate(date);
          setShownDate(date);
        }}
        color="transparent"
        disabledDates={disabledDates}
      />
    </div>
  </>
);

export default SingleDateCalendar;
