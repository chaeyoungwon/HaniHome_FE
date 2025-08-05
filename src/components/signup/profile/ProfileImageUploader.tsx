"use client";

import { useEffect, useRef, useState } from "react";

import clsx from "clsx";

import { getProfilePresignedUrl } from "@/apis/s3UploadApi";

import { useSingleImageUpload } from "@/hooks/common/useSingleImageUpload";

import { PROFILE_IMAGE_SIZE_CLASS } from "@/constants/profile-uploader";

import PlusIcon from "@/public/svgs/common/plus-icon.svg";

import ImageAlertModal from "./ImageAlertModal";

interface ProfileImageUploaderProps {
  size?: number;
  value?: string | null;
  onChange?: (uploadedUrl: string) => void;
}

const ProfileImageUploader = ({
  size = 114,
  value = null,
  onChange,
}: ProfileImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value);

  useEffect(() => {
    setPreviewUrl(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const { handleSingleFileUpload } = useSingleImageUpload({
    getPresignedUrl: getProfilePresignedUrl,
    setShowErrorModal,
    onUploadSuccess: (uploadedUrl: string) => {
      setPreviewUrl(uploadedUrl);
      onChange?.(uploadedUrl);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setPreviewUrl(blobUrl); // 임시 프리뷰 먼저 표시
      handleSingleFileUpload(file);
    }
    e.target.value = ""; // 같은 파일 다시 선택 가능하도록 초기화
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={clsx(
          PROFILE_IMAGE_SIZE_CLASS[size],
          "cursor-pointer overflow-hidden rounded-full bg-white",
          previewUrl ? "border border-gray-600" : "border border-gray-300",
        )}
        onClick={() => inputRef.current?.click()}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="프로필"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <PlusIcon className="h-6 w-6" />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {showErrorModal && (
        <ImageAlertModal onClose={() => setShowErrorModal(false)} />
      )}
    </div>
  );
};

export default ProfileImageUploader;
