"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import {
  fetchTemporaryPropertyData,
  postTemporaryPropertyData,
} from "@/apis/propertyApi";

import { useMyInfo } from "@/hooks/member/useMemberApi";
import { createPayloadByStep } from "@/hooks/property/createPayloadBySteps";
import { usePostProperty } from "@/hooks/property/usePropertyApi";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";
import DropDownSection from "@/components/listings/detailShow/DropDownSection";
import ImageSlider from "@/components/listings/detailShow/ImageSlider";
import TitleSection from "@/components/listings/detailShow/TitleSection";

import { propertyInfo } from "@/constants/mock/listing-detail-dummies";

import { OptionItem } from "@/types/listingDetailGet.type";
import { PropertyDetail } from "@/types/listingDetailPost.type";
import {
  RentInternalDetails,
  ShareInternalDetails,
} from "@/types/listingDetailPost.type";
import { TemporaryPropertyPost } from "@/types/temporaryProperty.type";

interface CreateConfirmProps {
  onNext: () => void;
  onPrev: () => void;
}

const CreateConfirm = ({ onNext }: CreateConfirmProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftId = searchParams.get("draftId");

  const store = useListingStore();
  const { mutate: postProperty } = usePostProperty();
  const { data: myInfo, isLoading } = useMyInfo();

  const [draftData, setDraftData] = useState<TemporaryPropertyPost | null>(
    null,
  );

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
  } = store;

  useEffect(() => {
    const initDraft = async () => {
      if (!draftId) return;
      try {
        const draftData = await fetchTemporaryPropertyData(Number(draftId));
        setDraftData(draftData);
        if (draftData) {
          // listingType 세팅
          if (draftData.kind === "RENT") store.setListingType("RENT");
          else if (draftData.kind === "SHARE") store.setListingType("SHARE");
          // SubType 세팅
          if (draftData.rentPropertySubType)
            store.setRentPropertyType(draftData.rentPropertySubType);
          if (draftData.sharePropertySubType)
            store.setSharePropertyType(draftData.sharePropertySubType);

          // Capacity 세팅
          if (draftData.capacityRent)
            store.setRentCapacityPeople(draftData.capacityRent);
          if (draftData.capacityShare)
            store.setShareCapacityPeople(draftData.capacityShare);

          // internalDetails는 kind에 따라 분기해서 세팅
          if (draftData.internalDetails) {
            if (draftData.kind === "RENT") {
              store.setRentInternalDetails(
                draftData.internalDetails as RentInternalDetails,
              );
            } else if (draftData.kind === "SHARE") {
              store.setShareInternalDetails(
                draftData.internalDetails as ShareInternalDetails,
              );
            }
          }
          // optionItems가 있을 경우 optionItemIds 추출해 세팅
          if (draftData.optionItems) {
            const optionItemIds = draftData.optionItems.map(
              (item: OptionItem) => item.optionItemId,
            );
            store.setOptionItemIds(optionItemIds);
          }
          if (draftData.moveInInfo) store.setMoveInInfo(draftData.moveInInfo);
          if (draftData.genderPreference)
            store.setGenderPreference(draftData.genderPreference);
          if (draftData.lgbtAvailable)
            store.setLgbtAvailable(draftData.lgbtAvailable);
          if (draftData.livingConditions)
            store.setLivingConditions(draftData.livingConditions);
        }
        if (draftData?.description) {
          store.setDescription(draftData.description);
        }
        if (draftData.costDetails)
          store.setAllCostDetails(draftData.costDetails);
        if (draftData.meetingDateFrom && draftData.meetingDateTo)
          store.setMeetingDateRange(
            draftData.meetingDateFrom,
            draftData.meetingDateTo,
          );
        if (draftData.viewingAlwaysAvailable)
          store.setViewingAlwaysAvailable(draftData.viewingAlwaysAvailable);
        if (draftData.timeSlots) store.setTimeSlots(draftData.timeSlots);
      } catch (error) {
        console.error("임시 저장 데이터 가져오기 실패", error);
      }
    };
    initDraft();
  }, [draftId, store]);

  const getPayload = (): PropertyDetail | null => {
    if (
      !myInfo ||
      !listingType ||
      !moveInInfo ||
      (!viewingAlwaysAvailable && (!meetingDateFrom || !meetingDateTo)) ||
      !genderPreference ||
      !livingConditions ||
      !timeSlots
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

  const handleTemporarySave = async () => {
    const payload = createPayloadByStep("CREATE_CONFIRM", store, draftData);
    try {
      await postTemporaryPropertyData(payload);
      router.push(`/home`);
    } catch (e) {
      console.error("임시 저장 실패:", e);
    }
  };

  const propertyContent = propertyInfo.find(item => item.kind === listingType);

  if (isLoading || !myInfo) return null;

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
            onClick: handleTemporarySave,
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
