// 카테고리옵션 데이터 평탄화
import { CATEGORY_OPTIONS } from "@/constants/propertyCategory";

interface OptionMapping {
  optionId: number;
  label: string;
  categoryKey: string;
  subCategory?: string;
}

export const buildOptionIdMap = () => {
  const optionIdMap = new Map<number, OptionMapping>();

  Object.values(CATEGORY_OPTIONS).forEach(category => {
    if (Array.isArray(category.items)) {
      category.items.forEach((item: { optionId: number; label: string }) => {
        optionIdMap.set(item.optionId, {
          optionId: item.optionId,
          label: item.label,
          categoryKey: category.key,
        });
      });
    } else {
      Object.entries(category.items).forEach(([subCategory, items]) => {
        items.forEach((item: { optionId: number; label: string }) => {
          optionIdMap.set(item.optionId, {
            optionId: item.optionId,
            label: item.label,
            categoryKey: category.key,
            subCategory,
          });
        });
      });
    }
  });
  return optionIdMap;
};
