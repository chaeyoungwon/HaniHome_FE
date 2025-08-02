import { Dispatch, SetStateAction } from "react";

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

interface UploadMultipleImageParams<T extends string = string> {
  files: FileList | File[];
  setPreviewUrls: Dispatch<SetStateAction<string[]>>;
  setUploadedFiles: Dispatch<SetStateAction<File[]>>;
  setField: (key: T, value: File[]) => void;
  fieldName: T;
  setShowErrorModal: Dispatch<SetStateAction<boolean>>;
  onUpload?: (file: File) => void;
  maxFiles?: number;
  onLimitExceeded?: () => void;
}

export const uploadMultipleImages = <T extends string = string>({
  files,
  setPreviewUrls,
  setUploadedFiles,
  setField,
  fieldName,
  setShowErrorModal,
  onUpload,
  maxFiles = 2,
  onLimitExceeded,
}: UploadMultipleImageParams<T>) => {
  const validFiles: File[] = [];
  const validUrls: string[] = [];

  for (const file of Array.from(files)) {
    const isValidType = ALLOWED_TYPES.includes(file.type);
    const isValidSize = file.size / 1024 / 1024 <= MAX_SIZE_MB;

    if (!isValidType || !isValidSize) {
      setShowErrorModal(true);
      continue;
    }

    validFiles.push(file);
    validUrls.push(URL.createObjectURL(file));
  }

  setUploadedFiles(prevFiles => {
    if (prevFiles.length + validFiles.length > maxFiles) {
      onLimitExceeded?.();
      return prevFiles;
    }

    const nextFiles = [...prevFiles, ...validFiles];

    setPreviewUrls(prevUrls => {
      const newUrls = validUrls.filter(url => !prevUrls.includes(url));
      return [...prevUrls, ...newUrls];
    });

    setField(fieldName, nextFiles);
    validFiles.forEach(file => onUpload?.(file));

    return nextFiles;
  });
};
