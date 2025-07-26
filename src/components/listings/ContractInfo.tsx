import React from "react";

import Label from "@/components/listings/shared/Label";
import Section from "@/components/listings/shared/Section";

import { CATEGORY_OPTIONS } from "@/constants/propertyCategory";

import { Property } from "@/types/property";

const ContractInfo = ({ data }: { data: Property }) => {
  const includedOptionIds =
    data.optionItems?.map(item => item.optionItemId) ?? [];

  const includedItems = CATEGORY_OPTIONS[4].items.filter(opt =>
    includedOptionIds.includes(opt.optionId),
  );

  return (
    <div className="bg-gray-0 flex flex-col py-3">
      {/* 빌 포함 항목 */}
      <Section>
        <div className="flex flex-col px-4 py-3">
          <Label>빌 포함 항목</Label>
          <div
            className={`mt-4 flex flex-wrap items-center ${
              includedItems.length > 0 ? "mb-3" : ""
            }`}
          >
            {includedItems.length > 0 &&
              includedItems.map(({ label }, idx) => (
                <React.Fragment key={label}>
                  <span className="text-body2-med text-gray-700">{label}</span>
                  {idx < includedItems.length - 1 && (
                    <span className="mx-2 text-gray-500">|</span>
                  )}
                </React.Fragment>
              ))}
          </div>
          <div className="text-body2-med rounded border border-gray-400 px-3 py-[6px] text-gray-600">
            {data.costDetails.costDescription}
          </div>
        </div>
      </Section>

      {/* 디파짓 */}
      <Section>
        <div className="flex flex-col gap-1 px-4 py-3">
          <div className="flex items-center justify-between">
            <Label>디파짓</Label>
            <div className="text-body1-med text-gray-700">
              {data.costDetails.deposit}$/주
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-cap1-med text-gray-500">
              {data.costDetails.depositAdjustable
                ? "디파짓 조정 가능"
                : "디파짓 조정 불가능"}
            </span>
            {Number(data.costDetails.keyDeposit) > 0 && (
              <span className="text-cap1-med text-gray-500">
                키 디파짓 {data.costDetails.keyDeposit}$
              </span>
            )}
          </div>
        </div>
      </Section>

      {/* 계약 조건 */}
      <Section withDivider={false}>
        <div className="flex flex-col gap-3 px-4 py-3">
          <Label>계약 형태 설명</Label>
          <div className="flex flex-col gap-2">
            <div className="text-body2-med rounded border border-gray-400 px-3 py-[6px] text-gray-700">
              {data.livingConditions.contractTerms}
            </div>
            <span className="text-cap1-med text-gray-600">
              {data.livingConditions.contractExtendable
                ? "계약 연장 가능"
                : "계약 연장 불가능"}
            </span>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ContractInfo;
