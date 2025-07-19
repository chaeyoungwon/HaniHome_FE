"use client"
import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";
import TitleSection from "@/components/listings/detailShow/TitleSection";

const NewListingConfirm = () => {
  return (
    <>
      <BackHeader />
      <TitleSection
        title="입력한 정보를 확인해주세요"
        label="수정을 원하는 섹션은 클릭해주세요"
      />
      <BottomActionBar
        buttons={[
          { label: "저장", onClick: () => {}, variant: "outline" },
          { label: "다음", onClick: () => {}, variant: "filled" },
        ]}
      />
    </>
  );
};
export default NewListingConfirm;