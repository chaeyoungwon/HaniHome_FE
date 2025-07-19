import { useState } from "react";
import React from "react";

import Label from "@/components/listings/shared/Label";
import Section from "@/components/listings/shared/Section";

const labels = ["수도세", "전기세", "안터넷비", "가스비", "청소비", "주차비"];

const descriptions: Record<string, string> = {
  수도세: "수도 요금은 월 기준 정산됩니다.",
  전기세: "전기 요금은 사용량에 따라 부과됩니다.",
  인터넷비: "인터넷 요금은 고정 월 요금입니다.",
  가스비: "가스 요금은 계절별로 변동될 수 있습니다.",
  청소비: "청소비는 분기별로 청구됩니다.",
  주차비: "주차비는 주/20$ 입니다", //추후 변경 예정
};

const ContractInfo = () => {
  const [selected, setSelected] = useState(labels[0]);

  return (
    <div className="bg-gray-0 flex flex-col py-3">
      <Section>
        <div className="flex flex-col gap-4 px-4 py-3">
          <Label>빌 포함 항목</Label>
          <div className="flex flex-col gap-3">
            <div className="text-body2-med flex text-gray-700">
              {labels.map((label, idx) => (
                <React.Fragment key={label}>
                  <span
                    onClick={() => setSelected(label)}
                    className={`cursor-pointer ${selected === label ? "text-gray-900" : "text-gray-700"}`}
                  >
                    {label}
                  </span>
                  {idx < labels.length - 1 && (
                    <span className="mx-2 text-gray-500">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="text-body2-med rounded border border-gray-400 px-3 py-[6px] text-gray-600">
              {descriptions[selected]}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-1 px-4 py-3">
          <div className="flex items-center justify-between">
            <Label>디파짓</Label>
            <div className="text-body1-med text-gray-700">$/주</div>
          </div>
          <span className="text-cap1-med text-gray-500">디파짓 조정 가능</span>
        </div>
      </Section>

      <Section withDivider={false}>
        <div className="flex flex-col gap-3 px-4 py-3">
          <Label>계약 형태 설명</Label>
          <div className="flex flex-col gap-2">
            <div className="text-body2-med rounded border border-gray-400 px-3 py-[6px] text-gray-700">
              월 단위로 계약합니다
            </div>
            <span className="text-cap1-med text-gray-600">계약 연장 가능</span>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ContractInfo;
