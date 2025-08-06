"use client";

import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useMemo, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import { AxiosError } from "axios";

import {
  usePatchDisplayStatus,
  usePropertyDetailList,
} from "@/hooks/property/usePropertyApi";
import { useViewingGuests } from "@/hooks/viewing/useViewingApi";
import { useToggleWish } from "@/hooks/wishlist/useWishListApi";

import { getArea } from "@/utils/formatter/propertyFormatter";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";
import AddressMap from "@/components/listings/AddressMap";
import BottomSheet from "@/components/listings/BottomSheet";
import DetailTabs from "@/components/listings/DetailTabs";
import DropDownMenu from "@/components/listings/DropDownMenu";
import ImageSlider from "@/components/listings/ImageSlider";
import ListingDeleteModal from "@/components/mypage/ListingDeleteModal";
import ListingHideModal from "@/components/mypage/ListingHideModal";
import ListingDetailLoadingSkeleton from "@/components/skeleton/listingsDetail/ListingDetailLoadingSkeleton";

import { PropertyErrorResponse } from "@/types/property.type";

import CertificatedIcon from "@/public/svgs/common/certificated-icon.svg";
import HeartFilledIcon from "@/public/svgs/common/heart-filled-icon.svg";
import HeartOutlineIcon from "@/public/svgs/common/heart-outline-icon.svg";

