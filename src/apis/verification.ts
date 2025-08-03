import { VerificationType } from "@/types/auth";

import { axiosInstance } from "./axios";

export interface VerificationResponse {
  id: number;
  type: VerificationType;
  status: "PENDING" | "APPROVED" | "REJECTED";
  documentImageUrls: string[];
  rejectionReason: string | null;
  requestedAt: string;
  approvedAt: string | null;
  rejectedAt: string | null;
  memberId: number;
}

export interface SubmitVerificationRequest {
  type: VerificationType;
  documentImageUrls: string[];
}

/**
 * 인증 내역 조회
 */
export const getVerifications = async (): Promise<VerificationResponse[]> => {
  const res = await axiosInstance.get("/api/v1/verifications");
  return res.data.data;
};

/**
 * 인증 제출
 */
export const postVerification = async (
  payload: SubmitVerificationRequest,
): Promise<VerificationResponse> => {
  const res = await axiosInstance.post("/api/v1/verifications", payload);
  return res.data.data;
};
