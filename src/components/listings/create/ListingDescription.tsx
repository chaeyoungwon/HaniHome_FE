import { useRef, useState } from "react";

import BackHeader from "@/components/layout/header/BackHeader";
import BottomActionBar from "@/components/common/BottomActionBar";

interface ListingDescriptionProps {
  onNext: () => void;
  onPrev: () => void;
}
const ListingDescription = ({ onNext }: ListingDescriptionProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");

  const handleResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 300) {
      setText(value);
      handleResize();
    }
  };

  return (
    <>
      <BackHeader rightIcon="close" />
      <div className="flex flex-col gap-2 px-4 py-3">
        <div className="text-heading2 text-gray-900">
          마지막이에요! <br />
          매물에 대한 소개를 적어주세요
        </div>
        <div className="text-cap1-med text-gray-700">
          자세하게 적을수록 조회수가 높아져요
        </div>
      </div>
      <div className="flex flex-col gap-2 px-4 py-3">
        <div className="bg-gray-0 flex items-center rounded-[4px] p-3">
          <textarea
            ref={textareaRef}
            rows={2}
            value={text}
            onChange={handleChange}
            className={`text-body1-med w-[319px] resize-none overflow-hidden bg-transparent leading-[22px] text-gray-400 focus:outline-none ${text ? "text-gray-700" : "text-gray-400"}`}
            placeholder={`주변 인프라, 편리한 교통, 깔끔한 집 등 다양하게\n매물을 홍보해요`}
          />
        </div>

        <div className="text-cap1-med flex justify-end text-gray-400">
          {text.length} / 300
        </div>
      </div>
      <BottomActionBar
        buttons={[
          {
            label: "저장",
            onClick: () => {
              //Todo: 저장 로직 추가
              console.log("저장");
            },
            variant: "outline",
          },
          {
            label: "다음",
            onClick: onNext,
            variant: "filled",
            disabled: !text,
          },
        ]}
      />
    </>
  );
};
export default ListingDescription;
