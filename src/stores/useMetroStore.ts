import { create } from "zustand";

import { MetroStop } from "@/types/metro";

interface MetroState {
  stops: MetroStop[];
  setStops: (stops: MetroStop[]) => void;
}

export const useMetroStore = create<MetroState>(set => ({
  stops: [],
  setStops: stops => set({ stops }),
}));
