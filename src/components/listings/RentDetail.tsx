import InfoCard from "@/components/listings/shared/InfoCard";
import Label from "@/components/listings/shared/Label";
import Section from "@/components/listings/shared/Section";

import { CAPACITY_RENT_LABEL_MAP } from "@/constants/capacity-options";
import { RENT_TYPE_MAP } from "@/constants/housing-options";

import { RentPropertySubType } from "@/types/listingDetailPost.type";
import { RentProperty } from "@/types/property.type";

import PersonIcon from "@/public/svgs/common/mypage-icon.svg";

import FurnitureSection from "./shared/FurnitureSection";
import HostDescriptionSection from "./shared/HostDescriptionSection";
import InfoRow from "./shared/InfoRow";
import ParkingSection from "./shared/ParkingSection";

const RentDetail = ({
  listingId,
  data,
}: {
  listingId: string;
  data: RentProperty;
}) => {
  const infoList: { label: string; value: string }[] = [
    data.internalDetails.numberOfRoom != null && {
      label: "방 개수",
      value: `${data.internalDetails.numberOfRoom}개`,
    },
    data.internalDetails.numberOfBath != null && {
      label: "욕실 개수",
      value: `${data.internalDetails.numberOfBath}개`,
    },
    data.internalDetails.totalFloors != null && {
      label: "건물 전체 층",
      value: `${data.internalDetails.totalFloors}층`,
    },
    data.internalDetails.propertyFloors != null && {
      label: "해당 층",
      value: `${data.internalDetails.propertyFloors}층`,
    },
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  const rentTypeText = data.optionItems.find(item => item.optionItemId === 54)
    ? "개인 임대"
    : data.optionItems.find(item => item.optionItemId === 55)
      ? "부동산 중개"
      : "비공개";

  const hasYard = data.optionItems.some(item => item.optionItemId === 102);
  const hasVeranda = data.optionItems.some(item => item.optionItemId === 103);

  return (
    <div className="bg-gray-0 flex flex-col py-3">
      <InfoRow
        label="매물 유형"
        value={`${RENT_TYPE_MAP[data.rentPropertySubType as RentPropertySubType]} 렌트`}
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
                  총 거주{" "}
                  {
                    CAPACITY_RENT_LABEL_MAP[
                      data.capacityRent as keyof typeof CAPACITY_RENT_LABEL_MAP
                    ]
                  }
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
                <span className="text-body1-med text-gray-700">
                  {rentTypeText}
                </span>
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
              <div className="w-1/2 text-center">
                {hasYard ? "마당 있어요" : "마당 없어요"}
              </div>
              <div className="h-3 w-px bg-gray-500" />
              <div className="w-1/2 text-center">
                {hasVeranda ? "베란다 있어요" : "베란다 없어요"}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <ParkingSection data={data.optionItems} textClassName="text-body1-med" />

      <FurnitureSection listingId={listingId} data={data.optionItems} />
      <HostDescriptionSection
        description={data.description}
        badgeText={data.optionItems}
      />
    </div>
  );
};

export default RentDetail;
