import { useState } from "react";

import Slider from "rc-slider";

import CheckIcon from "@/components/common/CheckIcon";

const MIN_BUDGET = 100;
const MAX_BUDGET = 3000;
const MIN_GAP = 50;

const BudgetSlider = () => {
  const [budgetRange, setBudgetRange] = useState<[number, number]>([
    MIN_BUDGET,
    MAX_BUDGET,
  ]);
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col items-center py-4">
      <div className="flex w-full items-center justify-between px-4 py-3">
        <span className="text-heading3 text-gray-900">예산 범위</span>
        <div className="text-heading3 text-mint flex items-center gap-2">
          <span className="text-gray-500">주/$</span>
          <span>{budgetRange[0]}</span>
          <span>–</span>
          <span>{budgetRange[1]}</span>
        </div>
      </div>

      <div className="relative flex w-full flex-col justify-center gap-2 px-4 py-1">
        <div className="absolute top-4 left-4 z-0 h-1 w-[343px] rounded-full bg-gray-100" />

        <div className="w-[327px] self-center pt-[6px] pb-7">
          <Slider
            range
            className="custom-slider my-[1px]"
            value={budgetRange}
            min={MIN_BUDGET}
            max={MAX_BUDGET}
            step={50}
            onChange={value => {
              const [start, end] = value as [number, number];
              const distance = Math.abs(end - start);
              if (distance < MIN_GAP) return;
              setBudgetRange([start, end]);
            }}
            marks={{
              [MIN_BUDGET]: {
                label: (
                  <span className="text-cap1-med ml-3.5 text-gray-400">
                    {MIN_BUDGET}$
                  </span>
                ),
              },
              [MAX_BUDGET]: {
                label: (
                  <span className="text-cap1-med mr-6.5 text-gray-400">
                    {MAX_BUDGET}$
                  </span>
                ),
              },
            }}
          />
        </div>

        <div
          className="flex cursor-pointer items-center justify-end gap-1"
          onClick={() => setChecked(prev => !prev)}
        >
          <CheckIcon checked={checked} />
          <span className="text-cap1-med text-gray-700">빌 포함</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetSlider;
