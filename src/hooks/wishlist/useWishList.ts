import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";

import { getMyWishList } from "@/apis/wishlist";

export const useWishList = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return useQuery({
    queryKey: ["wishList"],
    queryFn: getMyWishList,
    enabled: isLoggedIn,
  });
};
