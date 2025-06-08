import { useRouter } from "next/navigation";

import InfoCard from "@/components/listings/shared/InfoCard";
import Label from "@/components/listings/shared/Label";
import Section from "@/components/listings/shared/Section";

import HomeIcon from "@/public/svgs/common/home-icon.svg";
import Arrow from "@/public/svgs/common/left-arrow.svg";
import PersonIcon from "@/public/svgs/common/mypage-icon.svg";
import BathroomIcon from "@/public/svgs/listings/bathroom-icon.svg";
import HomeFilledIcon from "@/public/svgs/listings/home-filled-icon.svg";

import BadgeList from "./BadgeLists";

const ListingDetail = ({ listingId }: { listingId: string }) => {
  const router = useRouter();

  return (
    <div className="bg-gray-0 flex flex-col py-3">
      <Section>
        <div className="flex justify-between px-4 py-3">
          <Label>매물 유형</Label>
          <span className="text-body2-med text-gray-700">세컨드 룸 쉐어</span>
        </div>
      </Section>

      <Section>
        <div className="flex w-full py-3">
          <InfoCard
            className="gap-3"
            title="쉐어 인원"
            items={[
              <div className="flex items-center gap-[6px]" key="person">
                <PersonIcon className="text-gray-600" />
                <span className="text-body2-med text-gray-700">
                  총 n명 거주
                </span>
              </div>,
              <div className="flex items-center gap-[6px]" key="bathroom">
                <BathroomIcon />
                <span className="text-body2-med text-gray-700">
                  욕실 3인 쉐어
                </span>
              </div>,
            ]}
          />
          <InfoCard
            className="gap-3"
            title="층수"
            items={[
              <div className="flex items-center gap-[6px]" key="totalFloor">
                <HomeIcon className="h-6 w-6 text-gray-600" />
                <span className="text-body2-med text-gray-700">총 n층</span>
              </div>,
              <div className="flex items-center gap-[6px]" key="currentFloor">
                <HomeFilledIcon className="h-6 w-6 text-gray-600" />
                <span className="text-body2-med text-gray-700">n층에 위치</span>
              </div>,
            ]}
          />
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-2 px-4 py-3">
          <Label>주차</Label>
          <div className="text-body2-med flex gap-4 text-gray-700">
            <span>전용공간 있음</span>
            <span>|</span>
            <span>Street parking 가능</span>
          </div>
        </div>
      </Section>

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

      <Section withDivider={false}>
        <div className="flex flex-col gap-3 px-4 py-3">
          <Label>호스트 설명</Label>
          <div className="flex max-w-[343px] flex-col gap-4">
            <div className="text-body2-med flex rounded bg-gray-200 px-2 py-3 break-words whitespace-normal text-gray-700">
              여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명
            </div>
            <BadgeList />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ListingDetail;
