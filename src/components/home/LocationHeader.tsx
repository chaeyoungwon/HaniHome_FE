"use client";

import { useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import { useLoginModalStore } from "@/stores/useLoginModalStore";
import { useSignupStore } from "@/stores/useSignupStore";

import LoginAlertModal from "@/components/common/LoginAlertModal";

import Arrow from "@/public/svgs/common/left-arrow.svg";

import SuburbSearchModal from "./SuburbSearchModal";

const LocationHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoggedIn } = useAuthStore();
  const { openModal } = useLoginModalStore();

  const { interestRegion, setField } = useSignupStore();
  const displayRegion =
    interestRegion && interestRegion.includes(",")
      ? interestRegion.slice(0, interestRegion.lastIndexOf(",")).trim()
      : interestRegion || "chatswood";

  const handleOpenModal = () => {
    if (!isLoggedIn) {
      openModal(); // ❗ 로그인 안 돼 있으면 로그인 모달 열기
      return;
    }
    setIsModalOpen(true); // ❗ 로그인 상태면 기존 지역 모달 열기
  };

  return (
    <>
      <div
        className="mb-1 flex w-full cursor-pointer items-center justify-between px-4 py-2"
        onClick={handleOpenModal}
      >
        <p className="text-heading2 text-gray-900">{displayRegion}</p>
        <Arrow className="h-6 w-6 rotate-180 text-gray-600" />
      </div>
      {isModalOpen && (
        <SuburbSearchModal
          onClose={() => setIsModalOpen(false)}
          onSelectRegion={interestRegion =>
            setField("interestRegion", interestRegion)
          }
        />
      )}
      <LoginAlertModal />
    </>
  );
};

export default LocationHeader;
