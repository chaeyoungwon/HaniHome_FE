import DropdownOptionsList from "@/components/listings/create/common/DropdownOptionsList";

import {
  CAPACITY_RENT_MAP,
  CAPACITY_SHARE_MAP,
} from "@/constants/capacity-options";

import { CapacityRent, CapacityShare } from "@/types/listingDetail";

interface CapacityPeopleFieldProps {
  listingType: "RENT" | "SHARE";
  value: CapacityRent | CapacityShare;
  onSelect: (value: CapacityRent | CapacityShare) => void;
}

const CapacityPeopleField = ({
  listingType,
  value,
  onSelect,
}: CapacityPeopleFieldProps) => {
  const optionMap =
    listingType === "RENT" ? CAPACITY_RENT_MAP : CAPACITY_SHARE_MAP;

  const options = Object.keys(optionMap) as (keyof typeof optionMap)[];

  const mappedOptions = options.map(key => ({
    value: key,
    label: optionMap[key],
  }));

  const handleSelect = (selected: string) => {
    onSelect(selected as CapacityRent | CapacityShare);
  };

  return (
    <DropdownOptionsList
      options={mappedOptions}
      value={value}
      onSelect={handleSelect}
    />
  );
};

export default CapacityPeopleField;
