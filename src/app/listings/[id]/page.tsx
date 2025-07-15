"use client";

import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

import { useMember } from "@/hooks/member/useMember";
import { usePropertyDetailList } from "@/hooks/property/useProperty";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";
import AddressMap from "@/components/listings/AddressMap";
import DetailTabs from "@/components/listings/DetailTabs";
import DropDownMenu from "@/components/listings/DropDownMenu";

import CertificatedIcon from "@/public/svgs/common/certificated-icon.svg";
import HeartFilledIcon from "@/public/svgs/common/heart-filled-icon.svg";
import HeartOutlineIcon from "@/public/svgs/common/heart-outline-icon.svg";

const ListingDetailPage = () => {
  const { id } = useParams();
  const listingId = id as string;

  const mode = useSearchParams().get("mode");
  const isConfirmMode = mode === "confirm";
  const isViewingMode = mode === "viewing";
  const isEditMode = mode === "edit";

  const router = useRouter();

  const [liked, setLiked] = useState(false);

  const { data, isLoading, isError } = usePropertyDetailList(listingId);

  const memberId = data?.memberId;
  const { data: member } = useMember(memberId ?? 0);

  if (isLoading) return <p className="p-4">불러오는 중...</p>;
  if (isError || !data)
    return <p className="p-4">매물 정보를 불러오지 못했어요.</p>;

  const isCompleted = data.tradeStatus === "COMPLETED";

  return (
    <>
      <div className="flex min-h-screen flex-col pb-16">
        <BackHeader
          hideBackIcon={isConfirmMode}
          rightIcon={isEditMode ? "more" : "report"}
          onRightClick={() => router.push(`/listings/${id}/report`)}
        />

        {/* 매물 이미지 */}
        <div className="relative flex">
          <Image
            src={
              data.photoUrls?.[0]?.startsWith("http")
                ? data.photoUrls[0]
                : "/svgs/common/room-img.svg"
            }
            width={375}
            height={375}
            alt="매물 이미지"
            className="h-[375px] w-[375px] border border-gray-200 object-cover"
            priority
          />
          <button
            type="button"
            onClick={() => setLiked(prev => !prev)}
            className="absolute right-6 bottom-5 flex cursor-pointer rounded-full bg-white p-2.5"
            aria-label={liked ? "즐겨찾기 취소" : "즐겨찾기"}
          >
            {liked ? (
              <HeartFilledIcon className="text-mint h-6 w-6" />
            ) : (
              <HeartOutlineIcon className="text-mint h-6 w-6" />
            )}
          </button>
        </div>

        {/* 프로필 영역 */}
        <div className="flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-[14px] px-4 py-3">
            {/* 프로필 이미지 */}
            {member?.profileImage ? (
              <Image
                src={member.profileImage}
                alt="프로필 이미지"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full border border-gray-300 object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-full border border-gray-300 bg-white" />
            )}

            <div className="flex items-center gap-1">
              <span className="text-body1-sb font-bold text-black">
                {member?.nickname ?? "사용자"}
              </span>
              {member?.verifiedUser && <CertificatedIcon className="h-6 w-6" />}
            </div>
          </div>

          {/* 거래 상태 드롭다운 */}
          {isEditMode && (
            <div className="pr-4">
              <DropDownMenu
                selectedKey={
                  data.tradeStatus === "COMPLETED"
                    ? "completed"
                    : data.tradeStatus === "BEFORE"
                      ? "active"
                      : "active"
                }
                onSelect={() => {}}
              />
            </div>
          )}
        </div>

        {/* 상단 요약 */}
        <div className="flex justify-between px-4 py-7">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-heading1">
                <span className="text-gray-900">주 / </span>
                <span className="text-mint">
                  {data.costDetails?.weeklyCost?.toLocaleString() ?? "-"}$
                </span>
              </span>
              <span className="text-body2-med flex h-fit items-center justify-center rounded-[100px] border border-gray-300 px-[10px] py-1 text-gray-700">
                {data.tradeStatus === "COMPLETED" ? "거래 완료" : "거래중"}
              </span>
            </div>
            <div className="text-body1-sb flex gap-3 text-gray-700">
              <span>{data.region?.state ?? "region"}</span>
              <span>|</span>
              <span>{data.region?.suburb ?? "suburb"}</span>
            </div>
          </div>

          <div className="text-cap1-med flex flex-col items-end gap-3 text-gray-700">
            {data.costDetails.billIncluded ? (
              <div className="text-cap1-med flex gap-1 text-gray-700">
                <span>빌</span>
                <span className="text-mint">주세에 포함</span>
              </div>
            ) : (
              <div className="text-cap1-med flex gap-2 text-gray-700">
                <span>빌 미포함</span>
                <div className="h-3 border-l border-gray-500" />
                <div className="flex gap-1">
                  <span>총 빌 가격</span>
                  <span className="text-mint">
                    {data.costDetails.weeklyCost.toLocaleString()}$
                  </span>
                </div>
              </div>
            )}
            <div className="flex flex-col items-end gap-1">
              <span>
                (Internal Area) {data.internalDetails?.internalArea ?? "-"}㎡
              </span>
              <span className="text-gray-500">
                (Total Area) {data.internalDetails?.totalArea ?? "-"}㎡
              </span>
            </div>
          </div>
        </div>

        <DetailTabs data={data} listingId={listingId} />

        {/* 위치 영역 */}
        <div className="mt-6 mb-15">
          <div className="flex flex-col gap-3 px-4 py-8">
            <span className="text-body1-sb text-gray-900">위치</span>
            <AddressMap
              region={data.region}
              isReservationConfirmed={
                isConfirmMode || isViewingMode || isEditMode
              }
            />
          </div>
        </div>
      </div>

      {/* 하단 액션바 */}
      {isConfirmMode && (
        <BottomActionBar
          label="홈으로 이동"
          onClick={() => router.push("/home")}
        />
      )}
      {isEditMode && isCompleted && (
        <BottomActionBar
          label="거래한 게스트 입력하기"
          onClick={() => router.push(`/listings/${id}/guests`)}
        />
      )}
      {!isConfirmMode && !isViewingMode && !isEditMode && (
        <BottomActionBar
          label="뷰잉 예약하기"
          onClick={() => router.push(`/viewing/reservation/${listingId}`)}
        />
      )}
    </>
  );
};

export default ListingDetailPage;
