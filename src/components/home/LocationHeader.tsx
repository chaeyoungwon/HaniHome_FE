"use client";

import { useState } from "react";

import { useSignupStore } from "@/stores/useSignupStore";

import Arrow from "@/public/svgs/common/left-arrow.svg";

import SuburbSearchModal from "./SuburbSearchModal";

const LocationHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { interestRegion, setField } = useSignupStore();
  const displayRegion =
    interestRegion && interestRegion.includes(",")
      ? interestRegion.slice(0, interestRegion.lastIndexOf(",")).trim()
      : interestRegion || "chatswood";

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className="mb-1 flex w-full cursor-pointer items-center justify-between px-4 py-2"
        onClick={handleOpenModal}
      >
        <p className="text-heading2 text-gray-900">
          {displayRegion || "chatswood"}
        </p>
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
    </>
  );
};

export default LocationHeader;
