import { useQuery } from "@tanstack/react-query";

import { fetchMetroStops } from "@/apis/metroApi";

export const useMetroStops = () => {
  return useQuery({
    queryKey: ["metroStops"],
    queryFn: fetchMetroStops,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
