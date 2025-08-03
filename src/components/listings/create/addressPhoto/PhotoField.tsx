import { useParams, useRouter } from "next/navigation";

import { useCallback, useEffect, useRef, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import { getPropertyPresignedUrl } from "@/apis/s3Upload";

import useMultipleImageUpload from "@/hooks/common/useMultipleImageUpload";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import Divider from "@/components/common/Divider";
import ImageSlider from "@/components/listings/detailShow/ImageSlider";
import ImageAlertModal from "@/components/signup/profile/ImageAlertModal";

import QuestionMarkIcon from "@/public/svgs/listings/question-mark-icon.svg";

import BottomSheet from "./BottomSheet";

const MAX_IMAGE_COUNT = 10;

interface PhotoFieldProps {
  onNext?: () => void;
  onPrev?: () => void;
  edit?: boolean;
}

const PhotoField = ({ onNext, edit = false }: PhotoFieldProps) => {
  const router = useRouter();
  const { id } = useParams();

  const { photoUrls, setPhotoUrls } = useListingStore();
  const [previewUrls, setPreviewUrls] = useState<string[]>(photoUrls); // 이미지 URL 미리보기
  const [, setUploadedFiles] = useState<File[]>([]); // 실제 파일 객체

  const [isOpen, setIsOpen] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [, setAlertMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleFileChange, alertMessage: uploadAlertMessage } =
    useMultipleImageUpload({
      maxImageCount: MAX_IMAGE_COUNT,
      setPreviewUrls,
      setUploadedFiles, // File 객체 저장
      getPresignedUrls: getPropertyPresignedUrl,
      setShowErrorModal,
    });

  const handleClickUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemoveImage = useCallback((index: number) => {
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setUploadedFiles(prev => prev.filter((_, i) => i !== index)); // 실제 파일 객체도 삭제
  }, []);

  useEffect(() => {
    if (photoUrls.length > 0) {
      setPreviewUrls(photoUrls);
    }
  }, [photoUrls]);

  useEffect(() => {
    if (previewUrls.length > 0) {
      setPhotoUrls(previewUrls); // 이미지 URL을 업데이트
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
        onChange={e => handleFileChange(e, previewUrls)}
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
      {!edit ? (
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
              onClick: () => {
                if (onNext) onNext();
              },
              variant: "filled",
              disabled: previewUrls.length < 3,
            },
          ]}
        />
      ) : (
        <BottomActionBar
          label="저장"
          onClick={() => router.push(`/listings/${id}/edit`)}
        />
      )}

      {showErrorModal && (
        <ImageAlertModal onClose={() => setShowErrorModal(false)} />
      )}

      {uploadAlertMessage && (
        <AlertMessage
          message={uploadAlertMessage}
          className="bottom-17"
          onDone={() => setAlertMessage(null)}
        />
      )}
    </div>
  );
};

export default PhotoField;
