import { MetroStop } from "@/types/metro";

import { axiosInstance } from "./axios";

export const fetchMetroStops = async (): Promise<MetroStop[]> => {
  const res = await axiosInstance.get("/api/v1/metro/stops");
  return res.data.data;
};
