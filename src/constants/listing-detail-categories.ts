export type CategoryItem = {
  key: string;
  label: string;
};

export const commonDetailCategories: CategoryItem[] = [
  { key: "kind", label: "매물 종류" },
  { key: "region", label: "주소" },
  { key: "capacityPeople", label: "거주 가능 인원" },
  { key: "internalDetails", label: "매물 정보" },
  { key: "highlights", label: "매물 장점" },
  { key: "furniture", label: "기본 제공 가구" },
  { key: "genderPreference", label: "게스트 성별" },
  { key: "livingConditions", label: "거주 조건" },
  { key: "costDetails", label: "거래 비용" },
  { key: "moveInInfo", label: "입주 가능일" },
  { key: "additionalInfo", label: "추가 항목" },
  { key: "description", label: "호스트 설명" },
];

export const shareDetailCategories: CategoryItem[] = [
  { key: "sharePropertySubType", label: "매물 유형" },
];

export const rentDetailCategories: CategoryItem[] = [
  { key: "rentPropertySubType", label: "매물 유형" },
  { key: "isBrokered", label: "부동산 중개 여부" },
];
