"use client";

import Image from "next/image";

import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { formatRelativeTime } from "@/utils/dateFormatter";
import {
  getDisplayStatus,
  getDisplayType,
  getDistanceInKm,
} from "@/utils/propertyFormatter";

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
  kind,
  nearestStation,
  billIncluded,
  suburb,
  createdAt,
  wishCount,
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
        getDisplayStatus(tradeStatus) !== "거래 중" && "opacity-60",
      )}
    >
      <Image
        src={thumbnailUrl ?? ""}
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
              주/ {weeklyCost.toLocaleString()}$
            </div>
            <div
              className={clsx(
                "text-cap1-med flex h-5 items-center justify-center rounded-[100px] border",
                tradeStatus === "BEFORE"
                  ? "border-violet bg-violet-ultralight text-violet w-[50px]"
                  : "w-[58px] border-gray-300 text-gray-700",
              )}
            >
              {getDisplayStatus(tradeStatus)}
            </div>
          </div>

          {/* 정보 */}
          <div className="text-cap1-med flex flex-row gap-1 pb-[2px] text-gray-600">
            <div>{internalArea}㎡</div>
            <div className="text-gray-300">•</div>
            <div>전체 {totalFloors}층</div>
            <div className="text-gray-300">•</div>
            <div> {getDisplayType(kind)}</div>
          </div>

          <div className="text-cap1-med flex flex-row gap-1 pb-4 text-gray-600">
            <div>{billIncluded ? "빌 포함" : "빌 미포함"}</div>
            <div className="text-gray-300">•</div>
            <div> {getDistanceInKm(nearestStation.distanceFromStation)}km</div>
          </div>

          <div className="text-cap1-med text-gray-500">
            {suburb.toLowerCase()}
          </div>
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
                <FilledHeart className={`${heartColor} h-6 w-6`} />
              ) : (
                <EmptyHeart className={`${heartColor} h-6 w-6`} />
              )}
            </div>
            <div className="text-cap1-med text-center text-gray-400">
              {wishCount}
            </div>
          </div>

          <div className="text-cap1-med text-gray-500">
            {formatRelativeTime(createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomList;
