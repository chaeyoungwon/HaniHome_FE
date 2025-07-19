import { axiosInstance } from "@/apis/axios";

export interface PresignedUrlResponse {
  presignedUrl: string;
  fileUrl: string;
}

// 인증 타입 enum
export type VerificationType = "ID_CARD" | "PASSPORT" | "DRIVER_LICENSE";

/* 프로필 이미지 업로드용 Presigned URL 요청*/
export const getProfilePresignedUrl = async (
  fileExtension: string,
): Promise<PresignedUrlResponse> => {
  const res = await axiosInstance.post("/api/v1/s3/profiles/presigned-url", {
    fileExtension: fileExtension,
  });
  return res.data.data;
};

/* 인증 이미지 업로드용 Presigned URL 요청 
 @param type - 인증 타입 (ID_CARD | PASSPORT | DRIVER_LICENSE)
 */
export const getVerificationPresignedUrl = async (
  type: VerificationType,
  fileExtensions: string[],
): Promise<PresignedUrlResponse> => {
  const res = await axiosInstance.post(
    "/api/v1/s3/verifications/presigned-url",
    {
      type,
      fileExtensions,
    },
  );
  return res.data.data;
};

/* 매물 기록 이미지 업로드용 Presigned URL 요청 */
export const getPropertyNotePresignedUrl = async (
  fileExtensions: string[],
): Promise<PresignedUrlResponse[]> => {
  const res = await axiosInstance.post(
    "/api/v1/s3/viewings/property-notes/presigned-url",
    { fileExtensions },
  );

  return res.data.data;
};
