"use client";

import { useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import { useLoginModalStore } from "@/stores/useLoginModalStore";

import { extractSuburb } from "@/utils/extractSuburb";

import LoginAlertModal from "@/components/common/LoginAlertModal";

import { FALLBACK_SUBURB } from "@/constants/default-region";

import Arrow from "@/public/svgs/common/left-arrow.svg";

import SuburbSearchModal from "./SuburbSearchModal";

export interface LocationHeaderProps {
  interestRegions: string;
  isLoading?: boolean;
  suburbFromFilter?: string;
  onSuburbChange?: (suburb: string) => void;
}

const LocationHeader = ({
  interestRegions,
  isLoading,
  suburbFromFilter,
  onSuburbChange,
}: LocationHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoggedIn } = useAuthStore();
  const { openModal } = useLoginModalStore();

  const extracted = extractSuburb(interestRegions);
  const fallback = isLoading ? "" : FALLBACK_SUBURB;

  const displayedSuburb = suburbFromFilter?.trim() || extracted || fallback;

  const handleOpenModal = () => {
    if (!isLoggedIn) {
      openModal();
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className="mb-1 flex w-full cursor-pointer items-center justify-between px-4 py-2"
        onClick={handleOpenModal}
      >
        <p className="text-heading2 text-gray-900">
          {isLoading ? (
            <span className="inline-block h-5 w-24 animate-pulse rounded bg-gray-200" />
          ) : (
            displayedSuburb
          )}
        </p>
        <Arrow className="h-6 w-6 rotate-180 text-gray-600" />
      </div>
      {isModalOpen && (
        <SuburbSearchModal
          onClose={() => setIsModalOpen(false)}
          onSelectRegion={interestRegion => {
            const trimmed = extractSuburb(interestRegion)?.trim().toLowerCase();
            onSuburbChange?.(trimmed || FALLBACK_SUBURB);
          }}
        />
      )}
      <LoginAlertModal />
    </>
  );
};

export default LocationHeader;
