import { useEffect, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import { useDropdownAutoManager } from "@/utils/useDropdownAutoManager";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";

import { QUESTION_MAP } from "@/constants/question-map";

import DropdownSelector from "./DropdownSelector";
import FunnelStepMenu from "./FunnelStepMenu";
import ListingDetailDropdownContent from "./ListingDetailsDropdownContent";

interface ListingDetailsProps {
  onNext: () => void;
  onPrev: () => void;
}

interface SelectedAnswers {
  [key: string]: string | Record<string, string> | string[];
}

const ListingDetails = ({ onNext }: ListingDetailsProps) => {
  const { listingType } = useListingStore();

  const section = "ListingDetails"
  const questions = listingType ? QUESTION_MAP[listingType][section] : [];

  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});

  const { openIndices, toggleIndex, autoAdvance } = useDropdownAutoManager({
    totalCount: questions.length,
    shouldAutoClose: index => {
      const id = questions[index].id;
      const answer = selectedAnswers[id];

      if (id === "highlights" && Array.isArray(answer)) {
        return answer.length >= 5;
      }

      if (
        id === "internalDetails" &&
        typeof answer === "object" &&
        !Array.isArray(answer) &&
        answer !== null
      ) {
        const requiredKeys = [
          ...(listingType === "RENT"
            ? ["방 개수", "욕실 개수"]
            : ["총 거주인", "욕실 쉐어자 수"]),
          "Internal Area",
        ];
        return requiredKeys.every(key => {
          const val = answer[key];
          return typeof val === "string" && val.trim().length > 0;
        });
      }

      return !!answer;
    },
  });

  useEffect(() => {
    openIndices.forEach(idx => {
      if (autoAdvance && idx !== -1) {
        if (questions[idx] && selectedAnswers[questions[idx].id]) {
          autoAdvance(idx);
        }
      }
    });
  }, [selectedAnswers, openIndices, questions, autoAdvance]);

  if (!listingType) {
    return <div>매물 타입이 선택되지 않았습니다.</div>;
  }

  const handleSelectAnswer = (
    questionId: string,
    value: string | Record<string, string> | string[],
  ) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const formatInternalDetailsAnswerNoValue = (
    internalDetails?: Record<string, string>,
  ) => {
    if (!internalDetails) return "";

    const areaLabels = ["Internal Area", "Total Area (선택)"];
    const areaTexts = areaLabels
      .filter(key => internalDetails[key])
      .map(() => "면적");

    const resident = internalDetails["총 거주인"] ? "거주인" : "";
    const shareBathroom = internalDetails["욕실 쉐어자 수"] ? "욕실 쉐어" : "";

    const rooms = internalDetails["방 개수"] ? "방 개수" : "";
    const bathrooms = internalDetails["욕실 개수"] ? "욕실 개수" : "";

    const floorLabels = ["건물 전체 층 (선택)", "해당 층 (선택)"];
    const floorTexts = floorLabels
      .filter(key => internalDetails[key])
      .map(() => "층수");

    const parts = [
      areaTexts.length > 0 ? "면적" : null,
      resident || null,
      shareBathroom || null,
      rooms || null,
      bathrooms || null,
      floorTexts.length > 0 ? "층수" : null,
    ].filter(Boolean);

    const uniqueParts = Array.from(new Set(parts));

    return uniqueParts.join(", ");
  };

  const getAnswerText = (questionId: string): string => {
    if (questionId === "internalDetails") {
      return formatInternalDetailsAnswerNoValue(
        selectedAnswers.internalDetails as Record<string, string>,
      );
    }

    if (questionId === "highlights") {
      const highlights = selectedAnswers.highlights as string[] | undefined;
      if (!highlights || highlights.length === 0) return "";
      return highlights[0] + (highlights.length > 1 ? "···" : "");
    }
    if (questionId === "furniture") {
      const selected = selectedAnswers.furniture as string[] | undefined;
      if (!selected || selected.length === 0 || !listingType) return "";

      const furnitureOptions = QUESTION_MAP[listingType].ListingDetails.find(
        q => q.id === "furniture",
      )?.options;

      if (
        !furnitureOptions ||
        typeof furnitureOptions !== "object" ||
        Array.isArray(furnitureOptions)
      ) {
        return "";
      }

      const categories = Object.entries(furnitureOptions)
        .filter(([, items]) => items.some(item => selected.includes(item)))
        .map(([category]) => category);

      return categories.join(", ");
    }
    return (selectedAnswers[questionId] as string) || "";
  };

  const allAnswered = questions.every(q => {
    const answer = selectedAnswers[q.id];

    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    if (answer && typeof answer === "object") {
      return Object.keys(answer).length > 0;
    }
    return Boolean(answer);
  });

  return (
    <div className="pb-[70px]">
      <BackHeader rightIcon="close" />
      <FunnelStepMenu />
      {questions.map((question, idx) => {
        // question.id 별 value 전달 분기 처리
        let contentValue;
        if (question.id === "internalDetails") {
          contentValue = selectedAnswers.internalDetails ?? {};
        } else if (question.id === "highlights") {
          contentValue = (selectedAnswers.highlights as string[]) ?? [];
        } else if (question.id === "furniture") {
          contentValue = (selectedAnswers.furniture as string[]) ?? [];
        } else {
          // 일반 문자열 value
          contentValue = (selectedAnswers[question.id] as string) ?? "";
        }

        return (
          <div key={question.id}>
            <DropdownSelector
              label={question.label}
              answer={getAnswerText(question.id)}
              isOpen={openIndices.includes(idx)}
              onClick={() => toggleIndex(idx)}
            >
              <ListingDetailDropdownContent
                id={question.id}
                value={contentValue}
                onSelect={val => {
                  handleSelectAnswer(question.id, val);
                }}
              />
            </DropdownSelector>
          </div>
        );
      })}
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
            disabled: !allAnswered,
          },
        ]}
      />
    </div>
  );
};
export default ListingDetails;
