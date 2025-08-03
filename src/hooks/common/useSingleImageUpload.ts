import { uploadFilesToPresignedUrls } from "@/utils/images/uploadFilesToPresignedUrls";

import {
  ALLOWED_IMAGE_TYPES,
  IMAGE_MIME_TO_EXT,
  MAX_IMAGE_SIZE_MB,
} from "@/constants/profile-uploader";

interface UseSingleImageUploadProps {
  onUploadSuccess: (url: string) => void;
  setShowErrorModal: (val: boolean) => void;
  getPresignedUrl: (ext: string) => Promise<{
    presignedUrl: string;
    fileUrl: string;
  }>;
}

export const useSingleImageUpload = ({
  onUploadSuccess,
  setShowErrorModal,
  getPresignedUrl,
}: UseSingleImageUploadProps) => {
  const handleSingleFileUpload = async (file: File) => {
    const isValidType = ALLOWED_IMAGE_TYPES.includes(file.type);
    const isValidSize = file.size / 1024 / 1024 <= MAX_IMAGE_SIZE_MB;

    if (!isValidType || !isValidSize) {
      setShowErrorModal(true);
      return;
    }

    try {
      const ext = IMAGE_MIME_TO_EXT[file.type] || "jpg";
      const { presignedUrl, fileUrl } = await getPresignedUrl(ext);
      await uploadFilesToPresignedUrls([file], [{ presignedUrl, fileUrl }]);
      onUploadSuccess(fileUrl);
    } catch (e) {
      console.error("단일 이미지 업로드 실패:", e);
    }
  };

  return { handleSingleFileUpload };
};
