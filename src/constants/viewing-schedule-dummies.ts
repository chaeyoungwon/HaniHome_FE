import { TimeLabel } from "./time-options";

export const VIEWING_PERIOD = {
  startDate: "2025-06-18T00:00:00.000Z",
  endDate: "2025-07-20T00:00:00.000Z",
};

export const VIEWING_TIME_SLOTS: {
  label: TimeLabel;
  start: string;
  end: string;
}[] = [
  { label: "아침", start: "06:00", end: "08:00" },
  { label: "점심", start: "14:00", end: "14:30" },
];
