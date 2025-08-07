"use client";

import { useEffect } from "react";

import { getVerificationPresignedUrl } from "@/apis/s3UploadApi";

import {
  useSubmitVerificationMutation,
  useVerificationsQuery,
} from "@/hooks/mypage/useVerificationApi";
import useVerificationUpload from "@/hooks/mypage/useVerificationUpload";

import { uploadFilesToPresignedUrls } from "@/utils/images/uploadFilesToPresignedUrls";

import AlertModal from "@/components/common/AlertModal";
import BottomActionBar from "@/components/common/BottomActionBar";
import CompleteModal from "@/components/common/CompleteModal";
import DropdownField from "@/components/common/DropdownField";
import BackHeader from "@/components/layout/header/BackHeader";
import VerifyImageUploader from "@/components/mypage/VerifyImageUploader";
import ExistVerifyKindAlertModal from "@/components/signup/profile/ExistVerifyKindAlertModal";
import ImageAlertModal from "@/components/signup/profile/ImageAlertModal";
import MaxImageAlertModal from "@/components/signup/profile/MaxImageAlertModal";
import VerfiyKindAlertModal from "@/components/signup/profile/VerifyKindAlertModal";

import { VERIFICATION_OPTIONS } from "@/constants/dropdown-options";

import { VerificationType } from "@/types/auth.type";

import EmptyCheck from "@/public/svgs/common/empty-check.svg";
import FilledCheck from "@/public/svgs/common/filled-check.svg";

const VerificationPage = () => {
  const { data: existingVerifications } = useVerificationsQuery();
  const { mutate: submitVerification } = useSubmitVerificationMutation();
  const {
    verif,
    uploadedMap,
    previewMap,
    isAgree,
    setIsAgree,
    fileInputRef,
    handleFileChange,
    handleDelete,
    handleVerifChange,
    modals,
    closeModal,
    openModal,
  } = useVerificationUpload();

  const handleSubmit = async () => {
    try {
      const uploadedTypes = Object.keys(uploadedMap) as VerificationType[];

      // 기존 인증 타입과 중복되는 게 있는지 검사
      const duplicateType = uploadedTypes.find(type =>
        existingVerifications?.some(v => v.type === type),
      );

      if (duplicateType) {
        openModal("showDuplicateModal");
        return;
      }

      for (const [type, files] of Object.entries(uploadedMap)) {
        const extensions = files.map(f => f.name.split(".").pop() ?? "jpg");
        const urls = await getVerificationPresignedUrl(
          type as VerificationType,
          extensions,
        );
        const uploaded = await uploadFilesToPresignedUrls(files, urls);

        submitVerification({
          type: type as VerificationType,
          documentImageUrls: uploaded,
        });
      }

      openModal("showAssignModal");
    } catch (err) {
      console.error("업로드 실패:", err);
      openModal("showErrorModal");
    }
  };

  useEffect(() => {
    if (modals.showAssignModal) {
      const timer = setTimeout(() => closeModal("showAssignModal"), 3000);
      return () => clearTimeout(timer);
    }
  }, [modals.showAssignModal]);

  return (
    <div className="flex h-screen w-full max-w-[430px] flex-col">
      <BackHeader />

      {/* 인증수단 선택 */}
      <div className="flex flex-col gap-8 px-4 py-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-heading3 text-gray-800">인증수단 선택</h3>
          <span className="text-cap1-med text-gray-600">
            여권 / 운전면허증 / 거주허가증 등 신원 인증 수단 업로드
          </span>
        </div>
        <DropdownField
          value={verif as VerificationType}
          placeholder="선택"
          onChange={handleVerifChange}
          options={VERIFICATION_OPTIONS}
        />
      </div>

      {/* 파일 업로드 */}
      <div className="px-4 py-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-heading3 text-gray-800">파일 업로드</h3>
          {verif && (previewMap[verif] ?? []).length > 0 && (
            <VerifyImageUploader
              images={previewMap[verif] as string[]}
              onDelete={index => handleDelete(verif as VerificationType, index)}
            />
          )}
          <button
            className="text-lab1-sb flex h-9 w-full max-w-[398px] cursor-pointer items-center justify-center rounded-[4px] border border-gray-600 py-[10px] text-gray-800"
            onClick={() => fileInputRef.current?.click()}
          >
            + 사진 업로드
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
          <div className="text-cap1-med text-gray-400">
            <p>이름, 사진, 만료일이 명확히 보이도록 업로드하세요</p>
            <p>허위 정보 업로드 시 서비스 이용이 제한될 수 있습니다</p>
          </div>
        </div>
      </div>

      {/* 이용약관 동의 */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        onClick={() => setIsAgree(prev => !prev)}
      >
        <div className="h-[18px] w-[18px]">
          {isAgree ? <FilledCheck /> : <EmptyCheck />}
        </div>
        <span className="text-cap1-med text-gray-600">
          본인은 제출한 정보가 사실이며, 인증 목적 외에 사용되지 않음을 이해하고
          동의합니다.
        </span>
      </div>

      {/* 제출 버튼 */}
      {verif &&
        (uploadedMap[verif] ?? []).length > 0 &&
        isAgree &&
        !modals.showAssignModal && (
          <BottomActionBar label="인증 신청" onClick={handleSubmit} />
        )}

      {/* 모달 영역 */}
      {modals.showErrorModal && (
        <ImageAlertModal onClose={() => closeModal("showErrorModal")} />
      )}

      {modals.showNoVerificationAlert && (
        <AlertModal
          title="인증수단을 선택해주세요"
          description="이미지를 업로드하기 전 인증수단을 선택해주세요"
          onClose={() => closeModal("showNoVerificationAlert")}
        />
      )}

      {modals.showVerifKindModal && (
        <VerfiyKindAlertModal
          onClose={() => closeModal("showVerifKindModal")}
        />
      )}

      {modals.showMaxImageModal && (
        <MaxImageAlertModal onClose={() => closeModal("showMaxImageModal")} />
      )}

      {modals.showAssignModal && (
        <CompleteModal
          description={[
            "인증 신청이 완료되었어요.",
            "관리자가 곧 승인해드릴게요.",
          ]}
          onClose={() => closeModal("showAssignModal")}
        />
      )}

      {modals.showDuplicateModal && (
        <ExistVerifyKindAlertModal
          onClose={() => closeModal("showDuplicateModal")}
        />
      )}
    </div>
  );
};

export default VerificationPage;
