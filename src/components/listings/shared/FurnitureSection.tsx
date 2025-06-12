import { useRouter } from "next/navigation";

import Arrow from "@/public/svgs/common/left-arrow.svg";

import Label from "./Label";
import Section from "./Section";

const FurnitureSection = ({ listingId }: { listingId: string }) => {
  const router = useRouter();

  return (
    <Section>
      <div
        role="button"
        tabIndex={0}
        onClick={() => router.push(`/listings/${listingId}/furnitures`)}
        className="flex cursor-pointer justify-between px-4 py-3"
      >
        <Label>제공되는 가구</Label>
        <Arrow className="rotate-180 text-gray-700" />
      </div>
    </Section>
  );
};

export default FurnitureSection;
