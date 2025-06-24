"use client";

import { useParams } from "next/navigation";

import CompletePage from "@/components/common/CompletePage";

const ViewingCompletePage = () => {
  const { id } = useParams();

  return (
    <CompletePage
      message="예약이 완료되었어요!"
      description={[
        "뷰잉관리에서 예약한 뷰잉 리스트를 탭하면",
        "상세주소를 확인할 수 있어요.",
      ]}
      buttonLabel="주소 확인하기"
      redirectUrl={`/listings/${id}?mode=confirm`}
    />
  );
};

export default ViewingCompletePage;
