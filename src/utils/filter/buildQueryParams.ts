import { RENT_TYPE_MAP, SHARE_TYPE_MAP } from "@/constants/housing-options";

import {
  RentPropertySubType,
  SharePropertySubType,
} from "@/types/listingDetailPost";
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
  suburb: string;
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
    suburb,
  } = input;

  const kinds = selectedTypes
    .map(type => (type === "쉐어" ? "SHARE" : "RENT"))
    .filter((k): k is "SHARE" | "RENT" => k !== null);

  const sharePropertySubTypes: string[] = [];
  const rentPropertySubTypes: string[] = [];

  for (const room of selectedRoomTypes) {
    if (selectedTypes.includes("쉐어")) {
      const found = Object.entries(SHARE_TYPE_MAP).find(
        ([, value]) => value === room,
      );
      if (found) {
        sharePropertySubTypes.push(found[0] as SharePropertySubType);
      }
    }

    if (selectedTypes.includes("렌트")) {
      const found = Object.entries(RENT_TYPE_MAP).find(
        ([, value]) => value === room,
      );
      if (found) {
        rentPropertySubTypes.push(found[0] as RentPropertySubType);
      }
    }
  }

  const params: FilteredPropertyParams = {
    kinds,
    sharePropertySubTypes,
    rentPropertySubTypes,
    billIncluded,
    immediate,
    negotiable,
    suburb,
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
