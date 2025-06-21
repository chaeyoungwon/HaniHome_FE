"use client";

import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useState } from "react";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";
import AddressMap from "@/components/listings/AddressMap";
import DetailTabs from "@/components/listings/DetailTabs";
import CheckIcon from "@/components/signup/info/CheckIcon";

import HeartFilledIcon from "@/public/svgs/common/heart-filled-icon.svg";
import HeartOutlineIcon from "@/public/svgs/common/heart-outline-icon.svg";
import CertificatedIcon from "@/public/svgs/listings/certificated-icon.svg";

const ListingDetailPage = () => {
  const { id } = useParams();
  const listingId = id as string;

  const mode = useSearchParams().get("mode");
  const isReservationConfirmed = mode === "confirm";

  const router = useRouter();

  const [isBillIncluded, setIsBillIncluded] = useState(false);
  const [liked, setLiked] = useState(false);

  const region = {
    // 임시 하드코딩
    streetNumber: "25",
    streetName: "Smith St",
    suburb: "Chatswood",
    state: "NSW",
    postCode: "2067",
    country: "Australia",
    unit: "",
    buildingName: "",
  };

  return (
    <>
      <div className="flex min-h-screen flex-col pb-16">
        <BackHeader hideBackIcon={isReservationConfirmed} rightIcon="report" />
        <div className="relative flex">
          <Image
            src="/svgs/common/room-img.svg"
            width={375}
            height={375}
            alt="매물 이미지"
            className="h-[375px] w-[375px] rounded-sm border border-gray-200 object-cover"
            priority
          />
          <button
            type="button"
            onClick={() => setLiked(prev => !prev)}
            className="absolute right-6 bottom-5 flex cursor-pointer rounded-full bg-white p-2.5 shadow-md"
            aria-label={liked ? "즐겨찾기 취소" : "즐겨찾기"}
          >
            {liked ? (
              <HeartFilledIcon className="text-mint h-6 w-6" />
            ) : (
              <HeartOutlineIcon className="text-mint h-6 w-6" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-[14px] border-b border-gray-200 px-4 py-3">
          {/* 프로필 이미지 */}
          <div className="h-12 w-12 rounded-full border border-gray-300" />
          <div className="flex items-center gap-1">
            <span className="text-body1-sb font-bold text-black">하니하니</span>
            <CertificatedIcon />
          </div>
        </div>

        <div className="flex justify-between px-4 py-7">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-heading1">
                <span className="text-gray-900">주 / </span>
                <span className="text-mint">300$</span>
              </span>
              <span className="text-body2-med flex h-fit items-center justify-center rounded-[100px] border border-gray-300 px-[10px] py-1 text-gray-700">
                거래중
              </span>
            </div>
            <div className="text-body1-sb flex gap-3 text-gray-700">
              <span>City</span>
              <span>|</span>
              <span>suburb</span>
            </div>
          </div>
          <div className="text-cap1-med flex flex-col items-end justify-between gap-4 text-gray-700">
            <button
              type="button"
              className="flex items-center gap-1"
              onClick={() => setIsBillIncluded(prev => !prev)}
            >
              <span>빌 포함</span>
              <CheckIcon checked={isBillIncluded} />
            </button>

            <div className="flex flex-col items-end gap-1">
              <span>(Internal Area)㎡ </span>
              <span className="text-gray-500">(Total Area)㎡ </span>
            </div>
          </div>
        </div>

        <DetailTabs listingId={listingId} />
        <div className="mt-6 mb-15">
          <div className="flex flex-col gap-3 px-4 py-8">
            <span className="text-body1-sb text-gray-900">위치</span>

            <AddressMap
              region={region}
              isReservationConfirmed={isReservationConfirmed}
            />
          </div>
        </div>
      </div>
      {isReservationConfirmed ? (
        <BottomActionBar
          label="홈으로 이동"
          onClick={() => router.push("/home")}
        />
      ) : (
        <BottomActionBar
          label="뷰잉 예약하기"
          onClick={() => router.push(`/viewing/reservation/${listingId}`)}
        />
      )}
    </>
  );
};

export default ListingDetailPage;
