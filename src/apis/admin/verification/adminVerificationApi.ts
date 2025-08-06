import { axiosInstance } from "@/apis/axios";
import { VerificationDetail } from "@/types/admin/verification";

export const fetchVerifications = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/admin/verifications");
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch verifications:", error);
    }
};

export const fetchVerificationDetail = async (id: number): Promise<VerificationDetail | undefined> => {
    try {
      const response = await axiosInstance.get(`/api/v1/admin/verifications/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch verification:", error);
    }
};

export const approveVerification = async (id: number): Promise<void> => {
  try {
    await axiosInstance.patch(`/api/v1/admin/verifications/${id}/approve`);
  } catch (error) {
    console.error("Failed to approve verification:", error);
    throw error;
  }
};

export const rejectVerification = async (id: number, reason: string): Promise<void> => {
  try {
    await axiosInstance.patch(`/api/v1/admin/verifications/${id}/reject`, { reason });
  } catch (error) {
    console.error("Failed to reject verification:", error);
    throw error;
  }
};

