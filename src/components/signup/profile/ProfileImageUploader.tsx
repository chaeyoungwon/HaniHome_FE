"use client";

import { useEffect, useRef, useState } from "react";

import clsx from "clsx";

import { getProfilePresignedUrl } from "@/apis/s3Upload";

import {
  ALLOWED_IMAGE_TYPES,
  IMAGE_MIME_TO_EXT,
  MAX_IMAGE_SIZE_MB,
  PROFILE_IMAGE_SIZE_CLASS,
} from "@/constants/profile-uploader";

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

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidType = ALLOWED_IMAGE_TYPES.includes(file.type);
    const isValidSize = file.size / 1024 / 1024 <= MAX_IMAGE_SIZE_MB;

    if (!isValidType || !isValidSize) {
      setShowErrorModal(true);
      return;
    }

    // 프리뷰 표시용 blob URL
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);

    try {
      // S3 presigned URL 받아오기
      const ext = IMAGE_MIME_TO_EXT[file.type] || "jpg";
      const { presignedUrl, fileUrl } = await getProfilePresignedUrl(ext);

      // 실제 업로드
      await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      setPreviewUrl(fileUrl);
      onChange?.(fileUrl);
    } catch (err) {
      console.error("S3 업로드 실패", err);
    }
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
