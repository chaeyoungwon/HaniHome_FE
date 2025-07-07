import Image from "next/image";

import CloseIcon from "@/public/svgs/common/close-icon.svg";

interface VerifyImageUploaderProps {
  images: string[];
  onDelete: (index: number) => void;
}

const VerifyImageUploader = ({ images, onDelete }: VerifyImageUploaderProps) => {
  return (
    <div className="flex gap-3">
      {images.map((src, idx) => (
        <div
          key={idx}
          className="relative h-40 w-40 overflow-hidden rounded-[4px] border border-gray-300"
        >
          <Image
            src={src}
            alt={`uploaded-${idx}`}
            fill
            className="object-cover"
            sizes="160px"
          />

          <button
            className="absolute top-4 right-3 z-20 cursor-pointer"
            onClick={() => onDelete(idx)}
          >
            <CloseIcon className="h-[18px] w-[18px]" />
          </button>
        </div>
      ))}
    </div>
  );
};
export default VerifyImageUploader;
