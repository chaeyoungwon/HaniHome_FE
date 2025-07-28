import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";
import DetailTabs from "@/components/listings/DetailTabs";

import ListingContentSkeleton from "./ListingContentSkeleton";

const ListingDetailLoadingSkeleton = ({ mode }: { mode?: string | null }) => {
  const isConfirmMode = mode === "confirm";
  const isEditMode = mode === "edit";

  return (
    <>
      <BackHeader
        hideBackIcon={isConfirmMode}
        rightIcon={isEditMode ? "more" : "report"}
      />
      <div className="flex min-h-screen flex-col pb-16">
        <ListingContentSkeleton />
        <DetailTabs data={undefined} listingId="loading" />
        <div className="mt-6 mb-15">
          <div className="flex flex-col gap-3 px-4 py-8">
            <span className="text-heading3 text-gray-900">위치</span>
            <div className="flex h-[343px] w-[343px] items-center justify-center">
              <span className="text-heading3 text-gray-600">
                상세 주소는 뷰잉 예약 후 확인 가능합니다.
              </span>
            </div>
          </div>
        </div>
      </div>
      <BottomActionBar
        label={
          isConfirmMode
            ? "홈으로 이동"
            : isEditMode
              ? "거래한 게스트 입력하기"
              : "뷰잉 예약하기"
        }
      />
    </>
  );
};

export default ListingDetailLoadingSkeleton;
