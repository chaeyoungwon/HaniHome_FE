"use client";

import { useRef, useState } from "react";

import { useSignupStore } from "@/stores/useSignupStore";
import clsx from "clsx";

import PlusIcon from "@/public/svgs/common/plus-icon.svg";

import ImageAlertModal from "./ImageAlertModal";

interface ProfileImageUploaderProps {
  onUpload?: (file: File) => void;
}

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const ProfileImageUploader = ({ onUpload }: ProfileImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { profileimg, setField } = useSignupStore();
  const [previewUrl, setPreviewUrl] = useState(profileimg || "");

  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidType = ALLOWED_TYPES.includes(file.type);
    const isValidSize = file.size / 1024 / 1024 <= MAX_SIZE_MB;

    if (!isValidType || !isValidSize) {
      setShowErrorModal(true);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setField("profileimg", url);
    onUpload?.(file);
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-12">
      <div
        className={clsx(
          "h-[114px] w-[114px] cursor-pointer overflow-hidden rounded-[57px] bg-white",
          previewUrl ? "border border-gray-600" : "border border-gray-300",
        )}
        onClick={() => inputRef.current?.click()}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="프로필 이미지"
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
