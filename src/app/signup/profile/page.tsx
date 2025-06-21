"use client";

import { useRouter } from "next/navigation";

import { useMemo, useState } from "react";

import { useSignupStore } from "@/stores/useSignupStore";

import { useNickname } from "@/hooks/signup/useNickname";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import InputField from "@/components/common/InputField";
import SearchField from "@/components/common/SearchField";
import DropdownField from "@/components/signup/profile/DropdownField";
import ProfileImageUploader from "@/components/signup/profile/ProfileImageUploader";

const GENDER_OPTIONS = [
  { label: "남성", value: "male" },
  { label: "여성", value: "female" },
];

const SignupProfilePage = () => {
  const router = useRouter();
  const {
    message,
    isValid,
    isChecking,
    result,
    validate,
    checkDuplicate,
    reset,
  } = useNickname();
  const { nickname, gender, region, setField } = useSignupStore();
  const [alerts, setAlerts] = useState<string[]>([]);

  const showAlert = (message: string) => {
    setAlerts(prev => [...prev, message]);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField("nickname", e.target.value);
    reset();
  };

  const handleSubmit = () => {
    if (!isValid || !nickname || !gender || !region) {
      showAlert("모든 항목에 답변해주세요");
      return;
    }
    if (result === "default") {
      showAlert("닉네임 중복 확인 버튼을 눌러주세요");
      return;
    }
    if (result !== "available") return;
    router.push("/signup/complete");
  };

  const isFormReady = useMemo(
    () => nickname && gender && region && result === "available",
    [nickname, gender, region, result],
  );

  return (
    <div className="relative flex h-full flex-col">
      <h1 className="text-heading2 py-4 text-gray-900">
        프로필을 만들어주세요
      </h1>

      <ProfileImageUploader
        onUpload={file => {
          const url = URL.createObjectURL(file);
          setField("profileimg", url);
        }}
      />

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

      <DropdownField
        label="성별"
        value={gender}
        onChange={val => setField("gender", val)}
        options={GENDER_OPTIONS}
      />

      <SearchField
        label="관심 지역 검색"
        value={region}
        onChange={val => setField("region", val)}
        isSelected={!!region}
      />

      <BottomActionBar
        label="완료"
        onClick={handleSubmit}
        disabled={!isFormReady}
      />

      {alerts.length > 0 && (
        <AlertMessage
          message={alerts.at(-1)!}
          className="bottom-17"
          onDone={() => setAlerts(prev => prev.slice(0, prev.length - 1))}
        />
      )}
    </div>
  );
};

export default SignupProfilePage;
