"use client";

import { useEffect, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import { formatMeetingDay } from "@/utils/formatter/dateFormatter";
import { useDropdownAutoManager } from "@/utils/listing/create/useDropdownAutoManager";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import DropdownSelector from "@/components/listings/create/common/DropdownSelector";
import FunnelLayout from "@/components/listings/create/common/FunnelLayout";

import { GENDER_PREFERENCE_MAP } from "@/constants/gender-options";
import { CATEGORY_OPTIONS } from "@/constants/property-category";
import { COMMON_MOVING_CONDITIONS } from "@/constants/question-map";

import { MovingConditionsOption } from "@/types/createPropertyAnswer.type";

import MovingConditionDropdownContent from "./MovingConditionDropdownContent";

interface MovingConditionProps {
  onNext: () => void;
  onPrev: () => void;
}

const MovingCondition = ({ onNext }: MovingConditionProps) => {
  const {
    genderPreference,
    moveInInfo,
    livingConditions,
    optionItemIds,
    setGenderPreference,
    setMoveInInfo,
    setLivingConditions,
    setOptionItemIds,
  } = useListingStore();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const { openIndices, visibleIndices, toggleIndex, autoAdvance } =
    useDropdownAutoManager({
      totalCount: COMMON_MOVING_CONDITIONS.length,
      shouldAutoClose: index => {
        const id = COMMON_MOVING_CONDITIONS[index].id;
        switch (id) {
          case "genderPreference":
            return !!genderPreference;
          case "additionalInfo":
            return optionItemIds.length > 0;
          case "moveInInfo":
            return (
              !!moveInInfo.availableFrom ||
              !!moveInInfo.immediate ||
              !!moveInInfo.negotiable
            );
          case "livingConditions":
            return (
              !!livingConditions &&
              (!!livingConditions.noticePeriodWeeks ||
                !!livingConditions.minimumStayWeeks)
            );
          default:
            return false;
        }
      },
    });

  useEffect(() => {
    const currentIndex = openIndices[0]; // 단일 드롭다운 처리
    if (currentIndex === undefined || currentIndex === -1) return;

    const id = COMMON_MOVING_CONDITIONS[currentIndex].id;
    let timer: NodeJS.Timeout | null = null;

    switch (id) {
      case "genderPreference":
        if (genderPreference) {
          timer = setTimeout(() => {
            autoAdvance(currentIndex);
          }, 4000);
        }
        break;
      case "additionalInfo":
        if (optionItemIds.length > 0) {
          timer = setTimeout(() => {
            autoAdvance(currentIndex);
          }, 4000);
        }
        break;
      case "moveInInfo":
        if (
          moveInInfo.availableFrom ||
          moveInInfo.immediate ||
          moveInInfo.negotiable
        ) {
          timer = setTimeout(() => {
            autoAdvance(currentIndex);
          }, 4000);
        }
        break;
      case "livingConditions":
        if (
          livingConditions &&
          (livingConditions.noticePeriodWeeks ||
            livingConditions.minimumStayWeeks)
        ) {
          timer = setTimeout(() => {
            autoAdvance(currentIndex);
          }, 4000);
        }
        break;
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [
    openIndices,
    autoAdvance,
    genderPreference,
    optionItemIds,
    moveInInfo,
    livingConditions,
  ]);

  const handleSelect = (id: string, option: MovingConditionsOption) => {
    switch (option.type) {
      case "genderPreference":
        setGenderPreference(option.value);
        break;
      case "optionItemIds":
        setOptionItemIds(option.value);
        break;
      case "moveInInfo":
        if (option.value) setMoveInInfo(option.value);
        break;
      case "livingConditions":
        setLivingConditions(option.value);
        break;
    }
  };

  const allAnswered = COMMON_MOVING_CONDITIONS.every(item => {
    switch (item.id) {
      case "genderPreference":
        return !!genderPreference;
      case "additionalInfo": {
        const additionalInfoItems = CATEGORY_OPTIONS[3].items;
        const requiredGroups = Object.keys(additionalInfoItems);

        const selectedItems = Object.entries(additionalInfoItems).flatMap(
          ([group, options]) =>
            options
              .filter(option => optionItemIds.includes(option.optionId))
              .map(option => ({ ...option, group })),
        );

        const selectedGroups = new Set(selectedItems.map(item => item.group));
        return requiredGroups.every(group => selectedGroups.has(group));
      }
      case "moveInInfo":
        return (
          !!moveInInfo.availableFrom ||
          !!moveInInfo.immediate ||
          !!moveInInfo.negotiable
        );
      case "livingConditions":
        return (
          !!livingConditions &&
          !!livingConditions.noticePeriodWeeks &&
          !!livingConditions.minimumStayWeeks &&
          !!livingConditions.contractTerms
        );
      default:
        return false;
    }
  });

  const AVAILABLE_KEY_LABEL_MAP: Record<string, string> = {
    흡연자: "흡연자",
    반려동물: "반려동물",
    "외부인 방문": "외부인",
    주차: "주차",
    "주방 사용": "주방",
  };

  const getAnswerText = (itemId: string): string => {
    if (itemId === "genderPreference") {
      return genderPreference ? GENDER_PREFERENCE_MAP[genderPreference] : "";
    }

    if (itemId === "additionalInfo") {
      const selectedIds = optionItemIds;
      const additionalInfoItems = CATEGORY_OPTIONS[3].items;

      const selectedCategories = Object.entries(additionalInfoItems)
        .filter(([, options]) =>
          options.some(option => selectedIds.includes(option.optionId)),
        )
        .map(([category]) => AVAILABLE_KEY_LABEL_MAP[category] ?? category);

      return selectedCategories.join(", ");
    }

    if (itemId === "livingConditions" && livingConditions) {
      const { noticePeriodWeeks, minimumStayWeeks, contractTerms } =
        livingConditions;

      const parts: string[] = [];
      if (noticePeriodWeeks) parts.push(`노티스 ${noticePeriodWeeks}주`);
      if (minimumStayWeeks) parts.push(`최소 ${minimumStayWeeks}주`);
      if (contractTerms) parts.push("계약 형태");
      return parts.join(", ");
    }

    if (itemId === "moveInInfo" && moveInInfo) {
      const { availableFrom, availableTo, immediate, negotiable } = moveInInfo;

      const parts: string[] = [];

      const from = availableFrom ? formatMeetingDay(availableFrom).date : null;
      const to = availableTo ? formatMeetingDay(availableTo).date : null;

      if (from && to) parts.push(`${from} ~ ${to}`);
      else parts.push("날짜 미정");

      if (immediate) parts.push("즉시 입주");
      if (negotiable) parts.push("협의 가능");

      return parts.join(", ");
    }

    return "";
  };

  const getValueById = (id: string): MovingConditionsOption => {
    switch (id) {
      case "genderPreference":
        return { type: "genderPreference", value: genderPreference };

      case "additionalInfo":
        return { type: "optionItemIds", value: optionItemIds };

      case "moveInInfo":
        return { type: "moveInInfo", value: moveInInfo };

      case "livingConditions":
        return { type: "livingConditions", value: livingConditions };

      default:
        throw new Error("Unknown ID");
    }
  };

  return (
    <FunnelLayout>
      {COMMON_MOVING_CONDITIONS.map((item, index) => {
        const value = getValueById(item.id);
        if (value === undefined) return null;

        return (
          <DropdownSelector
            key={item.id}
            label={item.label}
            answer={getAnswerText(item.id)}
            isOpen={openIndices.includes(index)}
            isVisible={visibleIndices.includes(index)}
            onClick={() => toggleIndex(index)}
          >
            <MovingConditionDropdownContent
              id={item.id}
              value={value}
              onSelect={value => handleSelect(item.id, value)}
            />
          </DropdownSelector>
        );
      })}
      {allAnswered && (
        <BottomActionBar
          buttons={[
            {
              label: "저장",
              onClick: () => {
                console.log(
                  genderPreference,
                  moveInInfo,
                  livingConditions,
                  optionItemIds,
                );
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

export default MovingCondition;
