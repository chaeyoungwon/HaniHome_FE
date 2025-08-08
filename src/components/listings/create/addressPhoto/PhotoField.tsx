import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useCallback, useEffect, useRef, useState } from "react";

import { useListingStore } from "@/stores/useListingStore";

import {
  fetchTemporaryPropertyData,
  postTemporaryPropertyData,
} from "@/apis/propertyApi";
import { getPropertyPresignedUrl } from "@/apis/s3UploadApi";

import useMultipleImageUpload from "@/hooks/common/useMultipleImageUpload";
import { createPayloadByStep } from "@/hooks/property/createPayloadBySteps";
import {
  usePatchProperty,
  usePropertyDetailEditList,
} from "@/hooks/property/usePropertyApi";

import toPostPropertyDetail from "@/utils/listing//toPostPropertyDetail";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import Divider from "@/components/common/Divider";
import ImageSlider from "@/components/listings/detailShow/ImageSlider";
import ImageAlertModal from "@/components/signup/profile/ImageAlertModal";

import { TemporaryPropertyPost } from "@/types/temporaryProperty.type";

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
  const { data } = usePropertyDetailEditList(id as string);
  const searchParams = useSearchParams();
  const draftId = searchParams.get("draftId");

  const store = useListingStore();
  const { photoUrls, setPhotoUrls } = store;

  const [previewUrls, setPreviewUrls] = useState<string[]>(photoUrls); // 이미지 URL 미리보기
  const [, setUploadedFiles] = useState<File[]>([]); // 실제 파일 객체

  const [isOpen, setIsOpen] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [, setAlertMessage] = useState<string | null>(null);

  const [draftData, setDraftData] = useState<TemporaryPropertyPost | null>(
    null,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleFileChange, alertMessage: uploadAlertMessage } =
    useMultipleImageUpload({
      maxImageCount: MAX_IMAGE_COUNT,
      setPreviewUrls,
      setUploadedFiles, // File 객체 저장
      getPresignedUrls: getPropertyPresignedUrl,
      setShowErrorModal,
      onUploadedUrls: setPhotoUrls,
    });

  const handleClickUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemoveImage = useCallback((index: number) => {
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  //수정
  useEffect(() => {
    if (edit && data) {
      const parsed = toPostPropertyDetail(data);
      if (Array.isArray(parsed.photoUrls)) {
        setPhotoUrls(parsed.photoUrls);
      }
    }
  }, [edit, data, setPhotoUrls]);

  useEffect(() => {
    if (photoUrls.length > 0) {
      setPreviewUrls(photoUrls);
    }
  }, [photoUrls]);

  //임시저장
  useEffect(() => {
    const initDraft = async () => {
      if (!draftId || edit) return; // edit 모드에서는 무시

      try {
        const draftData = await fetchTemporaryPropertyData(Number(draftId));
        setDraftData(draftData);
        if (Array.isArray(draftData.photoUrls)) {
          setPhotoUrls(draftData.photoUrls); // Zustand store에 저장
          setPreviewUrls(draftData.photoUrls); // 미리보기에도 반영
        }
      } catch (error) {
        console.error("임시 저장 데이터 가져오기 실패", error);
      }
    };

    initDraft();
  }, [draftId, edit]);

  const handleTemporarySave = async () => {
    const payload = createPayloadByStep("ADDRESS_PHOTO", store, draftData);

    try {
      await postTemporaryPropertyData(payload);
    } catch (e) {
      console.error("임시 저장 실패:", e);
    }
  };

  const { mutate: patchProperty } = usePatchProperty(Number(id));

  const handleSave = () => {
    if (!data) return null;
    const jsonDiscriminator = data.kind;
    const payload = {
      jsonDiscriminator,
      photoUrls,
    };
    patchProperty(payload, {
      onSuccess: () => {
        router.push(`/listings/${id}/edit`);
      },
    });
  };

  return (
    <div className="w-full max-w-[430px] pb-[70px]">
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
            className="bg-mint-light text-mint text-lab1-sb flex h-9 w-full max-w-[398px] cursor-pointer items-center justify-center rounded-[4px] border"
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
        previewUrls.length >= 3 && (
          <BottomActionBar
            buttons={[
              {
                label: "저장",
                onClick: handleTemporarySave,
                variant: "outline",
              },
              {
                label: "다음",
                onClick: () => {
                  if (onNext) onNext();
                },
                variant: "filled",
              },
            ]}
          />
        )
      ) : (
        <BottomActionBar label="저장" onClick={handleSave} />
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
