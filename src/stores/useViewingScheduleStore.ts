import { create } from "zustand";

import { TimeLabel } from "@/constants/time-options";

import { Schedule } from "@/types/schedule";

interface StorePerId {
  schedule: Schedule;
  selectedTimeLabel: TimeLabel;
}

interface ViewingScheduleStore {
  data: Record<string, StorePerId>;

  init: (id: string) => void;
  setSchedule: (id: string, schedule: Schedule) => void;
  setSelectedTimeLabel: (id: string, label: TimeLabel) => void;

  getSchedule: (id: string) => Schedule;
  getSelectedTimeLabel: (id: string) => TimeLabel;

  reset: (id: string) => void;
}

export const useViewingScheduleStore = create<ViewingScheduleStore>(
  (set, get) => ({
    data: {},

    init: id => {
      set(state => ({
        data: {
          ...state.data,
          [id]: state.data[id] ?? {
            schedule: { date: null, time: "NN : NN" },
            selectedTimeLabel: "아침",
          },
        },
      }));
    },

    setSchedule: (id, schedule) =>
      set(state => ({
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            schedule,
          },
        },
      })),

    setSelectedTimeLabel: (id, label) =>
      set(state => ({
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            selectedTimeLabel: label,
          },
        },
      })),

    getSchedule: id => {
      const { data } = get();
      return data[id]?.schedule ?? { date: null, time: "NN : NN" };
    },

    getSelectedTimeLabel: id => {
      const { data } = get();
      return data[id]?.selectedTimeLabel ?? "아침";
    },

    reset: id => {
      set(state => {
        const newData = { ...state.data };
        delete newData[id];
        return { data: newData };
      });
    },
  }),
);
