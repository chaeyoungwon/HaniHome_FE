import { useListingStore } from "@/stores/useListingStore";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";
import DropDownSection from "@/components/listings/detailShow/DropDownSection";
import ImageSlider from "@/components/listings/detailShow/ImageSlider";
import TitleSection from "@/components/listings/detailShow/TitleSection";

import { propertyInfo } from "@/constants/mock/listing-detail-dummies";

import { PropertyDetail } from "@/types/listingDetail";

interface CreateConfirmProps {
  onNext: () => void;
  onPrev: () => void;
}
const CreateConfirm = ({ onNext }: CreateConfirmProps) => {
  const {
    listingType,
    region,
    photoUrls,
    rentPropertyType,
    sharePropertyType,
    rentCapacityPeople,
    shareCapacityPeople,
    rentInternalDetails,
    shareInternalDetails,
    costDetails,
    optionItemIds,
    timeSlots,
    meetingDateFrom,
    meetingDateTo,
    viewingAlwaysAvailable,
    description,
    genderPreference,
    lgbtAvailable,
    moveInInfo,
    livingConditions,
  } = useListingStore();
  const propertyContent = propertyInfo.find(item => item.kind === listingType);
  console.log(
    listingType,
    region,
    photoUrls,
    rentPropertyType,
    sharePropertyType,
    rentCapacityPeople,
    shareCapacityPeople,
    rentInternalDetails,
    shareInternalDetails,
    costDetails,
    optionItemIds,
    timeSlots,
    meetingDateFrom,
    meetingDateTo,
    viewingAlwaysAvailable,
    description,
    genderPreference,
    lgbtAvailable,
    moveInInfo,
    livingConditions,
  );
  const listingData = {
    kind: listingType,
    region,
    photoUrls,
    optionItemIds,
    costDetails,
    description,
    timeSlots,
    meetingDateFrom,
    meetingDateTo,
    viewingAlwaysAvailable,
    genderPreference,
    lgbtAvailable,
    moveInInfo,
    livingConditions,
    ...(listingType === "RENT"
      ? {
          jsonDiscriminator: "RENT",
          rentPropertySubType: rentPropertyType,
          capacityRent: rentCapacityPeople,
          internalDetails: rentInternalDetails,
        }
      : {
          jsonDiscriminator: "SHARE",
          sharePropertySubType: sharePropertyType,
          capacityShare: shareCapacityPeople,
          internalDetails: shareInternalDetails,
        }),
    memberId: 1,
    thumbnailUrl: photoUrls?.[0] || null,
  } as PropertyDetail;

  return (
    <div className="max-w-[375px] pb-[70px]">
      <BackHeader rightIcon="close" />
      <TitleSection
        title="입력한 정보를 확인해주세요"
        label="수정을 원하는 섹션은 클릭해주세요"
      />
      <ImageSlider images={photoUrls} />
      {propertyContent && <DropDownSection listingData={listingData} />}
      <BottomActionBar
        buttons={[
          {
            label: "저장",
            onClick: () => {
              //Todo: 저장 로직 추가
              console.log(listingData);
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
export default CreateConfirm;
