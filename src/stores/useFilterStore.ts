import { create } from "zustand";
import { persist } from "zustand/middleware";

type RoomKind = "SHARE" | "RENT";

interface FilterStore {
  isHydrated: boolean;

  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;

  selectedTypes: ("쉐어" | "렌트")[];
  selectedRoomTypes: string[];

  setSelectedTypes: (
    types:
      | ("쉐어" | "렌트")[]
      | ((prev: ("쉐어" | "렌트")[]) => ("쉐어" | "렌트")[]),
  ) => void;

  setSelectedRoomTypes: (
    types: string[] | ((prev: string[]) => string[]),
  ) => void;

  kinds: RoomKind[];
  sharePropertySubTypes: string[];
  rentPropertySubTypes: string[];
  minWeeklyCost: number | null;
  maxWeeklyCost: number | null;
  billIncluded: boolean;
  availableFrom: string | null;
  availableTo: string | null;
  suburb: string;

  selectedMetroStop: {
    id: number | null;
    name: string;
    latitude: number | null;
    longitude: number | null;
  } | null;

  radiusKm: number | null;
  immediate: boolean;
  negotiable: boolean;

  setFilters: (
    filters: Partial<
      Omit<
        FilterStore,
        | "setFilters"
        | "resetFilters"
        | "setSelectedFilters"
        | "setSelectedTypes"
        | "setSelectedRoomTypes"
      >
    >,
  ) => void;

  resetFilters: () => void;
}

export const useFilterStore = create(
  persist<FilterStore>(
    set => ({
      isHydrated: false,

      selectedFilters: [],
      setSelectedFilters: filters => set({ selectedFilters: filters }),

      selectedTypes: [],
      selectedRoomTypes: [],

      setSelectedTypes: updater =>
        set(state => ({
          selectedTypes:
            typeof updater === "function"
              ? updater(state.selectedTypes)
              : updater,
        })),

      setSelectedRoomTypes: updater =>
        set(state => ({
          selectedRoomTypes:
            typeof updater === "function"
              ? updater(state.selectedRoomTypes)
              : updater,
        })),

      kinds: [],
      sharePropertySubTypes: [],
      rentPropertySubTypes: [],
      minWeeklyCost: null,
      maxWeeklyCost: null,
      billIncluded: false,
      availableFrom: null,
      availableTo: null,
      suburb: "",
      selectedMetroStop: null,

      radiusKm: null,
      immediate: false,
      negotiable: false,

      setFilters: filters => set(state => ({ ...state, ...filters })),

      resetFilters: () =>
        set({
          selectedFilters: [],
          selectedTypes: [],
          selectedRoomTypes: [],
          kinds: [],
          sharePropertySubTypes: [],
          rentPropertySubTypes: [],
          minWeeklyCost: null,
          maxWeeklyCost: null,
          billIncluded: false,
          availableFrom: null,
          availableTo: null,
          selectedMetroStop: null,
          radiusKm: null,
          immediate: false,
          negotiable: false,
          suburb: "",
        }),
    }),
    {
      name: "filter-storage",
      onRehydrateStorage: () => state => {
        if (state) {
          state.isHydrated = true;
        }
      },
    },
  ),
);
