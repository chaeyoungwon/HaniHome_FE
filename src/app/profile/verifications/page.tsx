"use client";

import { useEffect, useRef, useState } from "react";

import { uploadMultipleImages } from "@/utils/uploadMultipleImages";

import AlertModal from "@/components/common/AlertModal";
import BottomActionBar from "@/components/common/BottomActionBar";
import CompleteModal from "@/components/common/CompleteModal";
import DropdownField from "@/components/common/DropdownField";
import BackHeader from "@/components/layout/header/BackHeader";
import VerifyImageUploader from "@/components/mypage/VerifyImageUploader";
import ImageAlertModal from "@/components/signup/profile/ImageAlertModal";
import MaxImageAlertModal from "@/components/signup/profile/MaxImageAlertModal";
import VerfiyKindAlertModal from "@/components/signup/profile/VerifyKindAlertModal";

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
  const [uploadedMap, setUploadedMap] = useState<Record<string, File[]>>({});
  const [showErrorModal, setShowErrorModal] = useState(false); //이미지형식 에러
  const [showAssignModal, setShowAssignModal] = useState(false); //승인완료
  const [showMaxImageModal, setMaxImageModal] = useState(false); //최대 이미지 개수 에러
  const [showVerifKindModal, setShowVerifKindModal] = useState(false); //인증수단 변경 에러
  const [uploadedVerificationType, setUploadedVerificationType] = useState<
    string | null
  >(null);
  const [showNoVerificatoinAlert, setShowNoVerificationAlert] = useState(false);
  //Todo: API 조회 인증된 수단과 동일한 경우의 모달 추가
  useEffect(() => {
    if (showAssignModal) {
      const timer = setTimeout(() => setShowAssignModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAssignModal]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files) return;

    if (!verif) {
      //업로드 버튼 disable처리하기
      setShowNoVerificationAlert(true);
      e.target.value = "";
      return;
    }
    if (uploadedVerificationType && uploadedVerificationType !== verif) {
      setShowVerifKindModal(true);
      e.target.value = "";
      return;
    }

    uploadMultipleImages({
      files,
      setPreviewUrls,
      setUploadedFiles,
      setField: (key, files) => {
        setUploadedMap(prev => ({ ...prev, [key]: files }));
        if (files.length > 0) {
          setUploadedVerificationType(verif);
        }
      },
      fieldName: verif,
      setShowErrorModal,
      maxFiles: 2,
      onLimitExceeded: () => {
        setMaxImageModal(true);
      },
    });
    e.target.value = "";
  };

  const handleDelete = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setUploadedFiles(newFiles);
    if (newFiles.length === 0) {
      setUploadedMap({});
      setUploadedVerificationType(null);
      setVerif("");
    }
  };

  const handleVerifChange = (val: string) => {
    const existingField = Object.keys(uploadedMap)[0];

    // 이미지가 이미 있고, 다른 수단 선택하려는 경우 막기
    if (
      uploadedFiles.length > 0 &&
      existingField &&
      existingField !== val &&
      uploadedMap[existingField]?.length > 0
    ) {
      setShowVerifKindModal(true);
      return;
    }

    setVerif(val);
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
            onChange={handleVerifChange}
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

      <div className="bottom-19">
        {showNoVerificatoinAlert && (
          <AlertModal
            title="인증수단을 선택해주세요"
            description="이미지를 업로드하기 전 인증수단을 선택해주세요"
            onClose={() => setShowNoVerificationAlert(false)}
          />
        )}
      </div>

      {showVerifKindModal && (
        <VerfiyKindAlertModal onClose={() => setShowVerifKindModal(false)} />
      )}

      {showMaxImageModal && (
        <MaxImageAlertModal onClose={() => setMaxImageModal(false)} />
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
    </div>
  );
};
export default VerificationPage;
