"use client";

import { useSearchParams } from "next/navigation";

import { useEffect, useMemo, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import {
  fetchTemporaryPropertyData,
  postTemporaryPropertyData,
} from "@/apis/propertyApi";

import { createPayloadByStep } from "@/hooks/property/createPayloadBySteps";

import {
  LISTING_DETAILS_IDS,
  getAnswerText,
  getAnswerValue,
  isAllAnswered,
} from "@/utils/listing/create/answerHelpers";
import { useDropdownAutoManager } from "@/utils/listing/create/useDropdownAutoManager";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import DropdownSelector from "@/components/listings/create/common/DropdownSelector";
import FunnelLayout from "@/components/listings/create/common/FunnelLayout";

import { QUESTION_MAP } from "@/constants/question-map";

import { ListingDetailsOption } from "@/types/createPropertyAnswer.type";
import { OptionItem } from "@/types/listingDetailGet.type";
import {
  CapacityRent,
  CapacityShare,
  RentInternalDetails,
  RentPropertySubType,
  ShareInternalDetails,
  SharePropertySubType,
} from "@/types/listingDetailPost.type";
import { TemporaryPropertyPost } from "@/types/temporaryProperty.type";

import ListingDetailsDropdownContent from "./ListingDetailsDropdownContent";

interface ListingDetailsProps {
  onNext: () => void;
  onPrev: () => void;
}

const ListingDetails = ({ onNext }: ListingDetailsProps) => {
  const store = useListingStore();
  const { listingType, optionItemIds, setOptionItemIds } = store;

  const searchParams = useSearchParams();
  const draftId = searchParams.get("draftId");
  const [draftData, setDraftData] = useState<TemporaryPropertyPost | null>(
    null,
  );

  const section = "ListingDetails";
  const questions = useMemo(() => {
    return listingType ? QUESTION_MAP[listingType][section] : [];
  }, [listingType, section]);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const { highlightIds, furnitureIds, isBrokeredIds } = LISTING_DETAILS_IDS;

  useEffect(() => {
    const initDraft = async () => {
      if (!draftId) return;
      try {
        const draftData = await fetchTemporaryPropertyData(Number(draftId));
        setDraftData(draftData);
        if (draftData) {
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

          // listingType 세팅
          if (draftData.kind === "RENT") store.setListingType("RENT");
          else if (draftData.kind === "SHARE") store.setListingType("SHARE");
        }
      } catch (error) {
        console.error("임시 저장 데이터 가져오기 실패", error);
      }
    };
    initDraft();
  }, [draftId]);

  const { openIndices, visibleIndices, toggleIndex, autoAdvance } =
    useDropdownAutoManager({
      totalCount: questions.length,
      shouldAutoClose: index => {
        const id = questions[index].id as ListingDetailsOption["type"];
        const answer = getAnswerValue(id, store);

        if (id === "highlights" && Array.isArray(answer)) {
          return answer.filter(id => highlightIds.includes(id)).length >= 5;
        }

        if (
          id === "internalDetails" &&
          typeof answer === "object" &&
          answer !== null &&
          !Array.isArray(answer)
        ) {
          const requiredKeys = [
            ...(listingType === "RENT"
              ? ["numberOfRoom", "numberOfBath"]
              : ["totalResidents", "totalBathUser"]),
            "internalArea",
          ];
          return requiredKeys.every(
            key =>
              typeof (answer as unknown as Record<string, number>)[key] ===
              "number",
          );
        }

        return !!answer;
      },
    });

  useEffect(() => {
    openIndices.forEach(idx => {
      const question = questions[idx];
      if (!question) return; // idx가 유효하지 않으면 무시
      const answer = getAnswerValue(
        questions[idx].id as ListingDetailsOption["type"],
        store,
      );
      if (autoAdvance && answer) autoAdvance(idx);
    });
  }, [openIndices, questions, autoAdvance, store]);

  const handleTemporarySave = async () => {
    const payload = createPayloadByStep("LISTING_DETAILS", store, draftData);

    try {
      await postTemporaryPropertyData(payload);
    } catch (e) {
      console.error("임시 저장 실패:", e);
    }
  };

  return (
    <FunnelLayout>
      {questions.map((item, index) => {
        const answerValue = getAnswerValue(
          item.id as ListingDetailsOption["type"],
          store,
        );
        if (answerValue === undefined) return null;

        return (
          <DropdownSelector
            key={item.id}
            label={item.label}
            answer={getAnswerText(
              item.id as ListingDetailsOption["type"],
              store,
            )}
            isOpen={openIndices.includes(index)}
            onClick={() => toggleIndex(index)}
            isVisible={visibleIndices.includes(index)}
          >
            <ListingDetailsDropdownContent
              id={item.id as ListingDetailsOption["type"]}
              value={answerValue}
              onSelect={val => {
                if (val === null) return;

                switch (item.id) {
                  case "propertyType":
                    listingType === "RENT"
                      ? store.setRentPropertyType(val as RentPropertySubType)
                      : store.setSharePropertyType(val as SharePropertySubType);
                    break;
                  case "capacityPeople":
                    listingType === "RENT"
                      ? store.setRentCapacityPeople(val as CapacityRent)
                      : store.setShareCapacityPeople(val as CapacityShare);
                    break;
                  case "internalDetails":
                    listingType === "RENT"
                      ? store.setRentInternalDetails(val as RentInternalDetails)
                      : store.setShareInternalDetails(
                          val as ShareInternalDetails,
                        );
                    break;
                  case "highlights":
                  case "furniture":
                  case "isBrokered": {
                    const targetIds: number[] =
                      item.id === "highlights"
                        ? highlightIds
                        : item.id === "furniture"
                          ? furnitureIds
                          : isBrokeredIds;

                    const valArray: number[] = (
                      Array.isArray(val) ? val : [val]
                    ).filter((v): v is number => typeof v === "number");

                    const newIds = valArray.filter(
                      (v): v is number => typeof v === "number",
                    );

                    const updated = Array.from(
                      new Set([
                        ...optionItemIds.filter(id => !targetIds.includes(id)),
                        ...newIds,
                      ]),
                    );

                    setOptionItemIds(updated);
                    break;
                  }
                  default:
                    break;
                }
              }}
            />
          </DropdownSelector>
        );
      })}
      {isAllAnswered(questions, store) && (
        <BottomActionBar
          buttons={[
            {
              label: "저장",
              onClick: handleTemporarySave,
              variant: "outline",
            },
            {
              label: "다음",
              onClick: onNext,
              variant: "filled",
            },
          ]}
        />
      )}
      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          className="bottom-[70px]"
          onDone={() => setAlertMessage(null)}
        />
      )}
    </FunnelLayout>
  );
};

export default ListingDetails;
