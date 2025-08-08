"use client";

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useMemo, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import {
  fetchTemporaryPropertyData,
  postTemporaryPropertyData,
} from "@/apis/propertyApi";

import { useMyInfo } from "@/hooks/member/useMemberApi";
import { createPayloadByStep } from "@/hooks/property/createPayloadBySteps";
import { usePostProperty } from "@/hooks/property/usePropertyApi";

import BottomActionBar from "@/components/common/BottomActionBar";
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

const BackHeader = dynamic(
  () => import("@/components/layout/header/BackHeader"),
  { ssr: false },
);

interface CreateConfirmProps {
  onNext: () => void;
  onPrev: () => void;
}

const CreateConfirm = ({ onNext }: CreateConfirmProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftId = searchParams.get("draftId");

  // ⚠️ store 전체를 의존성에 넣지 않기 위해, 읽기 값과 setter를 분리 구조분해
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

    // setters
    setListingType,
    setRentPropertyType,
    setSharePropertyType,
    setRentCapacityPeople,
    setShareCapacityPeople,
    setRentInternalDetails,
    setShareInternalDetails,
    setOptionItemIds,
    setMoveInInfo,
    setPhotoUrls,
    setGenderPreference,
    setLgbtAvailable,
    setLivingConditions,
    setDescription,
    setAllCostDetails,
    setMeetingDateRange,
    setViewingAlwaysAvailable,
    setTimeSlots,
  } = useListingStore();

  const { mutate: postProperty } = usePostProperty();
  const { data: myInfo, isLoading } = useMyInfo();

  const [draftData, setDraftData] = useState<TemporaryPropertyPost | null>(
    null,
  );
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!draftId || initialized) return;

    (async () => {
      try {
        const draft = await fetchTemporaryPropertyData(Number(draftId));
        setDraftData(draft);

        if (!draft) {
          setInitialized(true);
          return;
        }

        // listingType
        if (draft.kind === "RENT") setListingType("RENT");
        else if (draft.kind === "SHARE") setListingType("SHARE");

        // SubType
        if (draft.rentPropertySubType)
          setRentPropertyType(draft.rentPropertySubType);
        if (draft.sharePropertySubType)
          setSharePropertyType(draft.sharePropertySubType);

        // Capacity
        if (draft.capacityRent) setRentCapacityPeople(draft.capacityRent);
        if (draft.capacityShare) setShareCapacityPeople(draft.capacityShare);

        // Internal Details
        if (draft.internalDetails) {
          if (draft.kind === "RENT") {
            setRentInternalDetails(
              draft.internalDetails as RentInternalDetails,
            );
          } else {
            setShareInternalDetails(
              draft.internalDetails as ShareInternalDetails,
            );
          }
        }
        if (draft.photoUrls && draft.photoUrls.length) {
          setPhotoUrls(draft.photoUrls);
        }

        // Option Items
        if (draft.optionItems) {
          setOptionItemIds(
            draft.optionItems.map((item: OptionItem) => item.optionItemId),
          );
        }

        // Moving Conditions
        if (draft.moveInInfo) setMoveInInfo(draft.moveInInfo);
        if (draft.genderPreference) setGenderPreference(draft.genderPreference);
        if (draft.lgbtAvailable !== undefined)
          setLgbtAvailable(draft.lgbtAvailable);
        if (draft.livingConditions) setLivingConditions(draft.livingConditions);

        // 기타
        if (draft.description) setDescription(draft.description);
        if (draft.costDetails) setAllCostDetails(draft.costDetails);
        if (draft.meetingDateFrom && draft.meetingDateTo)
          setMeetingDateRange(draft.meetingDateFrom, draft.meetingDateTo);
        if (draft.viewingAlwaysAvailable !== undefined)
          setViewingAlwaysAvailable(draft.viewingAlwaysAvailable);
        if (draft.timeSlots) setTimeSlots(draft.timeSlots);
      } catch (error) {
        console.error("임시 저장 데이터 가져오기 실패", error);
      } finally {
        setInitialized(true);
      }
    })();
  }, [
    draftId,
    initialized,
    // ✅ setter들은 보통 안정적이지만, 린트 회피/안전 위해 의존성에 명시
    setListingType,
    setRentPropertyType,
    setSharePropertyType,
    setRentCapacityPeople,
    setShareCapacityPeople,
    setRentInternalDetails,
    setShareInternalDetails,
    setOptionItemIds,
    setMoveInInfo,
    setGenderPreference,
    setLgbtAvailable,
    setLivingConditions,
    setDescription,
    setAllCostDetails,
    setMeetingDateRange,
    setViewingAlwaysAvailable,
    setTimeSlots,
  ]);

  // ✅ payload 계산은 함수형이 아니라 memo로 (불필요 재계산 방지)
  const payload: PropertyDetail | null = useMemo(() => {
    if (
      !myInfo ||
      !listingType ||
      !moveInInfo ||
      (!viewingAlwaysAvailable && (!meetingDateFrom || !meetingDateTo)) ||
      !genderPreference ||
      !livingConditions ||
      !timeSlots
    ) {
      return null;
    }

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
    }

    if (listingType === "SHARE") {
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
  }, [
    myInfo,
    listingType,
    moveInInfo,
    viewingAlwaysAvailable,
    meetingDateFrom,
    meetingDateTo,
    genderPreference,
    livingConditions,
    timeSlots,
    rentPropertyType,
    rentCapacityPeople,
    rentInternalDetails,
    sharePropertyType,
    shareCapacityPeople,
    shareInternalDetails,
    region,
    photoUrls,
    optionItemIds,
    costDetails,
    description,
  ]);

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
    try {
      const tempPayload = createPayloadByStep(
        "CREATE_CONFIRM",
        useListingStore.getState(),
        draftData,
      );
      await postTemporaryPropertyData(tempPayload);
    } catch (e) {
      console.error("임시 저장 실패:", e);
    }
  };

  const propertyContent = propertyInfo.find(item => item.kind === listingType);

  if (isLoading || !myInfo) return null;

  return (
    <div className="w-full max-w-[430px] pb-[70px]">
      <BackHeader rightIcon="close" onRightClick={() => router.push("/home")} />
      <TitleSection
        title="입력한 정보를 확인해주세요"
        label="수정을 원하는 섹션은 클릭해주세요"
      />
      <ImageSlider images={photoUrls} />
      {propertyContent && payload && <DropDownSection listingData={payload} />}
      <BottomActionBar
        buttons={[
          { label: "저장", onClick: handleTemporarySave, variant: "outline" },
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
