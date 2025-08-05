import { axiosInstance } from "./axios";

export const postOneOnOneConsult = async (body: {
  content: string;
  email: string;
}) => {
  const res = await axiosInstance.post("/api/v1/one-on-one-consult", body);
  return res.data.data;
};
