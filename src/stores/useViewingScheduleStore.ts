import { create } from "zustand";

import { TimeLabel } from "@/constants/time-options";

interface Schedule {
  date: Date | null;
  time: string;
}

interface StorePerId {
  schedules: Schedule[];
  selectedTimeLabels: TimeLabel[];
  activeIndex: number;
}

interface ViewingScheduleStore {
  data: Record<string, StorePerId>;
  activeId: string | null;

  setActiveId: (id: string) => void;
  setSchedules: (id: string, s: Schedule[]) => void;
  setSelectedTimeLabels: (id: string, l: TimeLabel[]) => void;

  getSchedules: () => Schedule[];
  getSelectedTimeLabels: () => TimeLabel[];

  getActiveIndex: () => number;
  setActiveIndex: (index: number) => void;

  history: number[];
  push: (index: number) => void;
  pop: () => number | undefined;
  remove: (index: number) => void;
  reset: () => void;
}

export const useViewingScheduleStore = create<ViewingScheduleStore>(
  (set, get) => ({
    data: {},
    activeId: null,
    history: [0],

    setActiveId: id => {
      const state = get();
      if (!state.data[id]) {
        state.data[id] = {
          schedules: [{ date: null, time: "NN : NN" }],
          selectedTimeLabels: ["아침"],
          activeIndex: 0,
        };
      }
      set({ activeId: id });
    },

    setSchedules: (id, schedules) =>
      set(state => ({
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            schedules,
          },
        },
      })),

    setSelectedTimeLabels: (id, labels) =>
      set(state => ({
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            selectedTimeLabels: labels,
          },
        },
      })),

    getSchedules: () => {
      const { activeId, data } = get();
      return activeId && data[activeId]?.schedules
        ? data[activeId].schedules
        : [{ date: null, time: "NN : NN" }];
    },

    getSelectedTimeLabels: () => {
      const { activeId, data } = get();
      return activeId && data[activeId]?.selectedTimeLabels
        ? data[activeId].selectedTimeLabels
        : ["아침"];
    },

    getActiveIndex: () => {
      const { activeId, data } = get();
      return activeId && data[activeId]?.activeIndex != null
        ? data[activeId].activeIndex
        : 0;
    },

    setActiveIndex: index => {
      const { activeId } = get();
      if (!activeId) return;
      set(state => ({
        data: {
          ...state.data,
          [activeId]: {
            ...state.data[activeId],
            activeIndex: index,
          },
        },
      }));
    },

    push: index =>
      set(state => {
        const last = state.history[state.history.length - 1];
        if (last === index) return state;
        return { history: [...state.history, index] };
      }),

    pop: () => {
      const prev = [...get().history];
      if (prev.length <= 1) return undefined;
      prev.pop();
      const last = prev[prev.length - 1];
      set({ history: prev });
      return last;
    },

    remove: index =>
      set(state => {
        const id = state.activeId;
        if (!id) return state;

        const current = state.data[id];
        if (!current) return state;

        const newSchedules = current.schedules.filter((_, i) => i !== index);
        const newLabels = current.selectedTimeLabels.filter(
          (_, i) => i !== index,
        );

        return {
          data: {
            ...state.data,
            [id]: {
              ...current,
              schedules: newSchedules,
              selectedTimeLabels: newLabels,
              activeIndex:
                current.activeIndex >= newSchedules.length
                  ? newSchedules.length - 1
                  : current.activeIndex,
            },
          },
          history: state.history
            .filter(i => i !== index)
            .map(i => (i > index ? i - 1 : i)),
        };
      }),

    reset: () => {
      const id = get().activeId;
      if (!id) return;

      const current = get().data[id];
      if (!current) return;

      if (
        current.schedules.length > 1 ||
        current.schedules[0].date !== null ||
        current.schedules[0].time !== "NN : NN"
      ) {
        return;
      }

      set(state => ({
        data: {
          ...state.data,
          [id]: {
            schedules: [{ date: null, time: "NN : NN" }],
            selectedTimeLabels: ["아침"],
            activeIndex: 0,
          },
        },
        history: [0],
      }));
    },
  }),
);
