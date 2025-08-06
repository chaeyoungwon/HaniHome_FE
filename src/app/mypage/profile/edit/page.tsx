"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { useMyInfo, useUpdateUser } from "@/hooks/member/useMemberApi";
import { useNickname } from "@/hooks/signup/useNickname";

import AlertMessage from "@/components/common/AlertMessage";
import BottomActionBar from "@/components/common/BottomActionBar";
import Divider from "@/components/common/Divider";
import DropdownField from "@/components/common/DropdownField";
import InputField from "@/components/common/InputField";
import BackHeader from "@/components/layout/header/BackHeader";
import ProfileImageUploader from "@/components/signup/profile/ProfileImageUploader";

import { GENDER_OPTIONS } from "@/constants/dropdown-options";

import { Gender } from "@/types/member.type";

import Arrow from "@/public/svgs/common/left-arrow.svg";
import GoogleIcon from "@/public/svgs/mypage/google-icon.svg";

const ProfileEditPage = () => {
  const router = useRouter();
  const { data: myInfo, isLoading } = useMyInfo();

  const [profileImage, setProfileImage] = useState<string | null>(null);

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
  const { mutate: updateUser } = useUpdateUser();

  useEffect(() => {
    if (!myInfo) return;
    setProfileImage(myInfo.profileImage || null);
    setNickname(myInfo.nickname || "");
    setGender(myInfo.gender === "MALE" ? "MALE" : "FEMALE");
  }, [myInfo]);

  const showAlert = (msg: string) => {
    setAlerts(prev => [...prev, msg]);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(e.target.value);
    reset();
    validate(value);
  };

  const handleSubmit = async () => {
    if (!nickname || !gender) {
      showAlert("모든 항목을 입력해주세요");
      return;
    }

    if (isNicknameEdited && result === "default") {
      showAlert("닉네임 중복 확인을 해주세요");
      return;
    }

    if (isNicknameEdited && result !== "available") return;

    const payload = {
      nickname,
      gender: gender as Gender,
      profileImage: profileImage ?? "",
      name: myInfo?.name ?? "",
      birthDate: myInfo?.birthDate ?? "",
      phoneNumber: myInfo?.phoneNumber ?? "",
    };

    updateUser(payload, {
      onSuccess: () => {
        showAlert("저장이 완료되었어요");
      },
    });
  };

  const isNicknameEdited = nickname !== myInfo?.nickname;
  const isFormReady = isNicknameEdited ? result === "available" : true;

  return (
    <div className="flex h-screen flex-col">
      <BackHeader />
      <div className="scrollbar-hide flex-1 overflow-auto">
        <div className="flex flex-col items-center justify-center">
          <ProfileImageUploader
            size={120}
            value={profileImage}
            onChange={uploadedUrl => {
              setProfileImage(uploadedUrl);
            }}
          />
          {!isLoading && (
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

              <Divider className="my-6" />

              <div
                className="flex cursor-pointer flex-row items-center justify-between py-5"
                onClick={() => router.push("/mypage/profile/verifications")}
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
                <Image
                  src="/svgs/mypage/insta-icon.svg"
                  width={24}
                  height={24}
                  alt="인스타"
                  unoptimized
                />
              </div>
            </div>
          )}
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

export default ProfileEditPage;
