"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useMemo, useState } from "react";

import { useNickname } from "@/hooks/signup/useNickname";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import Divider from "@/components/common/Divider";
import DropdownField from "@/components/common/DropdownField";
import InputField from "@/components/common/InputField";
import BackHeader from "@/components/layout/header/BackHeader";

import Arrow from "@/public/svgs/common/left-arrow.svg";
import PlusIcon from "@/public/svgs/common/plus-icon.svg";
import GoogleIcon from "@/public/svgs/mypage/google-icon.svg";
import InstaIcon from "@/public/svgs/mypage/insta-icon.svg";

const GENDER_OPTIONS = [
  { label: "남성", value: "male" },
  { label: "여성", value: "female" },
];
const ProfileEdit = () => {
  const router = useRouter();
  const [profileImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [alerts, setAlerts] = useState<string[]>([]);

  const {
    message,
    isValid,
    isChecking,
    result,
    validate,
    checkDuplicate,
    reset,
  } = useNickname();

  const showAlert = (msg: string) => {
    setAlerts(prev => [...prev, msg]);
  };

  //Todo: 사용자프로필 정보 가져오기

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    reset();
  };

  const handleSubmit = async () => {
    if (!isValid || !nickname || !gender) {
      showAlert("모든 항목을 입력해주세요");
      return;
    }
    if (result === "default") {
      showAlert("닉네임 중복 확인을 해주세요");
      return;
    }
    if (result !== "available") return;
    router.push("/profile/edit");

    //Todo: 프로필 수정 반영
  };

  const isFormReady = useMemo(() => {
    return nickname && gender && result === "available";
  }, [nickname, gender, result]);
  const DEFAULT_IMAGE = "/svgs/common/profile-img.svg";

  return (
    <div className="flex h-screen flex-col">
      <BackHeader />
      <div className="scrollbar-hide flex-1 overflow-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="relative h-30 w-30">
            <Image
              src={profileImage ?? "/svgs/common/profile-img.svg"}
              alt="profileImg"
              fill
              className="rounded-full object-cover object-center"
            />
            {profileImage === DEFAULT_IMAGE && (
              <PlusIcon className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
            )}
          </div>

          <div className="w-[343px] pb-[66px]">
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
                result === "unavailable" || result === "default"
                  ? message
                  : undefined
              }
              successMessage={result === "available" ? message : undefined}
            />

            <DropdownField
              label="성별"
              value={gender}
              onChange={val => setGender(val)}
              options={GENDER_OPTIONS}
            />
            <Divider className="my-6"/>
            <div
              className="flex cursor-pointer flex-row items-center justify-between py-5"
              onClick={() => router.push("/profile/verifications")}
            >
              <div className="flex flex-col items-start gap-1">
                <div className="text-body1-sb text-gray-800">인증 강화</div>
                <div className="text-cap1-med text-gray-600">
                  여권 / 운전면허증 / 거주허가증 등 신원 인증 수단 업로드
                </div>
              </div>
              <Arrow className="h-6 w-6 rotate-180 text-gray-700" />
            </div>
            <div className="flex cursor-pointer items-center justify-between py-5">
              <div className="text-body1-sb text-gray-800">
                연결된 소셜 계정
              </div>
              <GoogleIcon className="h-6 w-6" />
            </div>
            <div className="flex cursor-pointer items-center justify-between py-5">
              <div className="text-body1-sb text-gray-800">SNS</div>
              <InstaIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
        <BottomActionBar
          label="저장"
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
    </div>
  );
};
export default ProfileEdit;
