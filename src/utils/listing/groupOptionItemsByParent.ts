import { OptionItem } from "@/types/property.type";

export const groupOptionItemsByParent = (items: OptionItem[]) => {
  // 아이디순 정렬
  const sorted = [...items].sort((a, b) => a.optionItemId - b.optionItemId);

  // 상위 항목 찾기
  const parents = sorted.filter(item => item.parentItemId === null);

  // 그룹핑
  return parents.map(parent => ({
    title: parent.itemName,
    items: sorted
      .filter(item => item.parentItemId === parent.optionItemId)
      .map(item => ({
        id: item.optionItemId,
        label: item.itemName,
      })),
  }));
};
