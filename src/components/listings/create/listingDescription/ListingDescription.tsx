import { useRef, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import BottomActionBar from "@/components/common/BottomActionBar";
import TextareaField from "@/components/common/TextareaField";
import BackHeader from "@/components/layout/header/BackHeader";

interface ListingDescriptionProps {
  onNext: () => void;
  onPrev: () => void;
}
const ListingDescription = ({ onNext }: ListingDescriptionProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { description, setDescription } = useListingStore();
  const [text, setText] = useState(description || "");

  const handleResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleChange = (value: string) => {
    if (value.length <= 300) {
      setText(value);
      setDescription(value);
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
      <TextareaField
        onChange={handleChange}
        value={text}
        maxLength={300}
        placeholder="주변 인프라, 편리한 교통, 깔끔한 집 등 다양하게 매물을 홍보해요"
        gap="gap-2"
      />
      <BottomActionBar
        buttons={[
          {
            label: "저장",
            onClick: () => {
              setDescription(text);
              console.log("저장");
            },
            variant: "outline",
          },
          {
            label: "다음",
            onClick: () => {
              setDescription(text);
              onNext();
            },
            variant: "filled",
            disabled: !text,
          },
        ]}
      />
    </>
  );
};
export default ListingDescription;
