import { DateRange } from "react-date-range";

import clsx from "clsx";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import { useCalendarHandlers } from "@/hooks/calendar/useCalendarHandlers";

import { CalendarProps, Range } from "@/types/calendar.type";

import RightArrow from "@/public/svgs/common/right-filled-arrow.svg";

import WheelSelector from "./WheelSelector";

const Calendar = ({
  range,
  focusedRange,
  isSingleSelection,
  currentMonth,
  onRangeChange,
  onFocusChange,
  onShownDateChange,
  onOpenWheel,
  onCloseWheel,
  disabled,
}: CalendarProps) => {
  const startDate = range && range.length > 0 ? range[0].startDate : null;
  const endDate = range && range.length > 0 ? range[0].endDate : null;

  const {
    tempDate,
    showWheel,
    handleDateClick,
    moveMonthBy,
    toggleShowWheel,
    handleWheelChange,
    handleWheelClose,
  } = useCalendarHandlers({
    range,
    focusedRange,
    onRangeChange,
    onFocusChange,
    onShownDateChange,
    onOpenWheel,
    onCloseWheel,
    disabled,
  });

  return (
    <div className="relative flex flex-col">
      {/* 날짜 선택 버튼 */}
      <div className="rdrDateDisplay flex items-center justify-center gap-[24px] py-4">
        <button
          onMouseDown={e => e.preventDefault()}
          onClick={() => !disabled && handleDateClick(0)}
          className={clsx(
            "rdrDateDisplayItem",
            focusedRange[1] === 0 && !disabled && "rdrDateDisplayItemActive",
            disabled && "bg-gray-0 !text-mint-contrast",
          )}
        >
          {disabled || !startDate
            ? "0000.00.00"
            : format(startDate, "yyyy. MM. dd")}
        </button>

        <span className="text-body1-med text-gray-700">~</span>

        <button
          onMouseDown={e => e.preventDefault()}
          onClick={() => !disabled && handleDateClick(1)}
          className={clsx(
            "rdrDateDisplayItem",
            focusedRange[1] === 1 && !disabled && "rdrDateDisplayItemActive",
            disabled && "bg-gray-0 !text-mint-contrast",
          )}
        >
          {disabled || !endDate
            ? "0000.00.00"
            : format(endDate, "yyyy. MM. dd")}
        </button>
      </div>

      {/* 상단 월 선택 영역 */}
      <div
        className={clsx(
          "flex items-center justify-between gap-17 px-11 py-3",
          disabled
            ? "border-y border-gray-200 bg-gray-100 text-gray-300"
            : "text-gray-900",
        )}
      >
        <button onClick={() => !disabled && moveMonthBy(-1)}>
          <RightArrow
            className={clsx(
              "h-4.5 w-4.5 rotate-180",
              disabled ? "text-gray-300" : "cursor-pointer",
            )}
          />
        </button>

        <span
          onClick={() => !disabled && toggleShowWheel()}
          className={clsx("cursor-pointer", disabled && "pointer-events-none")}
        >
          {tempDate ? format(tempDate, "yyyy. MM.") : ""}
        </span>

        <button onClick={() => !disabled && moveMonthBy(1)}>
          <RightArrow
            className={clsx(
              "h-4.5 w-4.5",
              disabled ? "text-gray-300" : "cursor-pointer",
            )}
          />
        </button>
      </div>

      {/* 휠 또는 캘린더 영역 */}
      {showWheel && tempDate && !disabled ? (
        <WheelSelector
          value={tempDate}
          onChange={handleWheelChange}
          onClose={handleWheelClose}
        />
      ) : (
        <DateRange
          key={`${currentMonth.getFullYear()}-${currentMonth.getMonth()}`}
          shownDate={tempDate}
          onShownDateChange={handleWheelChange}
          ranges={range}
          onChange={(item: { selection: Range }) =>
            !disabled && onRangeChange([item.selection])
          }
          showDateDisplay={false}
          focusedRange={focusedRange}
          onRangeFocusChange={!disabled ? onFocusChange : () => {}}
          locale={enUS}
          rangeColors={["#2ED8A7"]}
          className={clsx(
            isSingleSelection && "single-selection",
            disabled &&
              "rdrCalendarWrapper disabled pointer-events-none bg-gray-100",
          )}
        />
      )}
    </div>
  );
};

export default Calendar;
