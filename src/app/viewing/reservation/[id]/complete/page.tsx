"use client";

import { useParams } from "next/navigation";

import CompletePage from "@/components/common/CompletePage";

const ViewingCompletePage = () => {
  const { id } = useParams();

  return (
    <CompletePage
      message="예약이 완료되었어요!"
      description={[
        "상세주소는",
        "매물 상세페이지를",
        "다시 들어가 확인해주세요",
      ]}
      buttonLabel="주소 확인하기"
      redirectUrl={`/listings/${id}?mode=confirm`}
    />
  );
};

export default ViewingCompletePage;
