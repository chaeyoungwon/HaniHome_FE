import { Range } from "@/types/calendar";

export const calculateNewRange = (
  updated: Date,
  currentRange: Range,
  focusedIndex: number,
): Range => {
  let startDate =
    focusedIndex === 0
      ? updated
      : updated < currentRange.startDate
        ? updated
        : currentRange.startDate;

  let endDate =
    focusedIndex === 1
      ? updated
      : updated > currentRange.endDate
        ? updated
        : currentRange.endDate;

  if (startDate > endDate) {
    const temp = startDate;
    startDate = endDate;
    endDate = temp;
  }

  return {
    ...currentRange,
    startDate,
    endDate,
  };
};
