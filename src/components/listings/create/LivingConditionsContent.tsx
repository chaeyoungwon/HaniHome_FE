import { useEffect, useState } from "react";

import CheckIcon from "@/components/common/CheckIcon";

interface LivingConditionsContentProps {
  options: string[];
  value?: Record<string, string>;
  onSelect: (value: Record<string, string>) => void;
}

const LivingConditionsContent = ({
  options,
  value,
  onSelect,
}: LivingConditionsContentProps) => {
  const firstLine = options.slice(0, 2);
  const secondLine = options.slice(2);
  const [isChecked, setIsChecked] = useState(false);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (value) {
      const newValue = { ...value };
      if (newValue["계약 형태"] && !newValue["계약 형태 설명"]) {
        newValue["계약 형태 설명"] = newValue["계약 형태"];
      }
      setInputValues(newValue);
    }
  }, [value]);

  const handleInputChange = (key: string, value: string) => {
    const newInputValues = { ...inputValues, [key]: value };
    setInputValues(newInputValues);

    const result: Record<string, string> = {};
    Object.entries(newInputValues).forEach(([k, v]) => {
      if (!v) return;
      result[k] = v;
    });

    onSelect(result);
  };

  return (
    <div className="max-w-[375px]">
      <div className="flex gap-2 px-4 py-2">
        {firstLine.map(option => (
          <div key={option} className="flex flex-1 flex-col gap-2">
            <div className="text-body1-sb text-gray-700">{option}</div>
            <div className="relative">
              <input
                type="text"
                value={inputValues[option] || ""}
                onChange={e => handleInputChange(option, e.target.value)}
                className={`text-body2-sb h-11 w-full rounded-[4px] border px-4 pr-10 placeholder:text-gray-500 focus:outline-none ${
                  inputValues[option]
                    ? "border-gray-600 text-gray-900"
                    : "border-gray-400 text-gray-500"
                }`}
                placeholder="입력해주세요"
              />
              <span
                className={`text-body2-sb absolute top-1/2 right-3 -translate-y-1/2 ${
                  inputValues[option] ? "text-gray-900" : "text-gray-500"
                }`}
              >
                주
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 px-4 pt-3 pb-5">
        {secondLine.map(option => (
          <div key={option} className="text-body1-sb text-gray-700">
            {option}
          </div>
        ))}
        <input
          value={inputValues["계약 형태 설명"] || ""}
          onChange={e => handleInputChange("계약 형태 설명", e.target.value)}
          placeholder="ex. 월 단위 계약"
          className={`text-body1-med h-11 rounded-[4px] border px-4 py-3 placeholder:text-gray-500 focus:outline-none ${
            inputValues["계약 형태 설명"]
              ? "border-gray-600 text-gray-900"
              : "border-gray-400 text-gray-500"
          }`}
        />
        <button
          onClick={() => setIsChecked(prev => !prev)}
          className="flex cursor-pointer items-center gap-1"
        >
          <CheckIcon checked={isChecked} />
          <div className="text-cap1-med flex items-center text-gray-700">
            계약 연장 가능
          </div>
        </button>
      </div>
    </div>
  );
};

export default LivingConditionsContent;
