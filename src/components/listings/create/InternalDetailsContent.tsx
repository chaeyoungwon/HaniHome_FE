import { useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import CheckIcon from "@/components/common/CheckIcon";

import ChangeIcon from "@/public/svgs/listings/change-icon.svg";
import QuestionIcon from "@/public/svgs/listings/question-mark-icon.svg";

interface InternalDetailsContentProps {
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
}

const InternalDetailsContent = ({
  value,
  onChange,
}: InternalDetailsContentProps) => {
  const { listingType } = useListingStore();
  const [isSquareMeter, setIsSquareMeter] = useState(false); // false = 평, true = ㎡
  const [withOwnerChecked, setWithOwnerChecked] = useState(false);
  const [hasYardChecked, setHasYardChecked] = useState(false);
  const [hasVerandaChecked, setHasVerandaChecked] = useState(false);

  const inputUnitText = isSquareMeter ? "평" : "㎡";
  const buttonUnitText = isSquareMeter ? "㎡" : "평";

  const areaLabels = ["Internal Area", "Total Area (선택)"];
  const otherLabels = [
    ...(listingType === "RENT"
      ? ["방 개수", "욕실 개수"]
      : ["총 거주인", "욕실 쉐어자 수"]),
    "건물 전체 층 (선택)",
    "해당 층 (선택)",
  ];

  // input 값 변경 시 호출되는 함수
  const handleInputChange = (key: string, val: string) => {
    onChange({
      ...value,
      [key]: val,
    });
  };

  return (
    <div className="max-w-[375px] py-3 px-4">
      <div className="flex flex-col gap-4 pb-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <div className="text-body1-sb text-gray-800">방 면적</div>
            <QuestionIcon className="text-gray-800" />
          </div>
          <button
            type="button"
            onClick={() => setIsSquareMeter(prev => !prev)}
            className="flex items-center gap-1"
          >
            <ChangeIcon className="text-mint" />
            <div className="text-lab1-sb text-mint">
              {inputUnitText} 단위로 입력
            </div>
          </button>
        </div>

        {/* 면적 입력 */}
        <div className="flex justify-between">
          {areaLabels.map(option => (
            <div
              key={option}
              className="flex h-[73px] flex-col justify-between"
            >
              <div className="text-body2-med text-gray-600">{option}</div>
              <div className="relative w-[167px]">
                <input
                  type="text"
                  className={`text-body1-med h-11 w-full rounded-[4px] border px-4 py-3 pr-12 focus:outline-none ${
                    value[option]
                      ? "border-gray-600 text-gray-900"
                      : "border-gray-400 text-gray-500"
                  }`}
                  placeholder="입력해주세요"
                  value={value[option] || ""}
                  onChange={e => handleInputChange(option, e.target.value)}
                />
                <span
                  className={`text-body1-med pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 ${
                    value[option] ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {buttonUnitText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 나머지 옵션 */}
      <div className="flex flex-col">
        {otherLabels
          .reduce<string[][]>((acc, curr, idx) => {
            if (idx % 2 === 0) acc.push([curr]);
            else acc[acc.length - 1].push(curr);
            return acc;
          }, [])
          .map((pair, rowIdx) => (
            <div key={rowIdx} className="flex justify-between py-5">
              {pair.map(option => (
                <div key={option} className="flex flex-col">
                  <div className="text-body1-sb mb-3 text-gray-800">
                    {option}
                  </div>

                  {[
                    "총 거주인",
                    "욕실 쉐어자 수",
                    "방 개수",
                    "욕실 개수",
                  ].includes(option) ? (
                    <div className="relative w-[167px]">
                      <input
                        type="text"
                        className={`text-body1-med h-11 w-full rounded-[4px] border px-4 py-3 pr-12 focus:outline-none ${
                          value[option]
                            ? "border-gray-600 text-gray-900"
                            : "border-gray-400 text-gray-500"
                        }`}
                        placeholder="입력해주세요"
                        value={value[option] || ""}
                        onChange={e =>
                          handleInputChange(option, e.target.value)
                        }
                      />
                      <span
                        className={`text-body1-med pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 ${
                          value[option] ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {["총 거주인", "욕실 쉐어자 수"].includes(option)
                          ? "명"
                          : "개"}
                      </span>
                    </div>
                  ) : ["건물 전체 층 (선택)", "해당 층 (선택)"].includes(
                      option,
                    ) ? (
                    <div className="relative w-[167px]">
                      <input
                        type="text"
                        className={`text-body1-med h-11 w-full rounded-[4px] border px-4 py-3 pr-12 focus:outline-none ${
                          value[option]
                            ? "border-gray-600 text-gray-900"
                            : "border-gray-400 text-gray-500"
                        }`}
                        placeholder="입력해주세요"
                        value={value[option] || ""}
                        onChange={e =>
                          handleInputChange(option, e.target.value)
                        }
                      />
                      <span
                        className={`text-body1-med pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 ${
                          value[option] ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        층
                      </span>
                    </div>
                  ) : null}

                  {option === "총 거주인" && (
                    <div
                      className="mt-2 flex cursor-pointer items-center gap-1 select-none"
                      onClick={() => {
                        setWithOwnerChecked(prev => !prev);
                      }}
                    >
                      <CheckIcon checked={withOwnerChecked} />
                      <div className="text-cap1-med text-gray-700">
                        집주인과 함께 거주
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
      </div>
      {listingType === "RENT" && (
        <div className="flex flex-col gap-3 pt-3">
          <div
            className="flex cursor-pointer items-center gap-1 select-none"
            onClick={() => setHasYardChecked(prev => !prev)}
          >
            <CheckIcon checked={hasYardChecked} />
            <div className="text-cap1-med text-gray-700">마당 포함</div>
          </div>
          <div
            className="flex cursor-pointer items-center gap-1 select-none"
            onClick={() => setHasVerandaChecked(prev => !prev)}
          >
            <CheckIcon checked={hasVerandaChecked} />
            <div className="text-cap1-med text-gray-700">베란다 포함</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternalDetailsContent;
