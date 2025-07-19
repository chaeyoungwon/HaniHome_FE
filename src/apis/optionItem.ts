import { axiosInstance } from "./axios";

export interface OptionItem {
  optionItemId: number;
  itemName: string;
  isActive: boolean;
  isCustom: boolean;
  categoryId: number;
  categoryName: string;
  parentItemId: number | null;
}

export const getOptionItemsByCategory = async (
  categoryCode: string,
): Promise<OptionItem[]> => {
  const res = await axiosInstance.get<{ data: OptionItem[] }>(
    `/api/v1/viewings/categories/${categoryCode}/option-items`,
  );
  return res.data.data;
};
