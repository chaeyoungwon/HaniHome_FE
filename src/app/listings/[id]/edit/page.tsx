"use client";

import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { usePropertyDetailEditList } from "@/hooks/property/usePropertyApi";

import toPostPropertyDetail from "@/utils/listing/toPostPropertyDetail";

import BottomActionBar from "@/components/common/BottomActionBar";
import DropDownSection from "@/components/listings/detailShow/DropDownSection";
import ImageSlider from "@/components/listings/detailShow/ImageSlider";
import TitleSection from "@/components/listings/detailShow/TitleSection";

import {
  RentPropertyDetail,
  SharePropertyDetail,
} from "@/types/listingDetailPost.type";

const BackHeader = dynamic(
  () => import("@/components/layout/header/BackHeader"),
  { ssr: false },
);

const ListingsEdit = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [originalDetail, setOriginalDetail] = useState<
    SharePropertyDetail | RentPropertyDetail | null
  >(null);
  const [currentDetail, setCurrentDetail] = useState<
    SharePropertyDetail | RentPropertyDetail | null
  >(null);

  const { data, isLoading, error } = usePropertyDetailEditList(id ?? "");

  useEffect(() => {
    if (data) {
      const detail = toPostPropertyDetail(data);
      setOriginalDetail(detail); // 최초 원본
      setCurrentDetail(detail); // 수정할 값
      setPreviewUrls(data.photoUrls);
    }
  }, [data]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error || !originalDetail || !currentDetail)
    return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <>
      <div className="w-full max-w-[430px] pb-[130px]">
        <BackHeader />
        <TitleSection
          title="수정할 정보 섹션을 클릭해주세요"
          label="추가로 변경해야하는 섹션도 수정해주세요"
        />
        <div
          className="cursor-pointer px-4"
          onClick={() =>
            router.push(`/listings/${id}/edit/addressPhoto?subStep=photo`)
          }
        >
          <ImageSlider images={previewUrls} onRemove={() => {}} />
        </div>
        {currentDetail && originalDetail && (
          <DropDownSection
            listingData={currentDetail}
            originalData={originalDetail}
            setListingData={setCurrentDetail}
            edit
          />
        )}
      </div>
      <BottomActionBar
        label="저장"
        onClick={() => {
          router.push(`/listings/${id}?mode=edit`);
        }}
      />
    </>
  );
};

export default ListingsEdit;
