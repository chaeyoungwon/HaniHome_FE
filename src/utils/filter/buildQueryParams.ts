import { RENT_TYPE_MAP, SHARE_TYPE_MAP } from "@/constants/housing-options";

import {
  RentPropertySubType,
  SharePropertySubType,
} from "@/types/listingDetailPost.type";
import { FilteredPropertyParams } from "@/types/property.type";

interface ParamsInput {
  selectedTypes: ("쉐어" | "렌트")[];
  selectedRoomTypes: string[];
  billIncluded: boolean | null;
  immediate: boolean | null;
  negotiable: boolean | null;
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
  input: Partial<ParamsInput>,
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

  const kinds = (selectedTypes ?? [])
    .map(type => (type === "쉐어" ? "SHARE" : type === "렌트" ? "RENT" : null))
    .filter((k): k is "SHARE" | "RENT" => k !== null);

  const sharePropertySubTypes: SharePropertySubType[] = [];
  const rentPropertySubTypes: RentPropertySubType[] = [];

  for (const room of selectedRoomTypes ?? []) {
    if ((selectedTypes ?? []).includes("쉐어")) {
      const found = Object.entries(SHARE_TYPE_MAP).find(
        ([, value]) => value === room,
      );
      if (found) {
        sharePropertySubTypes.push(found[0] as SharePropertySubType);
      }
    }

    if ((selectedTypes ?? []).includes("렌트")) {
      const found = Object.entries(RENT_TYPE_MAP).find(
        ([, value]) => value === room,
      );
      if (found) {
        rentPropertySubTypes.push(found[0] as RentPropertySubType);
      }
    }
  }

  const result: FilteredPropertyParams = {
    suburb: suburb ?? "",
  };

  if (kinds.length > 0) {
    result.kinds = kinds;
  }

  if (sharePropertySubTypes.length > 0) {
    result.sharePropertySubTypes = sharePropertySubTypes;
  }

  if (rentPropertySubTypes.length > 0) {
    result.rentPropertySubTypes = rentPropertySubTypes;
  }
  if (billIncluded !== null) result.billIncluded = billIncluded;
  if (immediate !== null) result.immediate = immediate;
  if (negotiable !== null) result.negotiable = negotiable;

  if (minWeeklyCost != null) result.minWeeklyCost = minWeeklyCost;
  if (maxWeeklyCost != null) result.maxWeeklyCost = maxWeeklyCost;
  if (radiusKm != null) result.radiusKm = radiusKm;
  if (metroStopLatitude != null) result.metroStopLatitude = metroStopLatitude;
  if (metroStopLongitude != null)
    result.metroStopLongitude = metroStopLongitude;

  if (availableFrom && availableTo && availableFrom !== availableTo) {
    result.availableFrom = availableFrom;
    result.availableTo = availableTo;
  }

  return result;
};
