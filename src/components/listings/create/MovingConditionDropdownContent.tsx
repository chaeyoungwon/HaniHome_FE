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
  >((value as Record<string, string | string[]>) || {});

  const question = COMMON_MOVING_CONDITIONS.find(q => q.id === id);
  if (!question) return null;

  switch (id) {
    case "genderPreference": {
      const options = question.options as string[];
      return (
        <>
          <DropdownOptionsList
            options={options}
            value={value as string}
            onSelect={onSelect}
          />
          <div
            onClick={() => setIsChecked(prev => !prev)}
            className="flex gap-1 px-4 pb-3"
          >
            <CheckIcon checked={isChecked} />
            <div className="text-cap1-med text-gray-700">LGBTQIA +</div>
          </div>
        </>
      );
    }

    case "availableOptions": {
      const options = question.options as Record<string, string[]>;
      return (
        <>
          <AvailableOptionsContent
            options={options}
            defaultValue={selectedOptions}
            multiSelectKeys={["주차"]}
            onSelect={updated => {
              setSelectedOptions(updated);
              onSelect(updated);
            }}
          />
        </>
      );
    }

    case "livingConditions": {
      const options = question.options as string[];
      return (
        <LivingConditionsContent
          options={options}
          value={value as Record<string, string>}
          onSelect={onSelect}
        />
      );
    }

    case "moveInInfo":
      return <MoveInfoContent onSelect={value => onSelect(value)} />;

    default: {
      const options = question.options as string[];
      return (
        <DropdownOptionsList
          options={options}
          value={value as string}
          onSelect={onSelect}
        />
      );
    }
  }
};

export default MovingConditionDropdownContent;
