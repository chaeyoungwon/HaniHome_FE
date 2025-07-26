import { useRouter } from "next/navigation";

import { CATEGORY_OPTIONS } from "@/constants/propertyCategory";

import { OptionItem } from "@/types/property";

import Arrow from "@/public/svgs/common/left-arrow.svg";

import Label from "./Label";
import Section from "./Section";

const FurnitureSection = ({
  listingId,
  data,
}: {
  listingId: string;
  data: OptionItem[];
}) => {
  const router = useRouter();

  const furnitureOptionIds = Object.values(CATEGORY_OPTIONS[2].items)
    .flat()
    .map(item => item.optionId) as number[];

  const selectedFurnitureIds = data
    .filter(item => furnitureOptionIds.includes(item.optionItemId))
    .map(item => item.optionItemId)
    .join(",");

  return (
    <Section>
      <div
        role="button"
        tabIndex={0}
        onClick={() =>
          router.push(
            `/listings/${listingId}/furnitures?ids=${encodeURIComponent(
              selectedFurnitureIds,
            )}`,
          )
        }
        className="flex cursor-pointer justify-between px-4 py-3"
      >
        <Label>제공되는 가구</Label>
        <Arrow className="h-6 w-6 rotate-180 text-gray-700" />
      </div>
    </Section>
  );
};

export default FurnitureSection;
