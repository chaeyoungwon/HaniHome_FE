import CloseIcon from "@/public/svgs/common/close-icon.svg";

interface ImagePreviewSectionProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImagePreviewSection = ({
  images,
  setImages,
}: ImagePreviewSectionProps) => {
  if (images.length === 0) return null;

  return (
    <div className="scrollbar-hide my-4 h-50 max-w-[375px] overflow-x-auto">
      <div className="inline-flex min-w-fit gap-4 px-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative h-50 w-50 shrink-0 overflow-hidden rounded-md border-[0.714px] border-gray-300"
          >
            <img
              src={src}
              alt={`uploaded-${index}`}
              className="h-full w-full object-cover"
            />
            <button
              onClick={() =>
                setImages(prev => prev.filter((_, i) => i !== index))
              }
              className="absolute top-3 right-3"
            >
              <CloseIcon className="h-6 w-6 text-gray-900" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreviewSection;
