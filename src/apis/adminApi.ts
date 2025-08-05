import { axiosInstance } from "./axios";

export const getOneOnOneConsultList = async (
  status?: "REQUESTED" | "COMPLETED",
) => {
  const res = await axiosInstance.get("/api/v1/admin/one-on-one-consult", {
    params: { status },
  });
  return res.data.data;
};

export const postOneOnOneReply = async (
  oneOnOneConsultId: number,
  body: { customerId: number },
) => {
  const res = await axiosInstance.post(
    `/api/v1/admin/one-on-one-consult/${oneOnOneConsultId}/reply`,
    body,
  );
  return res.data.data;
};
