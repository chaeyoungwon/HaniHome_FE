"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import { useAuth } from "@/hooks/auth/useAuth";
import { useMyInfo } from "@/hooks/member/useMember";

import Divider from "@/components/common/Divider";
import TitleHeader from "@/components/layout/header/TitleHeader";
import GoogleLoginButton from "@/components/login/GoogleLoginButton";
import Section from "@/components/mypage/SectionItems";
import WithdrawAlertModal from "@/components/mypage/WithdrawAlertModal";

import { getSections } from "@/constants/mypage-section";

import { SectionData } from "@/types/mypageSection";

import CertificateBadge from "@/public/svgs/common/certificated-icon.svg";
import Arrow from "@/public/svgs/common/left-arrow.svg";

const Mypage = () => {
  const router = useRouter();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const { logout } = useAuth();
  const { isLoggedIn, setMemberId } = useAuthStore();

  const { data: myInfo } = useMyInfo();

  useEffect(() => {
    if (isLoggedIn && myInfo?.id) {
      setMemberId(String(myInfo.id));
    }
  }, [isLoggedIn, myInfo, setMemberId]);

  const sections = getSections(router, {
    onLogout: logout,
    onOpenWithdrawModal: () => setIsWithdrawModalOpen(true),
  });

  return (
    <div>
      <TitleHeader title="마이페이지" />

      <div className="cursor-pointer pb-[62px]">
        <div
          className="flex h-22 items-center justify-between px-4 py-2"
          onClick={() => {
            if (isLoggedIn) router.push("profile/edit");
          }}
        >
          <div className="flex gap-[24px]">
            <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full bg-gray-100">
              <Image
                src={
                  isLoggedIn
                    ? myInfo?.profileImage ||
                      "/svgs/common/profile-default1.svg"
                    : "/svgs/common/guest-profile.svg"
                }
                fill
                alt="profileImg"
                className="object-cover object-center"
              />
            </div>
            <div className="flex items-center gap-1">
              <div
                className={`text-heading2 ${
                  isLoggedIn ? "text-gray-900" : "text-gray-800"
                }`}
              >
                {isLoggedIn ? (myInfo?.nickname ?? "닉네임") : "게스트"}
              </div>
              {isLoggedIn && myInfo?.verifiedUser && (
                <CertificateBadge className="h-6 w-6" />
              )}
            </div>
          </div>
          {isLoggedIn && <Arrow className="h-6 w-6 rotate-180 text-gray-700" />}
        </div>

        <div className="py-4">
          {isLoggedIn ? (
            sections.map((section: SectionData, index) => (
              <div key={section.label}>
                <Section label={section.label} items={section.items} />
                {index !== sections.length - 1 && <Divider className="my-1" />}
              </div>
            ))
          ) : (
            <div className="px-4">
              <GoogleLoginButton />
            </div>
          )}
        </div>
      </div>

      {isLoggedIn && isWithdrawModalOpen && (
        <WithdrawAlertModal onClose={() => setIsWithdrawModalOpen(false)} />
      )}
    </div>
  );
};

export default Mypage;
