import { useRef } from "react";

import CameraIcon from "@/public/svgs/viewings/camera-icon.svg";

interface ImageUploadButtonProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageUploadButton = ({ images, setImages }: ImageUploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    // 최대 10장 제한
    if (images.length + fileArray.length > 10) {
      alert("이미지는 최대 10장까지 업로드할 수 있어요.");
      return;
    }

    const readers = fileArray.map(
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
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};

export default ImageUploadButton;
