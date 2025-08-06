export const timeToMinutes = (timeStr: string): number => {
  if (!timeStr) return 0;
  if (timeStr === "24:00") return 1440;
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};

export const displayTime = (timeStr: string | null): string => {
  if (!timeStr) return "";
  return timeStr === "24:00" ? "00:00" : timeStr;
};
