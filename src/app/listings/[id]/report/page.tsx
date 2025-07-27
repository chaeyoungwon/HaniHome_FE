"use client";

import { useParams } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import { postReport } from "@/apis/property";
import { getReportPresignedUrls } from "@/apis/s3Upload";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import CheckIcon from "@/components/common/CheckIcon";
import Divider from "@/components/common/Divider";
import ImagePreviewSection from "@/components/common/ImagePreviewSection";
import LoadingLottie from "@/components/common/LoadingLottie";
import TextareaField from "@/components/common/TextareaField";
import ContentWrapper from "@/components/layout/ContentWrapper";
import BackHeader from "@/components/layout/header/BackHeader";

const MAX_IMAGES = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const ListingReportPage = () => {
  const params = useParams();
  const propertyId = Number(params.id);

  const [content, setContent] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => ALLOWED_TYPES.includes(file.type));

    if (validFiles.length < files.length) {
      setAlertMessage("JPG, PNG 파일만 업로드할 수 있어요");
      return;
    }

    const totalCount = newImagePreviews.length + validFiles.length;

    if (totalCount > MAX_IMAGES) {
      setAlertMessage(
        `이미지는 최대 ${MAX_IMAGES}장까지 업로드할 수 있습니다.`,
      );
      return;
    }

    const previews = validFiles.map(file => URL.createObjectURL(file));

    setNewImagePreviews(prev => [...prev, ...previews]);
    setNewFiles(prev => [...prev, ...validFiles]);
    setAlertMessage(""); // 에러 메시지 초기화
  };

  const isFormValid =
    isChecked && newImagePreviews.length > 0 && content.trim().length > 0;

  useEffect(() => {
    return () => {
      newImagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [newImagePreviews]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const extensions = newFiles.map(
        file => file.name.split(".").pop() || "png",
      );
      const presignedUrls = await getReportPresignedUrls(
        "PROPERTY",
        extensions,
      );
      await Promise.all(
        presignedUrls.map((item, idx) =>
          fetch(item.presignedUrl, {
            method: "PUT",
            headers: {
              "Content-Type": newFiles[idx].type,
            },
            body: newFiles[idx],
          }),
        ),
      );
      await postReport({
        targetId: propertyId,
        targetType: "PROPERTY",
        documentImageUrls: presignedUrls.map(item => item.fileUrl),
        description: content,
      });

      setContent("");
      setIsChecked(false);
      setNewImagePreviews([]);
      setNewFiles([]);
    } catch (err) {
      console.error("신고 실패", err);
    } finally {
      setIsLoading(false);
    }
  };

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
        existingImages={[]}
        setExistingImages={() => {}}
        newImagePreviews={newImagePreviews}
        setNewImagePreviews={setNewImagePreviews}
        setNewFiles={setNewFiles}
        wrapperClassName="my-2"
      />

      {newImagePreviews.length > 0 && (
        <span className="text-cap1-med flex px-4 text-gray-600">
          이미지는 최대 5장까지 업로드할 수 있습니다.
        </span>
      )}

      <BottomActionBar
        label="신고하기"
        disabled={!isFormValid}
        onClick={handleSubmit}
      />
      {isLoading && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/80 backdrop-blur-[2px]">
          <LoadingLottie />
        </div>
      )}

      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          className="bottom-[76px]"
          onDone={() => setAlertMessage(null)}
        />
      )}
    </ContentWrapper>
  );
};

export default ListingReportPage;
