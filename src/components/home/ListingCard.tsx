import Image from "next/image";

import clsx from "clsx";

import { ListingCardProps } from "@/types/listingCard";

import HeartFilledIcon from "@/public/svgs/common/heart-filled-icon.svg";
import HeartOutlineIcon from "@/public/svgs/common/heart-outline-icon.svg";

const Dot = () => (
  <span className="inline-block h-1 w-1 rounded-full bg-gray-400" />
);

const ListingCard = ({
  image,
  price,
  status = "거래 중",
  area,
  floor,
  type,
  billIncluded,
  distance,
  location,
  timeAgo,
  likes,
  isLiked,
  onToggleLike,
  onClick,
  heartColor = "text-mint",
}: ListingCardProps) => {
  return (
    <div
      className={clsx(
        "flex cursor-pointer items-center justify-center gap-4 px-4 py-3",
        status !== "거래 중" && "opacity-60",
      )}
      onClick={onClick}
    >
      <Image
        src={image}
        width={108}
        height={108}
        alt="매물 이미지"
        className="h-27 w-27 rounded-sm border border-gray-200 object-cover"
      />

      <div className="flex h-24 flex-1 flex-col justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-[6px]">
            <p className="text-body1-sb text-gray-900">주/ {price}$</p>
            <span
              className={clsx(
                "text-cap1-med flex rounded-full border px-2 py-[2px]",
                status === "거래 중"
                  ? "border-violet bg-violet-ultralight text-violet"
                  : "border-gray-300 bg-white text-gray-700",
              )}
            >
              {status}
            </span>
          </div>

          <p className="text-cap1-med mt-2 flex items-center gap-1 text-gray-600">
            {area !== undefined && (
              <>
                {area}㎡{(floor !== undefined || type) && <Dot />}
              </>
            )}

            {floor !== undefined && (
              <>
                전체 {floor}층{type && <Dot />}
              </>
            )}

            {type}
          </p>

          <p className="text-cap1-med mt-[2px] flex items-center gap-1 text-gray-600">
            {billIncluded ? "빌 포함" : "빌 미포함"} <Dot /> 역까지 {distance}km
          </p>
        </div>

        <span className="text-cap1-med text-gray-500">{location}</span>
      </div>

      <div className="text-cap1-med flex h-24 flex-col items-end justify-between text-gray-500">
        <button
          onClick={e => {
            e.stopPropagation();
            onToggleLike();
          }}
          className="z-10 flex cursor-pointer items-center gap-1"
          aria-label="좋아요"
        >
          {isLiked ? (
            <HeartFilledIcon className={`h-[18px] w-[18px] ${heartColor}`} />
          ) : (
            <HeartOutlineIcon className={`h-[18px] w-[18px] ${heartColor}`} />
          )}
          {likes}
        </button>
        <span>{timeAgo}</span>
      </div>
    </div>
  );
};

export default ListingCard;
