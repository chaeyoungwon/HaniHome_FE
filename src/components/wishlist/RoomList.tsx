"use client";

import Image from "next/image";

import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { formatRelativeTime } from "@/utils/formatter/dateFormatter";
import {
  getArea,
  getDisplayStatus,
  getDisplayType,
  getDistanceInKm,
} from "@/utils/formatter/propertyFormatter";

import { ListingCardProps } from "@/types/listingCard.type";

import FilledHeart from "@/public/svgs/common/heart-filled-icon.svg";
import EmptyHeart from "@/public/svgs/common/heart-outline-icon.svg";

import Dot from "../common/Dot";

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
        className="flex shrink-0 self-center rounded-[4px]"
        style={{ width: "108px", height: "108px", objectFit: "cover" }}
      />

      <div className="flex w-full items-end justify-between py-[6px]">
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-2">
            {/* 가격 + 상태 */}
            <div className="flex flex-row gap-[6px]">
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
            <div className="text-cap1-med flex flex-col gap-[2px] text-gray-600">
              <div className="flex flex-wrap items-center gap-1">
                {internalArea !== undefined && (
                  <>
                    {getArea(internalArea)}
                    {(totalFloors !== undefined || kind) && <Dot />}
                  </>
                )}

                {totalFloors !== undefined && (
                  <>
                    전체 {totalFloors}층{kind && <Dot />}
                  </>
                )}

                {getDisplayType(kind)}
              </div>

              <div className="flex items-center gap-1">
                {billIncluded ? "빌 포함" : "빌 미포함"} <Dot />
                역까지 {getDistanceInKm(nearestStation.distanceFromStation)}km
              </div>
            </div>
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
