"use client";

import { useEffect, useRef, useState } from "react";

import BottomActionBar from "@/components/common/BottomActionBar";
import CheckIcon from "@/components/common/CheckIcon";
import Divider from "@/components/common/Divider";
import ImagePreviewSection from "@/components/common/ImagePreviewSection";
import TextareaField from "@/components/common/TextareaField";
import ContentWrapper from "@/components/layout/ContentWrapper";
import BackHeader from "@/components/layout/header/BackHeader";

const ListingReportPage = () => {
  const [content, setContent] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => fileInputRef.current?.click();

  const isSupportedImage = (file: File) => {
    const supportedTypes = ["image/jpeg", "image/png"];
    return supportedTypes.includes(file.type);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith("image/");
      const isSupported = isSupportedImage(file);
      return isImage && isSupported;
    });
    if (validFiles.length < files.length) {
      alert("지원되지 않는 이미지 형식이 포함되어 있습니다.");
    }
    const urls = validFiles.map(file => URL.createObjectURL(file));
    setImageUrls(prev => [...prev, ...urls]);
  };

  const isFormValid =
    isChecked && imageUrls.length > 0 && content.trim().length > 0;

  useEffect(() => {
    return () => {
      imageUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <ContentWrapper bottomOffset={64}>
      <BackHeader />

      <TextareaField
        title="매물 신고 내용 (필수)"
        placeholder="상세한 설명을 입력해주세요"
        maxLength={500}
        value={content}
        onChange={setContent}
      />

      <Divider className="my-4" />

      <div className="flex w-full flex-col gap-2 p-4">
        <span className="text-heading3 text-gray-800">증명자료 (필수)</span>
        <p className="text-cap1-med max-w-[343px] break-words text-gray-600">
          문제가 실제로 발생했음을 보여주는 스크린샷이나 허위 정보와 관련된 증빙
          자료를 첨부해주세요. 첨부된 자료는 운영팀 검토용으로만 사용되며 외부에
          공개되지 않습니다.
        </p>
      </div>

      <div className="flex flex-col gap-2 px-4 py-3">
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={handleUploadClick}
          className="text-lab1-sb cursor-pointer rounded border border-gray-600 bg-white py-2 text-gray-800"
        >
          + 사진 업로드
        </button>

        <div
          className="flex cursor-pointer items-center gap-2 py-3"
          onClick={() => setIsChecked(prev => !prev)}
        >
          <CheckIcon checked={isChecked} />
          <p className="text-cap1-med max-w-[317px] break-words text-gray-600">
            허위 신고 시 서비스 이용이 제한될 수 있음에 동의합니다. 신고 내용을
            다시 한번 확인했습니다.
          </p>
        </div>
      </div>

      <ImagePreviewSection
        size="sm"
        images={imageUrls}
        setImages={setImageUrls}
      />

      <BottomActionBar label="신고하기" disabled={!isFormValid} />
    </ContentWrapper>
  );
};

export default ListingReportPage;
