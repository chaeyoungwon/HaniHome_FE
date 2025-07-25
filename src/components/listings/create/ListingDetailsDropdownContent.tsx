import { useListingStore } from "@/stores/useListingStore";

import { QUESTION_MAP } from "@/constants/question-map";

import DropdownOptionsList from "./DropdownOptionsList";
import FurnitureContent from "./FurnitureContent";
import HighLightsContent from "./HighLightsContent";
import InternalDetailsContent from "./InternalDetailsContent";

interface Props {
  id: string;
  value: string | string[] | Record<string, string>;
  onSelect: (value: string | string[] | Record<string, string>) => void;
}

const ListingDetailsDropdownContent = ({ id, value, onSelect }: Props) => {
  const { listingType } = useListingStore();

  if (!listingType) return null;

  const question = QUESTION_MAP[listingType].ListingDetails.find(
    q => q.id === id,
  );
  if (!question) return null;

  switch (id) {
    case "internalDetails":
      return (
        <InternalDetailsContent
          value={value as Record<string, string>}
          onChange={onSelect}
        />
      );
    case "highlights":
      return (
        <HighLightsContent value={value as string[]} onChange={onSelect} />
      );
    case "furniture":
      return <FurnitureContent value={value as string[]} onChange={onSelect} />;
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

export default ListingDetailsDropdownContent;
