import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import {
  fetchTemporaryPropertyData,
  postTemporaryPropertyData,
} from "@/apis/propertyApi";

import { createPayloadByStep } from "@/hooks/property/createPayloadBySteps";

import {
  convertUtcStringToLocalTime,
  formatMeetingDay,
} from "@/utils/formatter/dateFormatter";
import { useDropdownAutoManager } from "@/utils/listing/create/useDropdownAutoManager";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import DropdownSelector from "@/components/listings/create/common/DropdownSelector";
import FunnelLayout from "@/components/listings/create/common/FunnelLayout";

import { COMMON_CONTRACT_TERMS } from "@/constants/question-map";

import { ContractTermsOption } from "@/types/createPropertyAnswer.type";
import { OptionItem } from "@/types/listingDetailGet.type";
import { TemporaryPropertyPost } from "@/types/temporaryProperty.type";

import ContractTermsContent from "./ContractTermsContent";

interface ContractTermsProps {
  onNext: () => void;
  onPrev: () => void;
}

const ContractTerms = ({ onNext }: ContractTermsProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, ContractTermsOption>
  >({});
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const store = useListingStore();
  const {
    costDetails,
    timeSlots,
    meetingDateFrom,
    meetingDateTo,
    optionItemIds,
    viewingAlwaysAvailable,
  } = store;
  const searchParams = useSearchParams();
  const draftId = searchParams.get("draftId");
  const [draftData, setDraftData] = useState<TemporaryPropertyPost | null>(
    null,
  );

  const { openIndices, visibleIndices, toggleIndex, autoAdvance } =
    useDropdownAutoManager({
      totalCount: COMMON_CONTRACT_TERMS.length,
      shouldAutoClose: index => {
        const id = COMMON_CONTRACT_TERMS[index].id;
        if (id === "costDetails") {
          const { weeklyCost, deposit } = costDetails;
          return !!(weeklyCost && deposit);
        }
        if (id === "meetingTime") {
          return !!(
            (meetingDateFrom && meetingDateTo) ||
            viewingAlwaysAvailable
          );
        }
        if (id === "timeSlots") {
          return !!(timeSlots && timeSlots.length > 0);
        }
        return !!selectedAnswers[id];
      },
    });

  useEffect(() => {
    const currentIndex = openIndices[0]; // 단일 드롭다운 처리
    if (currentIndex === undefined || currentIndex === -1) return;

    const id = COMMON_CONTRACT_TERMS[currentIndex].id;
    let timer: NodeJS.Timeout | null = null;

    if (id === "costDetails") {
      const { weeklyCost, deposit } = costDetails;
      if (weeklyCost && deposit) {
        timer = setTimeout(() => {
          autoAdvance(currentIndex);
        }, 1500);
      }
    } else if (id === "meetingTime") {
      if ((meetingDateFrom && meetingDateTo) || viewingAlwaysAvailable) {
        timer = setTimeout(() => {
          autoAdvance(currentIndex);
        }, 1500);
      }
    } else if (id === "timeSlots") {
      if (timeSlots && timeSlots.length > 0) {
        timer = setTimeout(() => {
          autoAdvance(currentIndex);
        }, 1500);
      }
    } else {
      const answer = selectedAnswers[id];
      if (answer) {
        autoAdvance(currentIndex);
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [
    selectedAnswers,
    openIndices,
    autoAdvance,
    costDetails,
    meetingDateFrom,
    meetingDateTo,
    viewingAlwaysAvailable,
    timeSlots,
  ]);

  useEffect(() => {
    const initDraft = async () => {
      if (!draftId) return;
      try {
        const draftData = await fetchTemporaryPropertyData(Number(draftId));
        setDraftData(draftData);

        if (draftData) {
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
          if (draftData.optionItems) {
            const optionItemIds = draftData.optionItems.map(
              (item: OptionItem) => item.optionItemId,
            );
            store.setOptionItemIds(optionItemIds);
          }
        }
      } catch (error) {
        console.error("임시 저장 데이터 가져오기 실패", error);
      }
    };
    initDraft();
  }, [draftId]);

  const handleSelect = (id: string, value: ContractTermsOption) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [id]: value,
    }));
    const index = COMMON_CONTRACT_TERMS.findIndex(item => item.id === id);
    if (index !== -1) autoAdvance(index);
  };

  const handleOptionItemIdsChange = (newIds: number[]) => {
    setSelectedAnswers(prev => ({
      ...prev,
      optionItemIds: { type: "optionItemIds", value: newIds },
    }));
  };

  const allAnswered = COMMON_CONTRACT_TERMS.every(item => {
    if (item.id === "costDetails") {
      return costDetails.weeklyCost && costDetails.deposit;
    }
    if (item.id === "meetingTime") {
      return (meetingDateFrom && meetingDateTo) || viewingAlwaysAvailable;
    }
    if (item.id === "timeSlots") {
      return (
        timeSlots &&
        timeSlots.length > 0 &&
        timeSlots.some(
          slot => !(slot.timeFrom === null || slot.timeTo === null),
        )
      );
    }
    return !!selectedAnswers[item.id];
  });

  const allowedOptionIds = [47, 48, 49, 50, 51, 52, 53];
  const isBillIncludedSelected = optionItemIds.some(id =>
    allowedOptionIds.includes(id),
  );

  const getAnswerText = (itemId: string): string | undefined => {
    switch (itemId) {
      case "costDetails": {
        const { weeklyCost, deposit, keyDeposit, billIncluded } = costDetails;
        const parts = [];

        if (weeklyCost && weeklyCost > 0) {
          if (billIncluded) {
            parts.push(`빌 포함 주 ${weeklyCost}$`);
          } else {
            parts.push(`주 ${weeklyCost}$`);
          }
        }
        if (deposit && deposit > 0) parts.push(`디파짓 ${deposit}$`);
        if (keyDeposit && keyDeposit > 0)
          parts.push(`키 디파짓 ${keyDeposit}$`);

        return parts.join(", ");
      }

      case "meetingTime": {
        const formattedFrom = meetingDateFrom
          ? formatMeetingDay(meetingDateFrom).date
          : "";
        const formattedTo = meetingDateTo
          ? formatMeetingDay(meetingDateTo).date
          : "";
        if (!formattedFrom && !formattedTo) return "기한 상관없음";
        return `${formattedFrom ?? ""} ~ ${formattedTo ?? ""}`;
      }

      case "timeSlots": {
        if (!timeSlots) return "";
        const parts = [];
        for (const slot of timeSlots) {
          if (
            (slot.timeFrom === "00:00" || slot.timeFrom === null) &&
            (slot.timeTo === "00:00" || slot.timeTo === null)
          )
            continue;

          if (!slot.timeFrom) continue;

          const localTime = convertUtcStringToLocalTime(slot.timeFrom);
          const hour = parseInt(localTime.split(":")[0]);

          if (hour === 0) {
            parts.push("저녁");
          } else if (hour < 12) {
            parts.push("아침");
          } else if (hour < 18) {
            parts.push("점심");
          } else {
            parts.push("저녁");
          }
        }

        return [...new Set(parts)].join(", ");
      }

      default:
        return "";
    }
  };

  const handleTemporarySave = async () => {
    const payload = createPayloadByStep("CONTRACT_TERMS", store, draftData);
    try {
      await postTemporaryPropertyData(payload);
    } catch (e) {
      console.error("임시 저장 실패:", e);
    }
  };
  return (
    <FunnelLayout>
      {COMMON_CONTRACT_TERMS.map((item, index) => (
        <DropdownSelector
          key={item.id}
          label={item.label}
          answer={getAnswerText(item.id)}
          isOpen={openIndices.includes(index)}
          isVisible={visibleIndices.includes(index)}
          onClick={() => toggleIndex(index)}
        >
          {item.options && (
            <ContractTermsContent
              id={item.id}
              value={selectedAnswers[item.id]}
              onSelect={value => handleSelect(item.id, value)}
              optionItemIds={optionItemIds}
              onOptionItemIdsChange={handleOptionItemIdsChange}
            />
          )}
        </DropdownSelector>
      ))}
      {allAnswered && (
        <BottomActionBar
          buttons={[
            {
              label: "저장",
              onClick: handleTemporarySave,
              variant: "outline",
              disabled: !allAnswered,
            },
            {
              label: "다음",
              onClick: onNext,
              variant: "filled",
              disabled: !allAnswered || !isBillIncludedSelected,
            },
          ]}
        />
      )}

      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          className="bottom-17"
          onDone={() => setAlertMessage(null)}
        />
      )}
    </FunnelLayout>
  );
};

export default ContractTerms;
