"use client";

import { useMemo, useState } from "react";

import { useSignupStore } from "@/stores/useSignupStore";

import { useAuth } from "@/hooks/auth/useAuth";
import { useNickname } from "@/hooks/signup/useNickname";

import { formatConsents } from "@/utils/formatConsentType";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { getRandomDefaultProfile } from "@/utils/getRandomDefaultProfile";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import DropdownField from "@/components/common/DropdownField";
import InputField from "@/components/common/InputField";
import SearchField from "@/components/common/SearchField";
import ProfileImageUploader from "@/components/signup/profile/ProfileImageUploader";

import { GENDER_OPTIONS } from "@/constants/dropdown-options";

import { SignupPayload } from "@/types/auth";

const SignupProfilePage = () => {
  const {
    message,
    isValid,
    isChecking,
    result,
    validate,
    checkDuplicate,
    reset,
  } = useNickname();

  const {
    name,
    phoneNumber,
    nickname,
    gender,
    interestRegion,
    profileImage,
    profileImagePreview,
    agreed,
    setField,
  } = useSignupStore();

  const { signup, isSignupLoading } = useAuth();

  const [alerts, setAlerts] = useState<string[]>([]);
  const showAlert = (msg: string) => setAlerts(prev => [...prev, msg]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setField("nickname", value);
    reset();
    validate(value);
  };

  /* 최종 제출 */
  const handleSubmit = async () => {
    if (!isValid || !nickname || !gender || !interestRegion) {
      showAlert("모든 항목에 답변해주세요");
      return;
    }
    if (result === "default") {
      showAlert("닉네임 중복 확인 버튼을 눌러주세요");
      return;
    }
    if (result !== "available") return;

    // 프로필 이미지 비어 있으면 기본 이미지 처리
    const finalProfileImage = profileImage || getRandomDefaultProfile();

    const payload: SignupPayload = {
      name,
      phoneNumber: formatPhoneNumber(phoneNumber),
      nickname,
      gender,
      interestRegion,
      profileImage: finalProfileImage ?? null,
      consents: formatConsents(agreed),
    };

    signup(payload);
  };

  const isFormReady = useMemo(
    () => nickname && gender && interestRegion && result === "available",
    [nickname, gender, interestRegion, result],
  );

  return (
    <div className="relative flex h-full flex-col">
      <h1 className="text-heading2 py-4 text-gray-900">
        프로필을 만들어주세요
      </h1>

      <div className="p-6">
        <ProfileImageUploader
          value={profileImagePreview ?? null}
          onChange={uploadedUrl => {
            setField("profileImage", uploadedUrl);
            setField("profileImagePreview", uploadedUrl); // 프리뷰 저장도 같이
          }}
        />
      </div>

      {/* 닉네임 */}
      <InputField
        label="닉네임"
        placeholder="한영문, 숫자로 5 - 12글자"
        value={nickname}
        onChange={handleNicknameChange}
        onBlur={() => validate(nickname)}
        actionLabel="중복 확인"
        actionClickable={isValid && !isChecking}
        onActionClick={() => checkDuplicate(nickname)}
        errorMessage={
          result === "unavailable" || result === "default" ? message : undefined
        }
        successMessage={result === "available" ? message : undefined}
      />

      {/* 성별 */}
      <DropdownField
        label="성별"
        value={gender}
        onChange={val => setField("gender", val)}
        options={GENDER_OPTIONS}
      />

      {/* 관심 지역 */}
      <SearchField
        label="관심 지역 검색"
        value={interestRegion}
        onChange={val => setField("interestRegion", val)}
        isSelected={!!interestRegion}
      />

      <BottomActionBar
        label="완료"
        onClick={handleSubmit}
        disabled={!isFormReady || isSignupLoading}
      />

      {alerts.length > 0 && (
        <AlertMessage
          message={alerts.at(-1)!}
          className="bottom-17"
          onDone={() => setAlerts(prev => prev.slice(0, -1))}
        />
      )}
    </div>
  );
};

export default SignupProfilePage;
