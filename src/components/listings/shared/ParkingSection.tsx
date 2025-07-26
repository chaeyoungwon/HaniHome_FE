import React from "react";

import { PARKING_OPTIONID_MAP } from "@/constants/parking-options";

import { OptionItem } from "@/types/property";

import Label from "./Label";
import Section from "./Section";

interface ParkingSectionProps {
  textClassName?: string;
  data?: OptionItem[];
}

const ParkingSection = ({
  data = [],
  textClassName = "text-body1-med",
}: ParkingSectionProps) => {
  const texts = data
    .map(item => PARKING_OPTIONID_MAP[item.optionItemId])
    .filter(Boolean);

  return (
    <Section>
      <div className="flex flex-col gap-2 px-4 py-3">
        <Label>주차</Label>
        <div
          className={`flex items-center gap-4 text-gray-700 ${textClassName}`}
        >
          {texts.length > 0 ? (
            texts.map((text, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="h-3 w-px bg-gray-500" />}
                <span>{text}</span>
              </React.Fragment>
            ))
          ) : (
            <span className="text-gray-700">
              호스트가 별도의 주차 정보를 제공하지 않았어요
            </span>
          )}
        </div>
      </div>
    </Section>
  );
};

export default ParkingSection;
