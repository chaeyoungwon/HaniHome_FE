import { useEffect } from "react";

import { AxiosError } from "axios";

import AlertMessage from "@/components/common/AlertMessage";
import BackHeader from "@/components/layout/header/BackHeader";
import DetailTabs from "@/components/listings/DetailTabs";

import { PropertyErrorResponse } from "@/types/property.type";

import ListingContentSkeleton from "./ListingContentSkeleton";

type Props = {
  mode?: string | null;
  isError?: boolean;
  error?: unknown;
  onHiddenProperty?: () => void;
};

const ListingDetailLoadingSkeleton = ({
  mode,
  isError,
  error,
  onHiddenProperty,
}: Props) => {
  const isConfirmMode = mode === "confirm";
  const isEditMode = mode === "edit";

  const isHidden =
    isError &&
    (error as AxiosError<PropertyErrorResponse>)?.response?.data
      ?.serviceCode === "PROPERTY_IS_HIDDEN";

  useEffect(() => {
    if (isHidden) {
      const timeout = setTimeout(() => {
        onHiddenProperty?.();
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isHidden, onHiddenProperty]);

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

      {isHidden && (
        <AlertMessage
          message="숨김 처리된 매물입니다"
          className="bottom-3"
          onDone={onHiddenProperty ?? (() => {})}
        />
      )}
    </>
  );
};

export default ListingDetailLoadingSkeleton;
