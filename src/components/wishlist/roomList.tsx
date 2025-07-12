"use client";

import Image from "next/image";

import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { ListingCardProps } from "@/types/listingCard";

import FilledHeart from "@/public/svgs/common/heart-filled-icon.svg";
import EmptyHeart from "@/public/svgs/common/heart-outline-icon.svg";

dayjs.extend(relativeTime);

const RoomList = ({
  thumbnailUrl,
  weeklyCost,
  tradeStatus = "BEFORE",
  internalArea,
  totalFloors,
  propertySubType,
  billIncluded,
  suburb,
  createdAt,
  wishCount,
  isLiked,
  onToggleLike,
  onClick,
  heartColor = "text-mint",
}: ListingCardProps) => {
  const statusText = tradeStatus === "BEFORE" ? "거래 중" : "거래 완료";
  const typeText = propertySubType === "SECOND_ROOM" ? "쉐어" : "렌트";
  const distanceText = "역까지 0.5km"; // mock
  const timeAgo = dayjs(createdAt).fromNow();

  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex cursor-pointer flex-row gap-4 px-4 py-3",
        statusText !== "거래 중" && "opacity-60",
      )}
    >
      <Image
        src={thumbnailUrl ?? "/svgs/common/room-img.svg"}
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
            <div className="text-body1-sb text-gray-900">
              {weeklyCost.toLocaleString()}원
            </div>
            <div
              className={clsx(
                "text-cap1-med flex h-5 items-center justify-center rounded-[100px] border",
                tradeStatus === "BEFORE"
                  ? "border-violet bg-violet-ultralight text-violet w-[50px]"
                  : "w-[58px] border-gray-300 text-gray-700",
              )}
            >
              {statusText}
            </div>
          </div>

          {/* 정보 */}
          <div className="text-cap1-med flex flex-row gap-1 pb-[2px] text-gray-600">
            <div>{internalArea}㎡</div>
            <div className="text-gray-300">•</div>
            <div>전체 {totalFloors}층</div>
            <div className="text-gray-300">•</div>
            <div>{typeText}</div>
          </div>

          <div className="text-cap1-med flex flex-row gap-1 pb-4 text-gray-600">
            <div>{billIncluded ? "빌 포함" : "빌 미포함"}</div>
            <div className="text-gray-300">•</div>
            <div>{distanceText}</div>
          </div>

          <div className="text-cap1-med text-gray-500">{suburb}</div>
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
              {wishCount}
            </div>
          </div>

          <div className="text-cap1-med text-gray-500">{timeAgo}</div>
        </div>
      </div>
    </div>
  );
};

export default RoomList;
