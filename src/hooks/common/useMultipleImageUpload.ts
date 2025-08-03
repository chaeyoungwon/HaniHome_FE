import { useState } from "react";

import { PresignedUrlResponse } from "@/apis/s3Upload";

import { uploadFilesToPresignedUrls } from "@/utils/images/uploadFilesToPresignedUrls";

import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_MB,
} from "@/constants/profile-uploader";

interface UseMultipleImageUploadProps {
  maxImageCount: number;
  setPreviewUrls: React.Dispatch<React.SetStateAction<string[]>>;
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  getPresignedUrls: (
    fileExtensions: string[],
  ) => Promise<PresignedUrlResponse[]>;
  setShowErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const useMultipleImageUpload = ({
  maxImageCount,
  setPreviewUrls,
  setUploadedFiles,
  getPresignedUrls,
  setShowErrorModal,
}: UseMultipleImageUploadProps) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    previewUrls: string[],
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    // 유효하지 않은 파일이 하나라도 있다면 에러 처리
    const invalidFileExists = fileArray.some(file => {
      const isValidType = ALLOWED_IMAGE_TYPES.includes(file.type);
      const isValidSize = file.size / 1024 / 1024 <= MAX_IMAGE_SIZE_MB;
      return !isValidType || !isValidSize;
    });

    if (invalidFileExists) {
      setShowErrorModal(true);
      e.target.value = "";
      return;
    }

    // 유효한 파일만 필터링
    const validFiles = fileArray.filter(file => {
      const isValidType = ALLOWED_IMAGE_TYPES.includes(file.type);
      const isValidSize = file.size / 1024 / 1024 <= MAX_IMAGE_SIZE_MB;
      return isValidType && isValidSize;
    });

    const totalCount = previewUrls.length + validFiles.length;
    if (totalCount > maxImageCount) {
      setAlertMessage(
        `이미지는 최대 ${maxImageCount}장까지 업로드할 수 있어요.`,
      );
      e.target.value = "";
      return;
    }

    try {
      const fileExtensions = validFiles.map(file => file.type.split("/")[1]);
      const presignedUrls = await getPresignedUrls(fileExtensions);

      await uploadFilesToPresignedUrls(validFiles, presignedUrls);

      setPreviewUrls(prev => [...prev, ...presignedUrls.map(p => p.fileUrl)]);
      setUploadedFiles(prev => [...prev, ...validFiles]);
    } catch (error) {
      console.error("이미지 업로드 중 에러 발생:", error);
      setShowErrorModal(true);
    }

    e.target.value = "";
  };

  return { handleFileChange, alertMessage };
};

export default useMultipleImageUpload;
