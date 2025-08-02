const ITEM_HEIGHT = 50;
const CENTER_OFFSET = 100;

interface UseWheelSnapParams {
  ref: React.RefObject<HTMLDivElement>;
  items: (string | number | null)[];
  selectedYear?: number;
  selectedMonth?: number;
  type: "year" | "month" | "hour" | "minute";
  value?: Date;
  onSelect: (val: number) => void;
  onChange?: (date: Date) => void;
}

export const useWheelSnap = ({
  ref,
  items,
  selectedYear,
  selectedMonth,
  type,
  value,
  onSelect,
  onChange,
}: UseWheelSnapParams) => {
  const snap = () => {
    if (!ref.current) return;
    const scrollTop = ref.current.scrollTop;
    const centerIndex = Math.round((scrollTop + CENTER_OFFSET) / ITEM_HEIGHT);
    const selectedValue =
      items[Math.min(Math.max(centerIndex, 0), items.length - 1)];

    if (typeof selectedValue !== "number") return;

    if ("vibrate" in navigator) navigator.vibrate(30);

    if (type === "year" || type === "month") {
      if (
        !value ||
        !onChange ||
        selectedYear === undefined ||
        selectedMonth === undefined
      )
        return;
      const newYear = type === "year" ? selectedValue : selectedYear;
      const newMonth = type === "month" ? selectedValue - 1 : selectedMonth - 1;
      const lastDay = new Date(newYear, newMonth + 1, 0).getDate();
      const day = Math.min(value.getDate(), lastDay);

      onSelect(selectedValue);
      onChange(new Date(newYear, newMonth, day));
    } else if (type === "hour" || type === "minute") {
      onSelect(selectedValue);
    }

    ref.current.scrollTo({
      top: centerIndex * ITEM_HEIGHT - CENTER_OFFSET,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (target: number) => {
    const index = items.findIndex(i => typeof i === "number" && i === target);
    if (index === -1) return;
    ref.current?.scrollTo({
      top: index * ITEM_HEIGHT - CENTER_OFFSET,
      behavior: "smooth",
    });
  };

  return { snap, scrollToIndex };
};
