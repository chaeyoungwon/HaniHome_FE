import { useAuthStore } from "@/stores/useAuthStore";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addWish,
  getMyWishList,
  getWishedProperties,
  removeWish,
} from "@/apis/wishlist";

import { WishListSortType } from "@/types/wishlist";

export const useWishList = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return useQuery({
    queryKey: ["wishList"],
    queryFn: getMyWishList,
    enabled: isLoggedIn,
  });
};

export const useWishedProperties = (sort: WishListSortType = "latest") => {
  return useQuery({
    queryKey: ["wishList", sort],
    queryFn: () => getWishedProperties(sort),
    staleTime: 0,
  });
};

export const useToggleWish = (refetchKeys: QueryKey[] = [["wishList"]]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isLiked }: { id: number; isLiked: boolean }) => {
      if (isLiked) {
        await removeWish(id);
      } else {
        await addWish(id);
      }
    },
    onSuccess: () => {
      refetchKeys.forEach(key => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
  });
};
