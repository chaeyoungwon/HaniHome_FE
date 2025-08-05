"use client";

import { useEffect, useMemo } from "react";

import { useListingStore } from "@/stores/useListingStore";

import {
  LISTING_DETAILS_IDS,
  getAnswerText,
  getAnswerValue,
  isAllAnswered,
} from "@/utils/listing/create/answerHelpers";
import { useDropdownAutoManager } from "@/utils/listing/create/useDropdownAutoManager";

import BottomActionBar from "@/components/common/BottomActionBar";
import DropdownSelector from "@/components/listings/create/common/DropdownSelector";
import FunnelLayout from "@/components/listings/create/common/FunnelLayout";

import { QUESTION_MAP } from "@/constants/question-map";

import { ListingDetailsOption } from "@/types/createPropertyAnswer.type";
import {
  CapacityRent,
  CapacityShare,
  RentInternalDetails,
  RentPropertySubType,
  ShareInternalDetails,
  SharePropertySubType,
} from "@/types/listingDetailPost.type";

import ListingDetailsDropdownContent from "./ListingDetailsDropdownContent";

interface ListingDetailsProps {
  onNext: () => void;
  onPrev: () => void;
}

const ListingDetails = ({ onNext }: ListingDetailsProps) => {
  const store = useListingStore();
  const { listingType, optionItemIds, setOptionItemIds } = store;

  const section = "ListingDetails";
  const questions = useMemo(() => {
    return listingType ? QUESTION_MAP[listingType][section] : [];
  }, [listingType, section]);

  const { highlightIds, furnitureIds, isBrokeredIds } = LISTING_DETAILS_IDS;

  const { openIndices, toggleIndex, autoAdvance } = useDropdownAutoManager({
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
      const answer = getAnswerValue(
        questions[idx].id as ListingDetailsOption["type"],
        store,
      );
      if (autoAdvance && answer) autoAdvance(idx);
    });
  }, [openIndices, questions, autoAdvance, store]);

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

      <BottomActionBar
        buttons={[
          {
            label: "저장",
            onClick: () => {
              console.log("저장된 Zustand 상태", {
                rentPropertyType: store.rentPropertyType,
                sharePropertyType: store.sharePropertyType,
                rentCapacityPeople: store.rentCapacityPeople,
                shareCapacityPeople: store.shareCapacityPeople,
                rentInternalDetails: store.rentInternalDetails,
                shareInternalDetails: store.shareInternalDetails,
                optionItemIds,
              });
            },
            variant: "outline",
          },
          {
            label: "다음",
            onClick: onNext,
            variant: "filled",
            disabled: !isAllAnswered(questions, store),
          },
        ]}
      />
    </FunnelLayout>
  );
};

export default ListingDetails;
