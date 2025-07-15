import { RENT_TYPE_MAP, SHARE_TYPE_MAP } from "@/constants/housing-options";

import { FilteredPropertyParams } from "@/types/property";

interface ParamsInput {
  selectedTypes: ("쉐어" | "렌트")[];
  selectedRoomTypes: string[];
  billIncluded: boolean;
  immediate: boolean;
  negotiable: boolean;
  minWeeklyCost: number | null;
  maxWeeklyCost: number | null;
  radiusKm: number | null;
  availableFrom: string | null;
  availableTo: string | null;
  metroStopLatitude: number | null;
  metroStopLongitude: number | null;
}

export const buildQueryParams = (
  input: ParamsInput,
): FilteredPropertyParams => {
  const {
    selectedTypes,
    selectedRoomTypes,
    billIncluded,
    immediate,
    negotiable,
    minWeeklyCost,
    maxWeeklyCost,
    radiusKm,
    availableFrom,
    availableTo,
    metroStopLatitude,
    metroStopLongitude,
  } = input;

  const kinds = selectedTypes
    .map(type => (type === "쉐어" ? "SHARE" : "RENT"))
    .filter((k): k is "SHARE" | "RENT" => k !== null);

  const sharePropertySubTypes: string[] = [];
  const rentPropertySubTypes: string[] = [];

  for (const room of selectedRoomTypes) {
    if (selectedTypes.includes("쉐어") && SHARE_TYPE_MAP[room]) {
      sharePropertySubTypes.push(SHARE_TYPE_MAP[room]);
    }
    if (selectedTypes.includes("렌트") && RENT_TYPE_MAP[room]) {
      rentPropertySubTypes.push(RENT_TYPE_MAP[room]);
    }
  }

  const params: FilteredPropertyParams = {
    kinds,
    sharePropertySubTypes,
    rentPropertySubTypes,
    billIncluded,
    immediate,
    negotiable,
  };

  if (minWeeklyCost !== null) params.minWeeklyCost = minWeeklyCost;
  if (maxWeeklyCost !== null) params.maxWeeklyCost = maxWeeklyCost;
  if (radiusKm !== null) params.radiusKm = radiusKm;

  if (metroStopLatitude !== null) params.metroStopLatitude = metroStopLatitude;
  if (metroStopLongitude !== null)
    params.metroStopLongitude = metroStopLongitude;

  if (availableFrom && availableTo && availableFrom !== availableTo) {
    params.availableFrom = availableFrom;
    params.availableTo = availableTo;
  }

  return params;
};
