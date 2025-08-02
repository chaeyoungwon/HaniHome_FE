import { TimeSlot } from "@/types/listingDetail";

export type TimeLabel = "아침" | "점심" | "저녁";

export const DEFAULT_SLOT: TimeSlot = { timeFrom: "00:00", timeTo: "00:00" };
export const DEFAULT_SLOTS: TimeSlot[] = [
  DEFAULT_SLOT,
  DEFAULT_SLOT,
  DEFAULT_SLOT,
];

export const TIME_OPTIONS: Record<TimeLabel, string[]> = {
  아침: [
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
  ],
  점심: [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ],
  저녁: [
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ],
};

export const PERIODS = ["아침", "점심", "저녁"] as const;

export const PERIOD_LIMITS: Record<
  (typeof PERIODS)[number],
  { minTime: string; maxTime: string }
> = {
  아침: { minTime: "06:00", maxTime: "11:30" },
  점심: { minTime: "12:00", maxTime: "18:00" },
  저녁: { minTime: "18:30", maxTime: "24:00" },
};
