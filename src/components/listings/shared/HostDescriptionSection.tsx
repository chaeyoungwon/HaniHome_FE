import BadgeList from "@/components/listings/BadgeLists";

import { OptionItem } from "@/types/property";

import Label from "./Label";
import Section from "./Section";

const HostDescriptionSection = ({
  description,
  badgeText,
}: {
  description: string;
  badgeText: OptionItem[];
}) => (
  <Section withDivider={false}>
    <div className="flex flex-col gap-3 px-4 py-3">
      <Label>호스트 설명</Label>
      <div className="flex max-w-[343px] flex-col gap-4">
        <div className="text-body2-med flex rounded bg-gray-200 px-2 py-3 break-words whitespace-normal text-gray-700">
          {description}
        </div>
        <BadgeList badgeText={badgeText} />
      </div>
    </div>
  </Section>
);

export default HostDescriptionSection;
