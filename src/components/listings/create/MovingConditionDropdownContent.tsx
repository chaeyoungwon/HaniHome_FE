import { useState } from "react";

import CheckIcon from "@/components/common/CheckIcon";

import { COMMON_MOVING_CONDITIONS } from "@/constants/question-map";

import { AnswerValue } from "@/types/createPropertyAnswer";

import AvailableOptionsContent from "./AvailableOptionsContent";
import DropdownOptionsList from "./DropdownOptionsList";
import LivingConditionsContent from "./LivingConditionsContent";
import MoveInfoContent from "./MoveInfoContent";

interface MovingConditionDropdownContentProps {
  id: string;
  value: AnswerValue;
  onSelect: (value: AnswerValue) => void;
}

const MovingConditionDropdownContent = ({
  id,
  value,
  onSelect,
}: MovingConditionDropdownContentProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string | string[]>
  >(value as unknown as Record<string, string | string[]>);

  const question = COMMON_MOVING_CONDITIONS.find(q => q.id === id);
  if (!question) return null;

  let content: React.ReactNode = null;

  switch (id) {
    case "genderPreference": {
      const options = question.options as string[];
      content = (
        <>
          <DropdownOptionsList
            options={options}
            value={value as string}
            onSelect={onSelect}
          />
          <button
            onClick={() => setIsChecked(prev => !prev)}
            className="flex cursor-pointer items-center gap-1 px-4 pb-3"
          >
            <CheckIcon checked={isChecked} />
            <div className="text-cap1-med text-gray-700">LGBTQIA +</div>
          </button>
        </>
      );
      break;
    }

    case "availableOptions": {
      const options = question.options as Record<string, string[]>;
      content = (
        <AvailableOptionsContent
          options={options}
          defaultValue={selectedOptions}
          multiSelectKeys={["주차"]}
          onSelect={updated => {
            setSelectedOptions(updated);
            onSelect(updated);
          }}
        />
      );
      break;
    }

    case "livingConditions": {
      const options = question.options as string[];
      content = (
        <LivingConditionsContent
          options={options}
          value={value as Record<string, string>}
          onSelect={onSelect}
        />
      );
      break;
    }

    case "moveInInfo":
      content = <MoveInfoContent onSelect={value => onSelect(value)} />;
      break;

    default: {
      const options = question.options as string[];
      content = (
        <DropdownOptionsList
          options={options}
          value={value as string}
          onSelect={onSelect}
        />
      );
      break;
    }
  }

  const shouldApplyGap = id === "genderPreference"; // 복수 요소 있는 케이스만 gap-2 적용

  return shouldApplyGap ? (
    <div className="flex flex-col gap-2">{content}</div>
  ) : (
    <>{content}</>
  );
};

export default MovingConditionDropdownContent;
