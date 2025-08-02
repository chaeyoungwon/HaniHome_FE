import { forwardRef } from "react";

import clsx from "clsx";

interface WheelColumnProps {
  items: (string | number | null)[];
  selected: number;
  onClick: (val: number) => void;
  debounceScroll: () => void;
  type: "year" | "month" | "hour" | "minute";

  containerClassName?: string;
  scrollClassName?: string;
  overlayClassName?: string;
}

const WheelColumn = forwardRef<HTMLDivElement, WheelColumnProps>(
  (
    {
      items,
      selected,
      onClick,
      debounceScroll,
      type,
      containerClassName,
      scrollClassName,
      overlayClassName,
    },
    ref,
  ) => (
    <div
      className={clsx(
        "relative flex flex-col items-center text-center",
        containerClassName,
      )}
    >
      {/* year 타입에만 '20' 접두어 표시 */}
      {type === "year" && (
        <span
          className={clsx(
            "text-heading4 text-mint-contrast pointer-events-none absolute top-[50%] left-0 z-20 -translate-y-1/2",
            overlayClassName,
          )}
        >
          20
        </span>
      )}

      <div
        ref={ref}
        className={clsx(
          "scrollbar-hide z-0 h-[250px] overflow-auto scroll-smooth",
          scrollClassName,
        )}
        onScroll={debounceScroll}
      >
        {items.map((item, idx) => {
          const isValidNumber = typeof item === "number" && !isNaN(item);

          return (
            <div
              key={idx}
              className={clsx(
                "text-heading4 flex h-[50px] items-center justify-center transition-colors duration-150",
                isValidNumber ? "cursor-pointer" : "pointer-events-none",
                isValidNumber
                  ? item === selected
                    ? "text-mint-contrast"
                    : "text-gray-400"
                  : "",
              )}
              onClick={() => isValidNumber && onClick(item)}
            >
              {isValidNumber
                ? type === "year"
                  ? `${item.toString().slice(2)}.`
                  : type === "month"
                    ? `${item.toString().padStart(2, "0")}.`
                    : item.toString().padStart(2, "0")
                : ""}
            </div>
          );
        })}
      </div>
    </div>
  ),
);

export default WheelColumn;
