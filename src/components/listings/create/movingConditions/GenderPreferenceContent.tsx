import CheckIcon from "@/components/common/CheckIcon";
import DropdownOptionsList from "@/components/listings/create/common/DropdownOptionsList";

import { GENDER_PREFERENCE_MAP } from "@/constants/gender-options";

import { GenderPreference } from "@/types/listingDetailPost.type";

interface GenderPreferenceContentProps {
  value: GenderPreference | null;
  lgbtAvailable: boolean;
  onSelect: (value: GenderPreference) => void;
  onToggleLGBT: () => void;
}

const GenderPreferenceContent = ({
  value,
  lgbtAvailable,
  onSelect,
  onToggleLGBT,
}: GenderPreferenceContentProps) => {
  const OPTIONS = (
    Object.keys(GENDER_PREFERENCE_MAP) as GenderPreference[]
  ).map(key => ({
    value: key,
    label: GENDER_PREFERENCE_MAP[key],
  }));

  return (
    <div className="flex flex-col gap-2">
      <DropdownOptionsList
        options={OPTIONS}
        value={value}
        onSelect={onSelect}
      />
      <button
        onClick={onToggleLGBT}
        className="flex cursor-pointer items-center gap-1 px-4 pb-3"
      >
        <CheckIcon checked={lgbtAvailable} />
        <div className="text-cap1-med text-gray-700">LGBTQIA +</div>
      </button>
    </div>
  );
};

export default GenderPreferenceContent;
