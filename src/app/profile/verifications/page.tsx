"use client";

import { useEffect, useRef, useState } from "react";

import { uploadMultipleImages } from "@/utils/uploadMultipleImages";

import AlertMessage from "@/components/common/AlertMessage";
import AlertModal from "@/components/common/AlertModal";
import BottomActionBar from "@/components/common/BottomActionBar";
import CompleteModal from "@/components/common/CompleteModal";
import DropdownField from "@/components/common/DropdownField";
import BackHeader from "@/components/layout/header/BackHeader";
import VerifyImageUploader from "@/components/mypage/VerifyImageUploader";
import ImageAlertModal from "@/components/signup/profile/ImageAlertModal";

import EmptyCheck from "@/public/svgs/common/empty-check.svg";
import FilledCheck from "@/public/svgs/common/filled-check.svg";

const VERIFICATION_OPTIONS = [
  { label: "여권", value: "passport" },
  { label: "운전면허증", value: "license" },
  { label: "거주허가증", value: "residence" },
];

const VerificationPage = () => {
  const [verif, setVerif] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [, setUploadedMap] = useState<Record<string, File[]>>({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (showAssignModal) {
      const timer = setTimeout(() => setShowAssignModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAssignModal]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!verif) {
      setShowDeleteModal(true);
      e.target.value = "";
      return;
    }
    const selectedLabel =
      VERIFICATION_OPTIONS.find(opt => opt.value === verif)?.label ?? "";

    uploadMultipleImages({
      file,
      setPreviewUrls,
      setUploadedFiles,
      setField: (key, files) => {
        setUploadedMap(prev => ({ ...prev, [key]: files }));
      },
      fieldName: selectedLabel,
      setShowErrorModal,
      maxFiles: 2,
      onLimitExceeded: () => {
        setAlertMessage("최대 두 장까지만 업로드 가능합니다.");
      },
      onUpload: () => {
        setVerif(""); // 업로드 후 인증수단 초기화
      },
    });

    e.target.value = "";
  };

  const handleDelete = (index: number) => {
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-screen max-w-[375px] flex-col">
      <BackHeader />

      {/* 인증수단선택 */}
      <div className="flex flex-col gap-8 px-4 py-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-heading3 text-gray-800">인증수단 선택</h3>
          <span className="text-cap1-med text-gray-600">
            여권 / 운전면허증 / 거주허가증 등 신원 인증 수단 업로드
          </span>
        </div>
        <div>
          <DropdownField
            value={verif}
            placeholder="선택"
            onChange={val => setVerif(val)}
            options={VERIFICATION_OPTIONS}
          />
        </div>
      </div>

      {/* 파일 업로드 */}
      <div className="px-4 py-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-heading3 text-gray-800">파일 업로드</h3>
          {previewUrls.length > 0 && (
            <VerifyImageUploader images={previewUrls} onDelete={handleDelete} />
          )}
          <button
            className="text-lab1-sb flex h-9 w-[343px] cursor-pointer items-center justify-center rounded-[4px] border border-gray-600 py-[10px] text-gray-800"
            onClick={() => fileInputRef.current?.click()}
            // disabled={!verif}
          >
            + 사진 업로드
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="text-cap1-med text-gray-400">
            <p>
              여권 운전면허증의 이름과 사진, 만료일이 명확히 보이도록
              업로드하세요
            </p>
            <p>허위 정보 업로드 시 서비스 이용이 제한될 수 있습니다</p>
          </div>
        </div>
      </div>

      {/* 이용약관동의 */}
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
      {uploadedFiles.length > 0 && isAgree && !showAssignModal && (
        <BottomActionBar
          label="인증 신청"
          onClick={() => {
            // Todo: 인증 요청 로직
            setShowAssignModal(true);
          }}
        />
      )}

      {showErrorModal && (
        <ImageAlertModal onClose={() => setShowErrorModal(false)} />
      )}
      {showAssignModal && (
        <CompleteModal
          description={[
            "인증 신청이 완료되었어요.",
            "관리자가 곧 승인해드릴게요.",
          ]}
          onClose={() => setShowAssignModal(false)}
        />
      )}

      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          className={
            uploadedFiles.length > 0 && isAgree && !showAssignModal
              ? "bottom-19"
              : "bottom-3"
          }
          onDone={() => setAlertMessage("")}
        />
      )}

      {showDeleteModal && (
        <AlertModal
          title="인증수단을 선택해주세요"
          description={[
            "기존 인증수단 이미지 외 다른 이미지를 업로드하려면",
            "추가 인증수단 선택 후 인증 사진 업로드가 가능합니다",
          ]}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};
export default VerificationPage;
