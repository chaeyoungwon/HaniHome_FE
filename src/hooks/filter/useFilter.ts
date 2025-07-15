import { useQuery } from "@tanstack/react-query";

import { fetchPropertySearch } from "@/apis/property";

import { FilteredPropertyParams } from "@/types/property";

export const usePropertySearch = (
  params: FilteredPropertyParams,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ["propertySearch", params],
    queryFn: () => fetchPropertySearch(params),
    enabled: options?.enabled ?? true,
  });
};
