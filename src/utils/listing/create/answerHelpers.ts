import { UseListingStoreReturn } from "@/stores/useListingStore";

import {
  CAPACITY_RENT_MAP,
  CAPACITY_SHARE_MAP,
} from "@/constants/capacity-options";
import { RENT_TYPE_MAP, SHARE_TYPE_MAP } from "@/constants/housing-options";
import { CATEGORY_OPTIONS } from "@/constants/property-category";

import { ListingDetailsOption } from "@/types/createPropertyAnswer.type";
import {
  CapacityRent,
  CapacityShare,
  RentInternalDetails,
  RentPropertySubType,
  ShareInternalDetails,
  SharePropertySubType,
} from "@/types/listingDetailPost.type";

type GetAnswerValueReturn =
  | RentInternalDetails
  | ShareInternalDetails
  | RentPropertySubType
  | SharePropertySubType
  | CapacityRent
  | CapacityShare
  | number[]
  | number
  | null;

const highlightIds: number[] = CATEGORY_OPTIONS[1].items.map(i => i.optionId);
const furnitureIds: number[] = Object.values(CATEGORY_OPTIONS[2].items)
  .flat()
  .map(i => i.optionId);
const isBrokeredIds: number[] = CATEGORY_OPTIONS[5].items.map(i => i.optionId);

export const getAnswerValue = (
  id: ListingDetailsOption["type"],
  store: UseListingStoreReturn,
): GetAnswerValueReturn => {
  const { listingType, optionItemIds } = store;

  switch (id) {
    case "internalDetails":
      return listingType === "RENT"
        ? store.rentInternalDetails
        : store.shareInternalDetails;
    case "propertyType":
      return listingType === "RENT"
        ? store.rentPropertyType
        : store.sharePropertyType;
    case "capacityPeople":
      return listingType === "RENT"
        ? store.rentCapacityPeople
        : store.shareCapacityPeople;
    case "highlights":
      return optionItemIds.filter(id => highlightIds.includes(id));
    case "furniture":
      return optionItemIds.filter(id => furnitureIds.includes(id));
    case "isBrokered":
      return optionItemIds.find(id => isBrokeredIds.includes(id)) ?? null;
    default:
      return null;
  }
};

export const getAnswerText = (
  id: ListingDetailsOption["type"],
  store: UseListingStoreReturn,
): string => {
  const answer = getAnswerValue(id, store);
  const { listingType } = store;

  if (id === "internalDetails") {
    const val = answer as unknown as Record<string, number>;
    if (!val) return "";
    const parts = [
      val.internalArea || val.totalArea ? "면적" : null,
      val.totalResidents ? "거주인" : null,
      val.totalBathUser ? "욕실 쉐어" : null,
      val.numberOfRoom ? "방 개수" : null,
      val.numberOfBath ? "욕실 개수" : null,
      val.totalFloors || val.propertyFloor ? "층수" : null,
    ].filter(Boolean);
    return [...new Set(parts)].join(", ");
  }

  switch (id) {
    case "isBrokered":
      return answer === 54 ? "개인임대" : "부동산 중개";
    case "highlights": {
      const highlights = answer as number[];
      const options = CATEGORY_OPTIONS[1].items;
      const matched = options.filter(i => highlights?.includes(i.optionId));
      return matched.length
        ? `${matched[0].label}${matched.length > 1 ? "···" : ""}`
        : "";
    }
    case "furniture": {
      const options = CATEGORY_OPTIONS[2].items;
      const categories = Object.entries(options)
        .filter(([, items]) =>
          items.some(i => (answer as number[])?.includes(i.optionId)),
        )
        .map(([category]) => category);
      return categories.join(", ");
    }
    case "propertyType":
      return listingType === "RENT"
        ? (RENT_TYPE_MAP[answer as keyof typeof RENT_TYPE_MAP] ?? "")
        : (SHARE_TYPE_MAP[answer as keyof typeof SHARE_TYPE_MAP] ?? "");
    case "capacityPeople":
      return typeof answer === "string"
        ? listingType === "RENT"
          ? CAPACITY_RENT_MAP[answer as keyof typeof CAPACITY_RENT_MAP]
          : CAPACITY_SHARE_MAP[answer as keyof typeof CAPACITY_SHARE_MAP]
        : "";
    default:
      return typeof answer === "string" ? answer : "";
  }
};

export const isAllAnswered = (
  questions: { id: string }[],
  store: UseListingStoreReturn,
): boolean => {
  const { listingType } = store;

  return questions.every(q => {
    const answer = getAnswerValue(q.id as ListingDetailsOption["type"], store);

    if (q.id === "highlights" && Array.isArray(answer)) {
      return answer.filter(id => highlightIds.includes(id)).length >= 5;
    }

    if (
      q.id === "internalDetails" &&
      typeof answer === "object" &&
      answer !== null &&
      !Array.isArray(answer)
    ) {
      const requiredKeys = [
        ...(listingType === "RENT"
          ? ["numberOfRoom", "numberOfBath"]
          : ["totalResidents", "totalBathUser"]),
        "internalArea",
      ];
      return requiredKeys.every(
        key =>
          typeof (answer as unknown as Record<string, number>)[key] ===
          "number",
      );
    }

    if (q.id === "isBrokered") return typeof answer === "number";
    if (Array.isArray(answer)) return answer.length > 0;
    if (typeof answer === "object" && answer !== null)
      return Object.keys(answer).length > 0;
    return Boolean(answer);
  });
};

export const LISTING_DETAILS_IDS = {
  highlightIds,
  furnitureIds,
  isBrokeredIds,
};
