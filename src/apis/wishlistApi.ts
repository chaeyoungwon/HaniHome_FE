import { SummaryProperty } from "@/types/property.type";
import { WishListSortType } from "@/types/wishlist.type";

import { axiosInstance } from "./axios";

export const addWish = async (propertyId: number) => {
  await axiosInstance.post("/api/v1/wish-items", {
    targetType: "PROPERTY",
    targetId: propertyId,
  });
};

export const removeWish = async (propertyId: number) => {
  await axiosInstance.delete(`/api/v1/wish-items`, {
    data: {
      targetType: "PROPERTY",
      targetId: propertyId,
    },
  });
};

export const getWishedProperties = async (
  sort: WishListSortType = "latest",
): Promise<SummaryProperty[]> => {
  const res = await axiosInstance.get("/api/v1/wish-items/properties", {
    params: { sort },
  });

  return res.data.data ?? [];
};

export const getMyWishList = async (): Promise<SummaryProperty[]> => {
  const res = await axiosInstance.get("/api/v1/wish-items");
  return res.data.data.PROPERTY ?? [];
};
