import DropdownOptionsList from "@/components/listings/create/common/DropdownOptionsList";

import { CATEGORY_OPTIONS } from "@/constants/property-category";

interface IsBrokeredFieldProps {
  value: number[];
  onChange: (value: number[]) => void;
}

const IsBrokeredField = ({ value, onChange }: IsBrokeredFieldProps) => {
  const brokeredOptions = CATEGORY_OPTIONS[5].items.map(
    ({ optionId, label }) => ({
      value: optionId,
      label,
    }),
  );
  const selectedOptionId = value[0] ?? null;

  const handleSelect = (optionId: number) => {
    const newValue = [optionId];
    onChange(newValue);
  };

  return (
    <DropdownOptionsList
      options={brokeredOptions}
      value={selectedOptionId}
      onSelect={handleSelect}
    />
  );
};

export default IsBrokeredField;
