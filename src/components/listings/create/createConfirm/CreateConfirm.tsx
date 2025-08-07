import { useListingStore } from "@/stores/useListingStore";

import { useMyInfo } from "@/hooks/member/useMemberApi";
import { usePostProperty } from "@/hooks/property/usePropertyApi";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";
import DropDownSection from "@/components/listings/detailShow/DropDownSection";
import ImageSlider from "@/components/listings/detailShow/ImageSlider";
import TitleSection from "@/components/listings/detailShow/TitleSection";

import { propertyInfo } from "@/constants/mock/listing-detail-dummies";

import { PropertyDetail } from "@/types/listingDetailPost.type";

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

  const { mutate: postProperty } = usePostProperty();
  const { data: myInfo, isLoading } = useMyInfo();

  if (isLoading || !myInfo) return null;

  const getPayload = (): PropertyDetail | null => {
    if (
      !myInfo ||
      !listingType ||
      (!viewingAlwaysAvailable && (!meetingDateFrom || !meetingDateTo)) ||
      !genderPreference ||
      !livingConditions
    )
      return null;

    if (listingType === "RENT") {
      if (!rentPropertyType || !rentCapacityPeople || !rentInternalDetails)
        return null;

      return {
        kind: "RENT",
        jsonDiscriminator: "RENT",
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
        rentPropertySubType: rentPropertyType,
        capacityRent: rentCapacityPeople,
        internalDetails: rentInternalDetails,
        memberId: myInfo.id,
        thumbnailUrl: photoUrls?.[0] || null,
      };
    } else if (listingType === "SHARE") {
      if (!sharePropertyType || !shareCapacityPeople || !shareInternalDetails)
        return null;

      return {
        kind: "SHARE",
        jsonDiscriminator: "SHARE",
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
        sharePropertySubType: sharePropertyType,
        capacityShare: shareCapacityPeople,
        internalDetails: shareInternalDetails,
        memberId: myInfo.id,
        thumbnailUrl: photoUrls?.[0] || null,
      };
    }
    return null;
  };

  const payload = getPayload();

  const handlePost = () => {
    if (!payload) {
      console.warn("필수 항목 누락");
      return;
    }
    postProperty(payload, {
      onSuccess: () => onNext(),
      onError: error => console.error("등록 실패:", error),
    });
  };

  const propertyContent = propertyInfo.find(item => item.kind === listingType);

  return (
    <div className="w-full max-w-[430px] pb-[70px]">
      <BackHeader rightIcon="close" />
      <TitleSection
        title="입력한 정보를 확인해주세요"
        label="수정을 원하는 섹션은 클릭해주세요"
      />
      <ImageSlider images={photoUrls} />
      {propertyContent && payload && <DropDownSection listingData={payload} />}
      <BottomActionBar
        buttons={[
          {
            label: "저장",
            onClick: () => {
              console.log(payload);
            },
            variant: "outline",
          },
          {
            label: "다음",
            onClick: handlePost,
            variant: "filled",
            disabled: isLoading,
          },
        ]}
      />
    </div>
  );
};

export default CreateConfirm;
