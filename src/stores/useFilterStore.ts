import { create } from "zustand";
import { persist } from "zustand/middleware";

type RoomKind = "SHARE" | "RENT";

interface FilterStore {
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;

  kinds: RoomKind[];
  sharePropertySubTypes: string[];
  rentPropertySubTypes: string[];
  minWeeklyCost: number | null;
  maxWeeklyCost: number | null;
  billIncluded: boolean | null;
  availableFrom: string | null;
  availableTo: string | null;
  metroStopLatitude: number | null;
  metroStopLongitude: number | null;
  radiusKm: number | null;

  setFilters: (
    filters: Partial<
      Omit<FilterStore, "setFilters" | "resetFilters" | "setSelectedFilters">
    >,
  ) => void;

  resetFilters: () => void;
}

export const useFilterStore = create(
  persist<FilterStore>(
    set => ({
      selectedFilters: [],
      setSelectedFilters: filters => set({ selectedFilters: filters }),

      kinds: [],
      sharePropertySubTypes: [],
      rentPropertySubTypes: [],
      minWeeklyCost: null,
      maxWeeklyCost: null,
      billIncluded: null,
      availableFrom: null,
      availableTo: null,
      metroStopLatitude: null,
      metroStopLongitude: null,
      radiusKm: null,

      setFilters: filters => set(state => ({ ...state, ...filters })),

      resetFilters: () =>
        set({
          selectedFilters: [],
          kinds: [],
          sharePropertySubTypes: [],
          rentPropertySubTypes: [],
          minWeeklyCost: null,
          maxWeeklyCost: null,
          billIncluded: null,
          availableFrom: null,
          availableTo: null,
          metroStopLatitude: null,
          metroStopLongitude: null,
          radiusKm: null,
        }),
    }),
    {
      name: "filter-storage",
    },
  ),
);
