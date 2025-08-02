import { Dispatch, SetStateAction } from "react";

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

interface UploadImageParams<T extends string = string> {
  file: File;
  setPreviewUrl: Dispatch<SetStateAction<string>>;
  setField: (key: T, value: string) => void;
  fieldName: T;
  setShowErrorModal: Dispatch<SetStateAction<boolean>>;
  onUpload?: (file: File) => void;
}

export const uploadImage = <T extends string = string>({
  file,
  setPreviewUrl,
  setField,
  fieldName,
  setShowErrorModal,
  onUpload,
}: UploadImageParams<T>) => {
  const isValidType = ALLOWED_TYPES.includes(file.type);
  const isValidSize = file.size / 1024 / 1024 <= MAX_SIZE_MB;

  if (!isValidType || !isValidSize) {
    setShowErrorModal(true);
    return;
  }

  const url = URL.createObjectURL(file);
  setPreviewUrl(url);
  setField(fieldName, url);
  onUpload?.(file);
};
