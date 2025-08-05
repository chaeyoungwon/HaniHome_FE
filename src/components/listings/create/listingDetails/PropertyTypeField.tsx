import DropdownOptionsList from "@/components/listings/create/common/DropdownOptionsList";

import { RENT_TYPE_MAP, SHARE_TYPE_MAP } from "@/constants/housing-options";

import {
  RentPropertySubType,
  SharePropertySubType,
} from "@/types/listingDetailPost.type";

interface PropertyTypeFieldProps {
  listingType: "RENT" | "SHARE";
  value: RentPropertySubType | SharePropertySubType;
  onSelect: (value: RentPropertySubType | SharePropertySubType) => void;
}

const PropertyTypeField = ({
  listingType,
  value,
  onSelect,
}: PropertyTypeFieldProps) => {
  const optionMap = listingType === "RENT" ? RENT_TYPE_MAP : SHARE_TYPE_MAP;
  const options = Object.keys(optionMap);
  const mappedOptions = options.map(key => ({
    value: key,
    label: optionMap[key as keyof typeof optionMap] ?? key,
  }));

  const handleSelect = (selected: string) => {
    if (listingType === "RENT") {
      const typed = selected as RentPropertySubType;
      onSelect(typed);
    } else {
      const typed = selected as SharePropertySubType;
      onSelect(typed);
    }
  };

  return (
    <DropdownOptionsList
      options={mappedOptions}
      value={value}
      onSelect={handleSelect}
    />
  );
};

export default PropertyTypeField;
