import { useState } from "react";

import clsx from "clsx";

import CheckIcon from "@/components/common/CheckIcon";
import Divider from "@/components/common/Divider";
import SelectableChip from "@/components/common/SelectableChip";

import { CATEGORY_OPTIONS } from "@/constants/property-category";

import { CostDetails } from "@/types/listingDetailPost";

interface CostDetailFieldProps {
  value: CostDetails;
  optionItemIds: number[];
  onCostDetailsChange: (details: CostDetails) => void;
  onOptionItemIdsChange: (ids: number[]) => void;
}

const CostDetailField = ({
  value,
  optionItemIds,
  onCostDetailsChange,
  onOptionItemIdsChange,
}: CostDetailFieldProps) => {
  const [customIncludedItemText, setCustomIncludedItemText] = useState("");
  const handleInputChange = <K extends keyof typeof value>(
    field: K,
    newValue: (typeof value)[K],
  ) => {
    const updated = { ...value, [field]: newValue };
    onCostDetailsChange(updated);
  };

  const handleBillIncluded = () => {
    const updated = {
      ...value,
      billIncluded: !value.billIncluded,
    };
    onCostDetailsChange(updated);
  };

  const handleDepositAdjustable = () => {
    const updated = {
      ...value,
      depositAdjustable: !value.depositAdjustable,
    };
    onCostDetailsChange(updated);
  };

  const handleIncludedItemClick = (id: number) => {
    const newIds = optionItemIds.includes(id)
      ? optionItemIds.filter(i => i !== id)
      : [...optionItemIds, id];
    onOptionItemIdsChange(newIds);
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-3">
      {/* 주간 비용 입력 + 빌 포함 체크 */}
      <div className="flex flex-col gap-2">
        <div className="relative">
          <input
            type="text"
            placeholder="입력해주세요"
            className={`placeholder:text-body2-med h-9 w-[343px] rounded-[4px] border border-gray-400 px-4 py-3 placeholder:text-gray-500 focus:outline-none ${value.weeklyCost ? "border-gray-600 text-gray-900" : "border-gray-400"}`}
            value={value.weeklyCost === 0 ? "" : value.weeklyCost}
            onChange={e => handleInputChange("weeklyCost", +e.target.value)}
          />
          <span
            className={`text-body2-med pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 ${value.weeklyCost ? "text-gray-900" : "text-gray-500"}`}
          >
            주/$
          </span>
        </div>

        <button
          onClick={handleBillIncluded}
          className="flex cursor-pointer gap-1 select-none"
        >
          <CheckIcon checked={value.billIncluded} />

          <div className="text-cap1-med text-gray-700">빌 포함</div>
        </button>
      </div>

      <Divider className="my-[2px]" />

      {/* 빌에 포함된 항목 */}
      <div className="flex flex-col gap-4">
        <div className="text-body1-sb text-gray-800">빌에 포함된 항목</div>

        <div className="flex w-[343px] flex-wrap content-center items-center gap-2 self-stretch">
          {CATEGORY_OPTIONS[4].items.map(({ optionId, label }) => {
            const isSelected = optionItemIds.includes(optionId);
            return (
              <SelectableChip
                key={label}
                label={label}
                selected={isSelected}
                onClick={() => handleIncludedItemClick(optionId)}
              />
            );
          })}
        </div>

        {optionItemIds.includes(53) && (
          <input
            type="text"
            value={customIncludedItemText}
            onChange={e => setCustomIncludedItemText(e.target.value)}
            placeholder="항목을 입력해주세요"
            className={clsx(
              "text-body2-med h-9 w-[343px] rounded-[4px] border px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none",
              customIncludedItemText ? "border-gray-600" : "border-gray-400",
            )}
          />
        )}
      </div>

      <Divider className="my-[2px]" />

      {/* 빌설명 */}
      <div className="flex flex-col gap-3">
        <div className="text-body1-sb text-gray-800">빌 설명</div>
        <input
          type="text"
          placeholder="ex) 주차비는 주/$20 입니다"
          className={`text-body2-med h-9 w-[343px] rounded-[4px] border px-4 py-3 placeholder:text-gray-500 focus:outline-none ${value.costDescription ? "border-gray-600 text-gray-900" : "border-gray-400"}`}
          value={value.costDescription}
          onChange={e => handleInputChange("costDescription", e.target.value)}
        />
      </div>

      <Divider className="my-[2px]" />

      <div className="flex gap-2">
        {/*디파짓 */}
        <div className="flex flex-col gap-2">
          <div className="text-body1-sb text-gray-800">디파짓</div>
          <div className="relative w-[167px]">
            <input
              type="text"
              placeholder="입력해주세요"
              className={`placeholder:text-body2-med h-9 w-full rounded-[4px] border px-4 py-3 pr-12 placeholder:text-gray-500 focus:outline-none ${value.deposit ? "border-gray-600 text-gray-900" : "border-gray-400"}`}
              value={value.deposit === 0 ? "" : value.deposit}
              onChange={e => handleInputChange("deposit", +e.target.value)}
            />
            <span
              className={`text-body2-med pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 ${value.deposit ? "text-gray-900" : "text-gray-500"}`}
            >
              $
            </span>
          </div>

          <button
            onClick={handleDepositAdjustable}
            className="flex cursor-pointer items-center gap-1"
          >
            <CheckIcon checked={value.depositAdjustable} />
            <div className="text-cap1-med text-gray-700">디파짓 조정 가능</div>
          </button>
        </div>
        {/* key디파짓 */}
        <div className="flex flex-col gap-2">
          <div className="text-body1-sb text-gray-800">Key 디파짓 (선택)</div>
          <div className="relative w-[167px]">
            <input
              type="text"
              placeholder="입력해주세요"
              className={`placeholder:text-body2-med h-9 w-full rounded-[4px] border px-4 py-3 pr-12 placeholder:text-gray-500 focus:outline-none ${value.keyDeposit ? "border-gray-600 text-gray-900" : "border-gray-400"}`}
              value={value.keyDeposit === 0 ? "" : value.keyDeposit}
              onChange={e => handleInputChange("keyDeposit", +e.target.value)}
            />
            <span
              className={`text-body2-med pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 ${value.keyDeposit ? "text-gray-900" : "text-gray-500"}`}
            >
              $
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostDetailField;
