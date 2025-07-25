import { useState } from "react";

import CheckIcon from "@/components/common/CheckIcon";
import Divider from "@/components/common/Divider";

import { CostDetailsOptions } from "@/types/createPropertyAnswer";

interface CostDetailFieldProps {
  options: CostDetailsOptions;
  onChange: <K extends keyof CostDetailsOptions>(
    field: K,
    value: CostDetailsOptions[K]["value"],
  ) => void;
}

const CostDetailField = ({ options, onChange }: CostDetailFieldProps) => {
  const [isBillIncluded, setIsBillIncluded] = useState(false);
  const [includedValues, setIncludedValues] = useState<string[]>([]); // 개별 상태
  const [depositNegotiable, setDepositNegotiable] = useState(false);

  const handleBillIncluded = () => {
    setIsBillIncluded(prev => !prev);
  };
  const handleDepositNegotiable = () => {
    setDepositNegotiable(prev => !prev);
  };

  const handleClick = (option: string) => {
    const newValues = includedValues.includes(option)
      ? includedValues.filter(o => o !== option)
      : [...includedValues, option];
    setIncludedValues(newValues);
    onChange?.("includedItems", newValues); // 상위로도 전달
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-3">
      {/* 주간 비용 입력 + 빌 포함 체크 */}
      <div className="flex flex-col gap-2">
        <div className="relative">
          <input
            type="text"
            placeholder="입력해주세요"
            className="placeholder:text-body2-med h-9 w-[343px] rounded-[4px] border border-gray-400 px-4 py-3 placeholder:text-gray-500 focus:outline-none"
          />
          <span className="text-body2-med pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-500">
            주/$
          </span>
        </div>
        <div onClick={handleBillIncluded} className="flex gap-1">
          <CheckIcon checked={isBillIncluded} />
          <div className="text-cap1-med text-gray-700">빌 포함</div>
        </div>
      </div>

      <Divider className="my-[2px]" />

      {/* 빌에 포함된 항목 */}
      <div className="flex flex-col gap-4">
        <div className="text-body1-sb text-gray-800">
          {options.includedItems.label}
        </div>
        <div className="flex w-[343px] flex-wrap content-center items-center gap-2 self-stretch">
          {options.includedItems.value.map(item => {
            const isSelected = includedValues.includes(item);
            return (
              <button
                key={item}
                type="button"
                className={`text-lab1-sb cursor-pointer rounded-[100px] border px-2 py-1 ${
                  isSelected
                    ? "bg-mint-press border-transparent text-white"
                    : "border-gray-500 text-gray-600"
                }`}
                onClick={() => handleClick(item)}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <Divider className="my-[2px]" />

      {/* 빌설명 */}
      <div className="flex flex-col gap-3">
        <div className="text-body1-sb text-gray-800">
          {options.billDescription.label}
        </div>
        <input
          type="text"
          placeholder="ex) 주차비는 주/$20 입니다"
          className="placeholder:text-body2-med h-9 w-[343px] rounded-[4px] border border-gray-400 px-4 py-3 placeholder:text-gray-500"
        />
      </div>

      <Divider className="my-[2px]" />

      <div className="flex gap-2">
        {/*디파짓 */}
        <div className="flex flex-col gap-2">
          <div className="text-body1-sb text-gray-800">
            {options.deposit.label}
          </div>
          <div className="relative w-[167px]">
            <input
              type="text"
              placeholder="입력해주세요"
              className="placeholder:text-body2-med h-9 w-full rounded-[4px] border border-gray-400 px-4 py-3 pr-12 placeholder:text-gray-500 focus:outline-none"
            />
            <span className="text-body2-med pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
              $
            </span>
          </div>
          <div onClick={handleDepositNegotiable} className="flex gap-1">
            <CheckIcon checked={depositNegotiable} />
            <div className="text-cap1-med text-gray-700">디파짓 조정 가능</div>
          </div>
        </div>
        {/**key디파짓 */}
        <div className="flex flex-col gap-2">
          <div className="text-body1-sb text-gray-800">
            {options.keyDeposit.label}
          </div>
          <div className="relative w-[167px]">
            <input
              type="text"
              placeholder="입력해주세요"
              className="placeholder:text-body2-med h-9 w-full rounded-[4px] border border-gray-400 px-4 py-3 pr-12 placeholder:text-gray-500 focus:outline-none"
            />
            <span className="text-body2-med pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
              $
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostDetailField;
