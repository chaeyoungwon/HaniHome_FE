import InfoCard from "@/components/listings/shared/InfoCard";
import Label from "@/components/listings/shared/Label";
import Section from "@/components/listings/shared/Section";

import { RENT_TYPE_MAP } from "@/constants/housing-options";

import { RentProperty } from "@/types/property";

import PersonIcon from "@/public/svgs/common/mypage-icon.svg";

import FurnitureSection from "./shared/FurnitureSection";
import HostDescriptionSection from "./shared/HostDescriptionSection";
import InfoRow from "./shared/InfoRow";
import ParkingSection from "./shared/ParkingSection";

const infoList = [
  { label: "방 개수", value: "n개" },
  { label: "욕실 개수", value: "n개" },
  { label: "건물 전체 층", value: "n층" },
  { label: "해당 층", value: "n층" },
];

const RentDetail = ({
  listingId,
  data,
}: {
  listingId: string;
  data: RentProperty;
}) => {
  return (
    <div className="bg-gray-0 flex flex-col py-3">
      <InfoRow
        label="매물 유형"
        value={
          Object.keys(RENT_TYPE_MAP).find(
            key => RENT_TYPE_MAP[key] === data.rentPropertySubType,
          ) ?? "쉐어"
        }
      />

      <Section>
        <div className="flex w-full py-3">
          <InfoCard
            className="gap-3"
            title="거주 가능 인원"
            items={[
              <div className="flex items-center gap-2" key="person">
                <PersonIcon className="text-gray-600" />
                <span className="text-body1-med text-gray-700">
                  총 거주 {data.capacityRent}인
                </span>
              </div>,
            ]}
          />
          <InfoCard
            className="gap-3"
            title="부동산 중개 여부"
            items={[
              <div className="flex items-center gap-2" key="totalFloor">
                <PersonIcon className="text-gray-600" />
                <span className="text-body1-med text-gray-700">개인 임대</span>
              </div>,
            ]}
          />
        </div>
      </Section>

      <Section>
        <div className="text-body2-med grid grid-cols-2 text-gray-700">
          {infoList.map(({ label, value }) => (
            <div key={label} className="flex justify-between px-4 py-3">
              <Label>{label}</Label>
              <span className="text-body1-med text-gray-700">{value}</span>
            </div>
          ))}

          <div className="col-span-2 flex items-center gap-9 px-4 py-3">
            <Label>마당, 베란다</Label>
            <div className="text-body1-med flex flex-1 items-center justify-between gap-4 text-gray-700">
              <div className="w-1/2 text-center">마당 없어요</div>
              <div className="h-3 w-px bg-gray-500" />
              <div className="w-1/2 text-center">베란다 없어요</div>
            </div>
          </div>
        </div>
      </Section>

      <ParkingSection
        texts={["전용공간 있어요", "Street parking 가능해요"]}
        textClassName="text-body1-med"
      />
      <InfoRow label="매물 방향" value="북향" />
      <FurnitureSection listingId={listingId} />
      <HostDescriptionSection
        text="여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명여기는호스트설명
     "
      />
    </div>
  );
};

export default RentDetail;