const ListingDetailPage = () => {
  const { id } = useParams();
  const listingId = id as string;
  const router = useRouter();
  const mode = useSearchParams().get("mode");

  const { memberId } = useAuthStore();

  const isConfirmMode = mode === "confirm";
  const isViewingMode = mode === "viewing";
  const isEditMode = mode === "edit";

  const [isClicked, setIsClicked] = useState(false);
  const [showHideModal, setShowHideModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, error, isError, refetch } =
    usePropertyDetailList(listingId);

  const isMyListing = useMemo(
    () => data?.hostSummary?.id === Number(memberId),
    [data, memberId],
  );

  const { data: viewingGuests } = useViewingGuests(
    Number(listingId),
    ["REQUESTED", "COMPLETED"],
    !!data && isMyListing,
  );

  const { mutate: toggleWish } = useToggleWish();
  const { mutate: patchDisplayStatus } = usePatchDisplayStatus(
    Number(listingId),
  );

  const [tradeStatus, setTradeStatus] = useState(data?.tradeStatus);

  const isMyReservedListing = useMemo(
    () =>
      viewingGuests?.some(guest => guest.guestId === Number(memberId)) ?? false,
    [viewingGuests, memberId],
  );

  const isReservationConfirmed = useMemo(
    () =>
      isMyListing ||
      isMyReservedListing ||
      isConfirmMode ||
      isViewingMode ||
      isEditMode,
    [
      isMyListing,
      isMyReservedListing,
      isConfirmMode,
      isViewingMode,
      isEditMode,
    ],
  );

  const handleHideClick = () => {
    setIsClicked(false);
    if (!data?.kind || (data.kind !== "SHARE" && data.kind !== "RENT")) return;

    const hasGuests = viewingGuests && viewingGuests.length > 0;
    const isActive = data.displayStatus === "ACTIVE";

    if (isActive && hasGuests) {
      setShowHideModal(true);
      return;
    }

    patchDisplayStatus(
      {
        displayStatus: isActive ? "INACTIVE" : "ACTIVE",
        jsonDiscriminator: data.kind,
      },
      {
        onSuccess: () => router.push("/mypage/listings"),
      },
    );
  };

  if (
    isLoading ||
    (isError &&
      (error as AxiosError<PropertyErrorResponse>)?.response?.data
        ?.serviceCode === "PROPERTY_IS_HIDDEN")
  ) {
    return (
      <ListingDetailLoadingSkeleton
        mode={mode}
        isError={isError}
        error={error}
        onHiddenProperty={() => router.back()}
      />
    );
  }
  if (isError || !data) return null;

  return (
    <>
      <div className="flex min-h-screen flex-col pb-16">
        <BackHeader
          hideBackIcon={isConfirmMode}
          rightIcon={isEditMode ? "more" : "report"}
          onRightClick={
            isEditMode
              ? () => setIsClicked(true)
              : () => router.push(`/listings/${id}/report`)
          }
        />

        {/* 매물 이미지 */}
        <div className="relative flex">
          {data.photoUrls && data.photoUrls.length > 0 && (
            <ImageSlider photoUrls={data.photoUrls} />
          )}
          <button
            type="button"
            onClick={() => {
              toggleWish(
                { id: data.id, isLiked: data.metaInfo?.wished ?? false },
                {
                  onSuccess: () => {
                    refetch();
                  },
                },
              );
            }}
            className="absolute right-6 bottom-5 z-[10] flex cursor-pointer rounded-full bg-white p-2.5"
            aria-label={data.metaInfo?.wished ? "즐겨찾기 취소" : "즐겨찾기"}
          >
            {data.metaInfo?.wished ? (
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
            {data.hostSummary?.profileImage ? (
              <Image
                src={data.hostSummary.profileImage}
                alt="프로필 이미지"
                width={48}
                height={48}
                unoptimized
                className="h-12 w-12 rounded-full border border-gray-300 object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-full border border-gray-300 bg-white" />
            )}

            <div className="flex items-center gap-1">
              <span className="text-body1-sb font-bold text-black">
                {data.hostSummary?.nickname ?? "사용자"}
              </span>
              {data.hostSummary?.verified && (
                <CertificatedIcon className="h-6 w-6" />
              )}
            </div>
          </div>

          {/* 거래 상태 드롭다운 */}
          {isEditMode && (
            <DropDownMenu
              selectedKey={
                tradeStatus === "COMPLETED"
                  ? "completed"
                  : tradeStatus === "BEFORE"
                    ? "active"
                    : "active"
              }
              onSelect={key => {
                if (key === "completed") setTradeStatus("COMPLETED");
                else if (key === "active") setTradeStatus("BEFORE");
              }}
            />
          )}
        </div>

        {/* 상단 요약 */}
        <div className="flex justify-between px-4 py-7">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-heading1">
                <span className="text-gray-900">주 / </span>
                <span className="text-mint">
                  {data.costDetails?.weeklyCost?.toLocaleString() ?? "(-)"}$
                </span>
              </span>
              <span className="text-body2-med flex h-fit items-center justify-center rounded-[100px] border border-gray-300 px-[10px] py-1 text-gray-700">
                {data.tradeStatus === "COMPLETED" ? "거래 완료" : "거래중"}
              </span>
            </div>
            <div className="text-body1-sb flex items-center gap-3 text-gray-700">
              <span className="line-clamp-2 max-h-[44px] max-w-[89px]">
                {data.region?.state ?? "region"}
              </span>
              <span>|</span>
              <span className="line-clamp-2 max-h-[44px] max-w-[87px]">
                {data.region?.suburb ?? "suburb"}
              </span>
            </div>
          </div>

          <div className="text-cap1-med flex flex-col items-end justify-end gap-3 text-gray-700">
            {data.costDetails.billIncluded ? (
              <div className="text-cap1-med flex items-center gap-1 text-gray-700">
                <span>빌</span>
                <span className="text-mint">주세에 포함</span>
              </div>
            ) : (
              <div className="text-cap1-med flex items-center gap-2 text-gray-700">
                <span>빌 미포함</span>
                <div className="h-3 border-l border-gray-500" />
                <div className="flex items-center gap-1">
                  <span>총 빌 가격</span>
                  <span className="text-mint">
                    {data.costDetails.weeklyCost.toLocaleString()}$
                  </span>
                </div>
              </div>
            )}
            <div className="flex flex-col items-end gap-1">
              <span>
                (Internal Area){" "}
                {getArea(data.internalDetails?.internalArea ?? "(-)")}
              </span>
              {data.internalDetails.totalArea && (
                <span className="text-gray-500">
                  (Total Area) {getArea(data.internalDetails?.totalArea)}
                </span>
              )}
            </div>
          </div>
        </div>

        <DetailTabs data={data} listingId={listingId} />

        {/* 위치 영역 */}
        <div className="mt-6 mb-15">
          <div className="flex flex-col gap-3 px-4 py-8">
            <span className="text-heading3 text-gray-900">위치</span>
            <AddressMap
              region={data.region}
              isReservationConfirmed={isReservationConfirmed}
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

      {isEditMode && tradeStatus === "COMPLETED" && (
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

      {isClicked && (
        <BottomSheet
          onClose={() => setIsClicked(false)}
          onHideClick={handleHideClick}
          displayStatus={data.displayStatus as "ACTIVE" | "INACTIVE"}
          viewingCount={viewingGuests?.length ?? 0}
          onShowDeleteModal={() => setShowDeleteModal(true)}
        />
      )}

      {showHideModal && viewingGuests && (
        <ListingHideModal
          listingId={data.id}
          kind={data.kind}
          onClose={() => setShowHideModal(false)}
        />
      )}

      {showDeleteModal && (
        <ListingDeleteModal onClose={() => setShowDeleteModal(false)} />
      )}
    </>
  );
};

export default ListingDetailPage;
