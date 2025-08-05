export interface Range {
  startDate: Date;
  endDate: Date;
  key: string;
}

export interface CalendarProps {
  range: Range[];
  focusedRange: [number, number];
  isSingleSelection?: boolean;
  currentMonth: Date;
  onRangeChange: (range: Range[]) => void;
  onFocusChange: (range: [number, number]) => void;
  onShownDateChange: (date: Date) => void;
  onOpenWheel?: () => void;
  onCloseWheel?: () => void;
  setCurrentMonth: (date: Date) => void;
  disabled?: boolean;
}
