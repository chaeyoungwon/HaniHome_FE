import { useCallback, useEffect, useRef, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import { uploadMultipleImages } from "@/utils/images/uploadMultipleImages";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import Divider from "@/components/common/Divider";
import ImageSlider from "@/components/listings/detailShow/ImageSlider";
import ImageAlertModal from "@/components/signup/profile/ImageAlertModal";

import QuestionMarkIcon from "@/public/svgs/listings/question-mark-icon.svg";

import BottomSheet from "./BottomSheet";

interface PhotoFieldProps {
  onNext: () => void;
  onPrev: () => void;
}

const MAX_IMAGE_COUNT = 10;

const PhotoField = ({ onNext }: PhotoFieldProps) => {
  const { photoUrls, setPhotoUrls } = useListingStore();
  const [previewUrls, setPreviewUrls] = useState<string[]>(photoUrls);

  const [isOpen, setIsOpen] = useState(false);
  const [, setUploadedFiles] = useState<File[]>([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemoveImage = useCallback((index: number) => {
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      const totalCount = previewUrls.length + files.length;

      if (totalCount > MAX_IMAGE_COUNT) {
        setAlertMessage(
          `이미지는 최대 ${MAX_IMAGE_COUNT}장까지 업로드할 수 있어요.`,
        );
        e.target.value = "";
        return;
      }

      try {
        await uploadMultipleImages({
          files,
          setPreviewUrls,
          setUploadedFiles,
          setField: (_key, value) => setUploadedFiles(value),
          fieldName: "unused",
          setShowErrorModal,
          maxFiles: MAX_IMAGE_COUNT,
        });
      } catch (error) {
        console.error("이미지 업로드 중 에러 발생:", error);
        setShowErrorModal(true);
      }

      e.target.value = "";
    },
    [previewUrls, setPhotoUrls, setUploadedFiles],
  );

  useEffect(() => {
    if (photoUrls.length > 0) {
      setPreviewUrls(photoUrls);
    }
  }, []);

  useEffect(() => {
    if (previewUrls.length > 0) {
      setPhotoUrls(previewUrls);
    }
  }, [previewUrls]);

  return (
    <div className="max-w-[375px]">
      <div className="flex flex-col gap-2">
        <div className="text-heading3 p-4 text-gray-900">
          직접 촬영한 매물 사진을 올려주세요
        </div>
        <div className="flex flex-col gap-9 px-4 py-3">
          <div className="flex justify-between">
            <div className="flex flex-col justify-center">
              <div className="text-body1-sb text-gray-700">
                매물 사진 (3장 이상)
              </div>
              <div className="text-body2-med text-gray-600">
                최대 {MAX_IMAGE_COUNT}장까지 올릴 수 있어요
              </div>
            </div>
            <div
              className="flex cursor-pointer justify-between gap-2 rounded-[4px] border border-gray-300 px-2 py-[6px]"
              onClick={() => setIsOpen(true)}
            >
              <QuestionMarkIcon className="text-gray-600" />
              <div className="text-cap1-med flex justify-center text-gray-600">
                매물 사진 <br />
                업로드 가이드
              </div>
            </div>
          </div>
          <div
            className="bg-mint-light text-mint text-lab1-sb flex h-9 w-full max-w-[343px] cursor-pointer items-center justify-center rounded-[4px] border"
            onClick={handleClickUpload}
          >
            + 매물 사진 올리기
          </div>
        </div>
      </div>
      <Divider className="my-1" />
      <input
        type="file"
        multiple
        accept="image/png, image/jpeg"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div className="px-4">
        {previewUrls.length > 0 && (
          <ImageSlider
            images={previewUrls}
            onRemove={handleRemoveImage}
            className="py-6"
          />
        )}
      </div>

      {isOpen && <BottomSheet onClose={() => setIsOpen(false)} />}

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
            disabled: previewUrls.length < 3,
          },
        ]}
      />

      {showErrorModal && (
        <ImageAlertModal onClose={() => setShowErrorModal(false)} />
      )}

      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          className="bottom-17"
          onDone={() => setAlertMessage(null)}
        />
      )}
    </div>
  );
};

export default PhotoField;
