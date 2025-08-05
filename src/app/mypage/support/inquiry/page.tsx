"use client";

import { useState } from "react";

import { postOneOnOneConsult } from "@/apis/supportApi";

import BottomActionBar from "@/components/common/BottomActionBar";
import CompleteModal from "@/components/common/CompleteModal";
import InputField from "@/components/common/InputField";
import TextareaField from "@/components/common/TextareaField";
import BackHeader from "@/components/layout/header/BackHeader";

const InquiryPage = () => {
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 이메일 정규식 검증
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValid = content.trim().length > 0 && isEmailValid;

  const handleSubmit = async () => {
    try {
      await postOneOnOneConsult({ content, email });

      setIsModalOpen(true);
    } catch (e) {
      console.error("문의 등록 실패", e);
      alert("문의 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <BackHeader />

      <div className="my-1">
        <TextareaField
          title="1:1 문의 내용"
          value={content}
          onChange={setContent}
          placeholder="문의하실 내용을 자유롭게 작성해주세요 (10자 이상)"
          maxLength={200}
        />
      </div>

      <div className="flex flex-col gap-4 p-4">
        <InputField
          label="답변 받을 이메일 주소 (필수)"
          value={email}
          placeholder="이메일을 입력해주세요"
          containerClassName="gap-4"
          labelClassName="text-heading3"
          onChange={e => setEmail(e.target.value)}
          errorMessage={
            !isEmailValid && email.length > 0
              ? "유효한 이메일을 입력해주세요."
              : undefined
          }
        />
      </div>

      <BottomActionBar
        onClick={handleSubmit}
        label="작성 완료"
        disabled={!isValid}
      />

      {isModalOpen && (
        <CompleteModal
          onClose={() => setIsModalOpen(false)}
          description={[
            "문의가 완료되었어요.",
            "영업일 기준 3일 내에 답변 메일이 발송돼요.",
          ]}
        />
      )}
    </div>
  );
};

export default InquiryPage;
