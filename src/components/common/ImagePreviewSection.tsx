import CloseIcon from "@/public/svgs/common/close-icon.svg";

type SizeOption = "sm" | "md" | "lg";

const sizeClassMap: Record<
  SizeOption,
  {
    card: string;
    gap: string;
    border: string;
    rounded: string;
    buttonPosition: string;
    iconSize: string;
  }
> = {
  sm: {
    card: "h-[160px] w-[160px]",
    gap: "gap-3",
    border: "border-[0.571px]",
    rounded: "rounded-[4px]",
    buttonPosition: "top-2 right-3",
    iconSize: "h-[18px] w-[18px]",
  },
  md: {
    card: "h-[200px] w-[200px]",
    gap: "gap-4",
    border: "border-[0.714px]",
    rounded: "rounded-[6px]",
    buttonPosition: "top-3 right-3",
    iconSize: "h-[22.5px] w-[22.5px]",
  },
  lg: {
    card: "h-[280px] w-[280px]",
    gap: "gap-2",
    border: "border",
    rounded: "rounded-[8px]",
    buttonPosition: "top-2 right-3",
    iconSize: "h-6 w-6",
  },
};

interface ImagePreviewSectionProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  size?: SizeOption;
}

const ImagePreviewSection = ({
  images,
  setImages,
  size = "md",
}: ImagePreviewSectionProps) => {
  if (images.length === 0) return null;

  const { card, gap, border, rounded, buttonPosition, iconSize } =
    sizeClassMap[size];

  return (
    <div className="scrollbar-hide my-4 max-w-[375px] overflow-x-auto">
      <div className={`inline-flex min-w-fit px-4 ${gap}`}>
        {images.map((src, index) => (
          <div
            key={index}
            className={`relative ${card} ${border} ${rounded} shrink-0 overflow-hidden border-gray-300`}
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
              className={`absolute ${buttonPosition} cursor-pointer`}
            >
              <CloseIcon className={`${iconSize} text-gray-900`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreviewSection;
