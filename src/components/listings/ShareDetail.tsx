import InfoCard from "@/components/listings/shared/InfoCard";
import Section from "@/components/listings/shared/Section";

import { SHARE_TYPE_MAP } from "@/constants/housing-options";

import { ShareProperty } from "@/types/property";

import HomeIcon from "@/public/svgs/common/home-icon.svg";
import PersonIcon from "@/public/svgs/common/mypage-icon.svg";
import BathroomIcon from "@/public/svgs/listings/bathroom-icon.svg";
import HomeFilledIcon from "@/public/svgs/listings/home-filled-icon.svg";

import FurnitureSection from "./shared/FurnitureSection";
import HostDescriptionSection from "./shared/HostDescriptionSection";
import InfoRow from "./shared/InfoRow";
import ParkingSection from "./shared/ParkingSection";

const ShareDetail = ({
  listingId,
  data,
}: {
  listingId: string;
  data: ShareProperty;
}) => {
  return (
    <div className="bg-gray-0 flex flex-col py-3">
      <InfoRow
        label="매물 유형"
        value={
          Object.keys(SHARE_TYPE_MAP).find(
            key => SHARE_TYPE_MAP[key] === data.sharePropertySubType,
          ) ?? "쉐어"
        }
        textClassName="text-body2-med"
      />

      <Section>
        <div className="flex w-full py-3">
          <InfoCard
            className="gap-3"
            title="쉐어 인원"
            items={[
              <div className="flex items-center gap-[6px]" key="person">
                <PersonIcon className="text-gray-600" />
                <span className="text-body2-med text-gray-700">
                  총 {data.internalDetails.totalResidents}명 거주
                </span>
              </div>,
              <div className="flex items-center gap-[6px]" key="bathroom">
                <BathroomIcon />
                <span className="text-body2-med text-gray-700">
                  욕실 {data.internalDetails.totalBathUser}인 쉐어
                </span>
              </div>,
            ]}
          />
          <InfoCard
            className="gap-3"
            title="층수"
            items={[
              data.internalDetails.totalFloors !== undefined && (
                <div className="flex items-center gap-[6px]" key="totalFloor">
                  <HomeIcon className="h-6 w-6 text-gray-600" />
                  <span className="text-body2-med text-gray-700">
                    총 {data.internalDetails.totalFloors}층
                  </span>
                </div>
              ),
              data.internalDetails.propertyFloor !== undefined && (
                <div className="flex items-center gap-[6px]" key="currentFloor">
                  <HomeFilledIcon className="h-6 w-6 text-gray-600" />
                  <span className="text-body2-med text-gray-700">
                    {data.internalDetails.propertyFloor}층에 위치
                  </span>
                </div>
              ),
            ].filter(Boolean)}
          />
        </div>
      </Section>

      <ParkingSection
        texts={["전용공간 있어요", "Street parking 가능해요"]}
        textClassName="text-body2-med"
      />
      <FurnitureSection listingId={listingId} />
      <HostDescriptionSection
        text="여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명
     "
      />
    </div>
  );
};

export default ShareDetail;
