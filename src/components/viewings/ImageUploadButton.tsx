import { useRef, useState } from "react";

import AlertMessage from "@/components/common/AlertMessage";

import CameraIcon from "@/public/svgs/viewings/camera-icon.svg";

interface ImageUploadButtonProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png"]; // 허용 MIME 타입

const ImageUploadButton = ({ images, setImages }: ImageUploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    // 허용된 이미지 타입만 필터링
    const validImages = fileArray.filter(file =>
      ALLOWED_TYPES.includes(file.type),
    );

    if (validImages.length !== fileArray.length) {
      setAlertMessage("JPG, PNG 파일만 업로드할 수 있어요");
      return;
    }

    // 최대 10장 제한
    if (images.length + validImages.length > 10) {
      setAlertMessage("최대 10장까지 업로드 가능합니다");
      return;
    }

    // Base64 변환
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
      setImages(prev => [...prev, ...newImages]);
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
