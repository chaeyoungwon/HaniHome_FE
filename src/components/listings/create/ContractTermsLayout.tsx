import { useEffect, useState } from "react";

import { useDropdownAutoManager } from "@/utils/useDropdownAutoManager";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";

import { COMMON_CONTRACT_TERMS } from "@/constants/question-map";

import { AnswerValue } from "@/types/createPropertyAnswer";

import ContractTermsContent from "./ContractTermsContent";
import DropdownSelector from "./DropdownSelector";
import FunnelStepMenu from "./FunnelStepMenu";

interface ContractTermsProps {
  onNext: () => void;
  onPrev: () => void;
}
const ContractTerms = ({ onNext }: ContractTermsProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, AnswerValue>
  >({});
  const { openIndices, toggleIndex, autoAdvance } = useDropdownAutoManager({
    totalCount: COMMON_CONTRACT_TERMS.length,
    shouldAutoClose: index =>
      !!selectedAnswers[COMMON_CONTRACT_TERMS[index].id],
  });

  useEffect(() => {
    openIndices.forEach(idx => {
      if (autoAdvance && idx !== -1) {
        const id = COMMON_CONTRACT_TERMS[idx].id;
        const answer = selectedAnswers[id];
        if (answer) autoAdvance(idx);
      }
    });
  }, [selectedAnswers, openIndices, autoAdvance]);

  const handleSelect = (id: string, value: AnswerValue) => {
    setSelectedAnswers(prev => ({ ...prev, [id]: value }));
  };
  const getAnswerText = (itemId: string) => {
    const answer = selectedAnswers[itemId];
    if (!answer) return "";
    if (typeof answer === "string") return answer.trim();
    if (Array.isArray(answer)) return answer.filter(Boolean).join(", ");
    return "";
  };
  return (
    <div className="pb-70">
      <BackHeader rightIcon="close" />
      <FunnelStepMenu />
      {COMMON_CONTRACT_TERMS.map((item, index) => (
        <DropdownSelector
          key={item.id}
          label={item.label}
          answer={getAnswerText(item.id)}
          isOpen={openIndices.includes(index)}
          onClick={() => toggleIndex(index)}
        >
          {item.options && (
            <ContractTermsContent
              id={item.id}
              options={item.options}
              onSelect={handleSelect}
            />
          )}
        </DropdownSelector>
      ))}
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
export default ContractTerms;
