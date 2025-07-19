import { useQuery } from "@tanstack/react-query";

import { OptionItem, getOptionItemsByCategory } from "@/apis/optionItem";

export const useOptionItems = (categoryCode: string) => {
  return useQuery<OptionItem[]>({
    queryKey: ["optionItems", categoryCode],
    queryFn: () => getOptionItemsByCategory(categoryCode),
    select: data => [...data].sort((a, b) => a.optionItemId - b.optionItemId),
  });
};

export const useCancelReasons = (userType: "host" | "guest") => {
  const categoryCode = userType === "guest" ? "VIEWING_CAT1" : "VIEWING_CAT3";

  return useQuery<OptionItem[]>({
    queryKey: ["cancelReasons", userType],
    queryFn: () => getOptionItemsByCategory(categoryCode),
    select: data => [...data].sort((a, b) => a.optionItemId - b.optionItemId),
  });
};
