import Image from "next/image";

import clsx from "clsx";

interface ImageSliderProps {
  images: string[];
  onRemove?: (index: number) => void;
  className?: string;
}

const ImageSlider = ({
  images,
  onRemove,
  className = "",
}: ImageSliderProps) => {
  return (
    <div
      className={clsx("scrollbar-hide w-full overflow-x-auto py-3", className)}
    >
      <div className="flex w-max gap-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative h-[280px] w-[280px] flex-shrink-0"
          >
            <Image
              src={src}
              alt={`image${index}`}
              fill
              className="rounded-lg border border-gray-300 object-cover"
            />
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-4 right-5 z-10 cursor-pointer"
              >
                <Image
                  src="/svgs/common/close-icon.svg"
                  alt="삭제"
                  width={24}
                  height={24}
                />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
