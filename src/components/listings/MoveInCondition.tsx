import clsx from "clsx";

import { formatToDateRange } from "@/utils/dateFormatter";

import InfoCard from "@/components/listings/shared/InfoCard";
import Label from "@/components/listings/shared/Label";
import Section from "@/components/listings/shared/Section";

import {
  CAPACITY_RENT_LABEL_MAP,
  CAPACITY_SHARE_MAP,
} from "@/constants/capacity-options";
import { GENDER_PREFERENCE_LABEL_MAP } from "@/constants/gender-options";

import { Property } from "@/types/property";

import MoveInConditionSkeleton from "../skeleton/listingsDetail/MoveInConditionSkeleton";
import ExtraConditions from "./ExtraConditions";

const MoveInCondition = ({ data }: { data?: Property }) => {
  if (!data) return <MoveInConditionSkeleton />;
  const moveInTexts = [
    data.moveInInfo.immediate && "즉시 입주 가능",
    data.moveInInfo.negotiable && "입주일자 협의 가능",
  ].filter(Boolean);

  return (
    <div className="bg-gray-0 flex flex-col py-3">
      <Section>
        <div className="flex items-center justify-between px-4 py-3">
          <Label>거주 가능 조건</Label>
          <div className="text-body2-med flex flex-col items-end gap-1 text-gray-700">
            <div className="flex items-center gap-1">
              <span>{data.lgbtAvailable && " LGBTQ 무관"}</span>
              <span className="text-gray-500">{data.lgbtAvailable && "|"}</span>
              <span>
                {
                  GENDER_PREFERENCE_LABEL_MAP[
                    data.genderPreference as keyof typeof GENDER_PREFERENCE_LABEL_MAP
                  ]
                }
              </span>
            </div>
            {data.kind === "SHARE" && (
              <span>
                {
                  CAPACITY_SHARE_MAP[
                    data.capacityShare as keyof typeof CAPACITY_SHARE_MAP
                  ]
                }
              </span>
            )}
            {data.kind === "RENT" && (
              <span>
                {
                  CAPACITY_RENT_LABEL_MAP[
                    data.capacityRent as keyof typeof CAPACITY_RENT_LABEL_MAP
                  ]
                }
              </span>
            )}
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex w-full py-3">
          <InfoCard
            className="gap-2"
            title="노티스"
            items={[
              <span className="text-body2-med text-gray-700" key="notice">
                최소 {data.livingConditions.noticePeriodWeeks}주 전
              </span>,
            ]}
          />
          <InfoCard
            className="gap-2"
            title="최소 거주 기간"
            items={[
              <span className="text-body2-med text-gray-700" key="minPeriod">
                최소 {data.livingConditions.minimumStayWeeks}주
              </span>,
            ]}
          />
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-2 px-4 py-3">
          <Label>입주 가능일</Label>
          <div
            className={clsx(
              "flex flex-col",
              (data.moveInInfo.immediate || data.moveInInfo.negotiable) &&
                "gap-1",
            )}
          >
            <div className="text-body2-med flex text-gray-700">
              {formatToDateRange(
                data.moveInInfo.availableFrom,
                data.moveInInfo.availableTo,
              )}
            </div>
            {moveInTexts.length > 0 && (
              <div
                className={`text-cap1-med text-gray-500 ${
                  moveInTexts.length > 1 ? "flex gap-2" : ""
                }`}
              >
                {moveInTexts.map((text, idx) => (
                  <span key={idx}>{text}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section withDivider={false}>
        <div className="flex flex-col gap-3 px-4 py-3">
          <div className="flex items-center justify-between">
            <Label>추가 고려사항</Label>
            <span className="text-cap1-med text-gray-600">조건 협의 가능</span>
          </div>
          <ExtraConditions data={data.optionItems} />
        </div>
      </Section>
    </div>
  );
};

export default MoveInCondition;
