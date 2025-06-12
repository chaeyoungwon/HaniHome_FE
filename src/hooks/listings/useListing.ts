// import { getListingDetail } from "@/api/listing";
import { useQuery } from "@tanstack/react-query";

export const useListing = (listingId: string) => {
  return useQuery({
    queryKey: ["listing", listingId],
    // queryFn: () => getListingDetail(listingId),
  });
};
