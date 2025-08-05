import CheckIcon from "@/components/common/CheckIcon";

import { LivingConditions } from "@/types/listingDetailPost.type";

interface LivingConditionsContentProps {
  value?: LivingConditions | null;
  onSelect: (value: LivingConditions) => void;
}

const LivingConditionsContent = ({
  value,
  onSelect,
}: LivingConditionsContentProps) => {
  const firstLineKeys = ["noticePeriodWeeks", "minimumStayWeeks"] as const;
  const secondLineKeys = ["contractTerms"] as const;

  const LABELS: Record<keyof LivingConditions, string> = {
    noticePeriodWeeks: "노티스",
    minimumStayWeeks: "최소 거주 기간",
    contractTerms: "계약 형태 설명",
    contractExtendable: "계약 연장 가능",
  };

  const handleChange = (
    key: keyof LivingConditions,
    newValue: string | boolean,
  ) => {
    onSelect({
      ...value,
      [key]: newValue,
    } as LivingConditions);
  };

  return (
    <div className="max-w-[375px]">
      <div className="flex gap-2 px-4 py-2">
        {firstLineKeys.map(option => (
          <div key={option} className="flex flex-1 flex-col gap-2">
            <div className="text-body1-sb text-gray-700">{LABELS[option]}</div>
            <div className="relative">
              <input
                type="text"
                value={value?.[option] || ""}
                onChange={e => handleChange(option, e.target.value)}
                className={`text-body2-sb h-11 w-full rounded-[4px] border px-4 pr-10 placeholder:text-gray-500 focus:outline-none ${
                  value?.[option]
                    ? "border-gray-600 text-gray-900"
                    : "border-gray-400 text-gray-500"
                }`}
                placeholder="입력해주세요"
              />
              <span
                className={`text-body2-sb absolute top-1/2 right-3 -translate-y-1/2 ${
                  value?.[option] ? "text-gray-900" : "text-gray-500"
                }`}
              >
                주
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 px-4 pt-3 pb-5">
        {secondLineKeys.map(option => (
          <div key={option} className="text-body1-sb text-gray-700">
            {LABELS[option]}
          </div>
        ))}
        <input
          value={value?.contractTerms || ""}
          onChange={e => handleChange("contractTerms", e.target.value)}
          placeholder="ex. 월 단위 계약"
          className={`text-body1-med h-11 rounded-[4px] border px-4 py-3 placeholder:text-gray-500 focus:outline-none ${
            value?.contractTerms
              ? "border-gray-600 text-gray-900"
              : "border-gray-400 text-gray-500"
          }`}
        />
        <button
          onClick={() =>
            handleChange("contractExtendable", !value?.contractExtendable)
          }
          className="flex cursor-pointer items-center gap-1"
        >
          <CheckIcon checked={!!value?.contractExtendable} />
          <div className="text-cap1-med flex items-center text-gray-700">
            계약 연장 가능
          </div>
        </button>
      </div>
    </div>
  );
};

export default LivingConditionsContent;
