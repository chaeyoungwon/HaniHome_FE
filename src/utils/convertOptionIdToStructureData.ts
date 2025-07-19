import { buildOptionIdMap } from "@/utils/buildOptionIdMap";

import { AdditionalInfo, Furniture } from "@/types/listingDetail";

export const convertOptionIdsToStructuredData = (
  optionItemIds: number[] | null,
) => {
  const optionIdMap = buildOptionIdMap();

  if (!optionItemIds || optionItemIds.length === 0) {
    return {
      highlights: [],
      furniture: null,
      additionalInfo: null,
      isBrokered: null,
      includedItems: [],
    };
  }
  const highlights: string[] = [];
  const furniture: Furniture = {};
  const additionalInfoRaw: Record<string, string[]> = {};
  let isBrokered: boolean | null = null;
  const includedItems: string[] = [];

  optionItemIds.forEach(id => {
    const mapping = optionIdMap.get(id);
    if (!mapping) return;

    const { categoryKey, subCategory, label } = mapping;

    if (categoryKey === "highlights") {
      highlights.push(label);
    } else if (categoryKey === "furniture" && subCategory) {
      if (!furniture[subCategory]) furniture[subCategory] = [];
      furniture[subCategory].push(label);
    } else if (categoryKey === "additionalInfo" && subCategory) {
      if (!additionalInfoRaw[subCategory]) additionalInfoRaw[subCategory] = [];
      additionalInfoRaw[subCategory].push(label);
    } else if (categoryKey === "isBrokered") {
      isBrokered = label === "부동산 중개";
    } else if (categoryKey === "includedItems") {
      includedItems.push(label);
    }
  });

  // 추가정보 형태 변환
  const additionalInfo: AdditionalInfo = {
    smokingAllowed: additionalInfoRaw["흡연자"]?.includes("가능") ?? false,
    petsAllowed: additionalInfoRaw["반려동물"]?.includes("가능") ?? false,
    visitorsAllowed: additionalInfoRaw["외부인방문"]?.includes("가능") ?? false,
    parking: additionalInfoRaw["주차"] || [],
    kitchenAccess: additionalInfoRaw["주방"]?.includes("가능") ?? false,
  };

  return {
    highlights,
    furniture: Object.keys(furniture).length ? furniture : null,
    additionalInfo,
    isBrokered,
    includedItems,
  };
};
