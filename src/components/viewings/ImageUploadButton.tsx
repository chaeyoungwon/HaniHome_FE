import { useRef, useState } from "react";

import AlertMessage from "@/components/common/AlertMessage";

import CameraIcon from "@/public/svgs/viewings/camera-icon.svg";

interface ImageUploadButtonProps {
  existingImages: string[];
  newImagePreviews: string[];
  setNewImagePreviews: React.Dispatch<React.SetStateAction<string[]>>;
  setNewFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const ImageUploadButton = ({
  existingImages,
  newImagePreviews,
  setNewImagePreviews,
  setNewFiles,
}: ImageUploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const fileArray = Array.from(selectedFiles);

    const validImages = fileArray.filter(file =>
      ALLOWED_TYPES.includes(file.type),
    );

    if (validImages.length !== fileArray.length) {
      setAlertMessage("JPG, PNG 파일만 업로드할 수 있어요");
      return;
    }

    const totalImageCount =
      existingImages.length + newImagePreviews.length + validImages.length;

    if (totalImageCount > 10) {
      setAlertMessage("최대 10장까지 업로드 가능합니다");
      return;
    }

    // 미리보기용 Base64 생성
    const readers = validImages.map(
      file =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        }),
    );

    Promise.all(readers).then(newImages => {
      setNewImagePreviews(prev => [...prev, ...newImages]);
      setNewFiles(prev => [...prev, ...validImages]); // 실제 파일도 저장
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={handleUploadClick}
        className="flex cursor-pointer flex-col items-center gap-1"
      >
        <CameraIcon />
        <span className="text-cap1-med text-gray-800">사진</span>
      </button>

      <input
        type="file"
        multiple
        accept={ALLOWED_TYPES.join(",")}
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          className="bottom-23"
          onDone={() => setAlertMessage(null)}
        />
      )}
    </>
  );
};

export default ImageUploadButton;
