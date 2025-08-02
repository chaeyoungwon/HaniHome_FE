import { useListingStore } from "@/stores/useListingStore";

import { CATEGORY_OPTIONS } from "@/constants/property-category";
import { COMMON_MOVING_CONDITIONS } from "@/constants/question-map";

import { MovingConditionsOption } from "@/types/createPropertyAnswer";

import AvailableOptionsContent from "./AvailableOptionsContent";
import GenderPreferenceContent from "./GenderPreferenceContent";
import LivingConditionsContent from "./LivingConditionsContent";
import MoveInfoContent from "./MoveInfoContent";

interface MovingConditionDropdownContentProps {
  id: string;
  value: MovingConditionsOption;
  onSelect: (value: MovingConditionsOption) => void;
}

const MovingConditionDropdownContent = ({
  id,
  onSelect,
}: MovingConditionDropdownContentProps) => {
  const {
    genderPreference,
    setGenderPreference,
    lgbtAvailable,
    setLgbtAvailable,
    moveInInfo,
    setMoveInInfo,
    livingConditions,
    setLivingConditions,
    optionItemIds,
    setOptionItemIds,
  } = useListingStore();

  const question = COMMON_MOVING_CONDITIONS.find(q => q.id === id);
  if (!question) return null;
  const additionalInfoOptions = CATEGORY_OPTIONS[3].items;
  switch (id) {
    case "genderPreference":
      return (
        <GenderPreferenceContent
          value={genderPreference}
          lgbtAvailable={lgbtAvailable}
          onSelect={selectedValue => {
            setGenderPreference(selectedValue);
            onSelect({ type: "genderPreference", value: selectedValue });
          }}
          onToggleLGBT={() => setLgbtAvailable(!lgbtAvailable)}
        />
      );

    case "availableOptions":
      return (
        <AvailableOptionsContent
          options={additionalInfoOptions}
          defaultValue={optionItemIds}
          onSelect={selectedIds => {
            setOptionItemIds(selectedIds);
            onSelect({ type: "optionItemIds", value: selectedIds });
          }}
        />
      );

    case "livingConditions":
      return (
        <LivingConditionsContent
          value={livingConditions}
          onSelect={selected => {
            setLivingConditions(selected);
            onSelect({
              type: "livingConditions",
              value: selected,
            });
          }}
        />
      );

    case "moveInInfo":
      return (
        <MoveInfoContent
          value={moveInInfo}
          onSelect={selected => {
            setMoveInInfo(selected);
            onSelect({ type: "moveInInfo", value: selected });
          }}
        />
      );

    default:
      return null;
  }
};

export default MovingConditionDropdownContent;
