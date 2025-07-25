import { useListingStore } from "@/stores/useListingStore";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";
import DropDownSection from "@/components/listings/detailShow/DropDownSection";
import ImageSlider from "@/components/listings/detailShow/ImageSlider";
import TitleSection from "@/components/listings/detailShow/TitleSection";

import { propertyInfo } from "@/constants/mock/listing-detail-dummies";

interface CreateConfirmProps {
  onNext: () => void;
  onPrev: () => void;
}
const CreateConfrim = ({ onNext }: CreateConfirmProps) => {
  const { listingType, photoData } = useListingStore();
  const propertyContent = propertyInfo.find(item => item.kind === listingType);
  console.log("photoData", photoData);
  return (
    <div className="max-w-[375px] pb-[70px]">
      <BackHeader rightIcon="close" />
      <TitleSection
        title="입력한 정보를 확인해주세요"
        label="수정을 원하는 섹션은 클릭해주세요"
      />
      <ImageSlider images={photoData} />
      {propertyContent && <DropDownSection listingData={propertyContent} />}
      <BottomActionBar
        buttons={[
          {
            label: "저장",
            onClick: () => {
              //Todo: 저장 로직 추가
              console.log("저장");
            },
            variant: "outline",
          },
          {
            label: "다음",
            onClick: onNext,
            variant: "filled",
          },
        ]}
      />
    </div>
  );
};
export default CreateConfrim;
