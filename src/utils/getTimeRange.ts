import { addMinutes, format, isBefore, parse } from "date-fns";

export const getTimeRange = (
  start: string,
  end: string,
  step = 30,
): string[] => {
  const result: string[] = [];
  let current = parse(start, "HH:mm", new Date());
  const endTime = parse(end, "HH:mm", new Date());

  while (isBefore(current, endTime) || format(current, "HH:mm") === end) {
    result.push(format(current, "HH:mm"));
    current = addMinutes(current, step);
  }

  return result;
};
