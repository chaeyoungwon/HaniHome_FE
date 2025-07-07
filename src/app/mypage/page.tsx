"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import { getMyInfo } from "@/apis/auth";

import { useAuth } from "@/hooks/auth/useAuth";

import Divider from "@/components/common/Divider";
import TitleHeader from "@/components/layout/header/TitleHeader";
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
  const setMemberId = useAuthStore(state => state.setMemberId);

  const [myInfo, setMyInfo] = useState<{
    nickname: string;
    profileImage: string;
  } | null>(null);

  const sections = getSections(router, {
    onLogout: logout,
    onOpenWithdrawModal: () => setIsWithdrawModalOpen(true),
  });

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const data = await getMyInfo();
        setMemberId(String(data.id));
        setMyInfo({
          nickname: data.nickname,
          profileImage: data.profileImage,
        });
      } catch (error) {
        console.error("유저 정보 조회 실패:", error);
      }
    };

    fetchMyInfo();
  }, [setMemberId]);

  return (
    <div>
      <TitleHeader title="마이페이지" />

      <div className="cursor-pointer pb-[62px]">
        <div
          className="flex h-22 items-center justify-between px-4 py-2"
          onClick={() => router.push("profile/edit")}
        >
          <div className="flex gap-[24px]">
            <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full bg-gray-100">
              <Image
                src={myInfo?.profileImage || "/svgs/common/profile-img.svg"}
                fill
                alt="profileImg"
                className="object-cover object-center"
              />
            </div>
            <div className="flex items-center gap-1">
              <div className="text-heading2 text-gray-900">
                {myInfo?.nickname || ""}
              </div>
              <CertificateBadge className="h-6 w-6" />
            </div>
          </div>
          <Arrow className="h-6 w-6 rotate-180 text-gray-700" />
        </div>

        <div className="py-4">
          {sections.map((section: SectionData, index) => (
            <div key={section.label}>
              <Section label={section.label} items={section.items} />
              {index !== sections.length - 1 && <Divider className="my-1" />}
            </div>
          ))}
        </div>
      </div>

      {isWithdrawModalOpen && (
        <WithdrawAlertModal onClose={() => setIsWithdrawModalOpen(false)} />
      )}
    </div>
  );
};

export default Mypage;
