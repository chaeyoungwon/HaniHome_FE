import React from "react";

import Label from "./Label";
import Section from "./Section";

interface ParkingSectionProps {
  texts: string[];
  textClassName?: string;
}

const ParkingSection = ({
  texts,
  textClassName = "text-body1-med",
}: ParkingSectionProps) => {
  return (
    <Section>
      <div className="flex flex-col gap-2 px-4 py-3">
        <Label>주차</Label>
        <div
          className={`flex items-center gap-4 text-gray-700 ${textClassName}`}
        >
          {texts.map((text, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="h-3 w-px bg-gray-500" />}
              <span>{text}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ParkingSection;
