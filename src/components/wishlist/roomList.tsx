"use client";

import Image from "next/image";

import clsx from "clsx";

import { ListingCardProps } from "@/types/listingCard";

import FilledHeart from "@/public/svgs/common/heart-filled-icon.svg";
import EmptyHeart from "@/public/svgs/common/heart-outline-icon.svg";

const RoomList = ({
  image,
  price,
  status,
  area,
  floor,
  type,
  options,
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
      onClick={onClick}
      className={clsx(
        "flex cursor-pointer flex-row gap-4 px-4 py-3",
        status !== "거래 중" && "opacity-60",
      )}
    >
      <Image
        src={image}
        alt="thumbnail"
        width={108}
        height={108}
        unoptimized
        className="self-center rounded-[4px]"
        style={{ width: "108px", height: "108px", objectFit: "cover" }}
      />

      <div className="flex w-full items-end justify-between py-2">
        <div className="flex flex-col">
          {/* 가격 + 상태 */}
          <div className="flex flex-row gap-[6px] pb-2">
            <div className="text-body1-sb text-gray-900">{price}</div>
            <div
              className={clsx(
                "text-cap1-med flex h-5 items-center justify-center rounded-[100px] border",
                status === "거래 중"
                  ? "border-violet bg-violet-ultralight text-violet w-[50px]"
                  : "w-[58px] border-gray-300 text-gray-700",
              )}
            >
              {status}
            </div>
          </div>

          {/* 정보들 */}
          <div className="text-cap1-med flex flex-row gap-1 pb-[2px] text-gray-600">
            <div>{area}</div>
            <div className="text-gray-300">•</div>
            <div>{floor}</div>
            <div className="text-gray-300">•</div>
            <div>{type}</div>
          </div>

          <div className="text-cap1-med flex flex-row gap-1 pb-4 text-gray-600">
            <div>{options}</div>
            <div className="text-gray-300">•</div>
            <div>{distance}</div>
          </div>

          <div className="text-cap1-med text-gray-500">{location}</div>
        </div>

        {/* 우측 하트 및 시간 */}
        <div className="flex flex-col items-end gap-3">
          <div className="flex flex-col gap-1">
            <div
              onClick={e => {
                e.stopPropagation();
                onToggleLike();
              }}
              className="cursor-pointer"
            >
              {isLiked ? (
                <FilledHeart className={heartColor} />
              ) : (
                <EmptyHeart className={heartColor} />
              )}
            </div>
            <div className="text-cap1-med text-center text-gray-400">
              {likes}
            </div>
          </div>

          <div className="text-cap1-med text-gray-500">{timeAgo}</div>
        </div>
      </div>
    </div>
  );
};

export default RoomList;
