"use client";

import { useParams } from "next/navigation";

import { useState } from "react";

import { formatMeetingDay } from "@/utils/dateFormatter";

import BottomActionBar from "@/components/common/BottomActionBar";
import CheckIcon from "@/components/common/CheckIcon";
import UserRoomPreview from "@/components/common/UserRoomPreview";
import BackHeader from "@/components/layout/header/BackHeader";

import { listingGuests } from "@/constants/mock/listing-guests-dummies";

const ListingsGuests = () => {
  const [checked, setChecked] = useState(false);
  const { id } = useParams();
  const listingId = Number(id);
  const [selectedGuestIndex, setSelectedGuestIndex] = useState<number | null>(
    null,
  );
  const selectedListing = listingGuests.find(
    listing => listing.listingsId === listingId,
  );
  const handleCheckToggle = () => {
    setChecked(prev => !prev);
    setSelectedGuestIndex(null);
  };
  const showBottomBar = checked || selectedGuestIndex !== null;

  return (
    <>
      <BackHeader />
      <div className="flex flex-col gap-2"></div>
      <div className="pb-[70px]">
        <div className="item-start flex flex-col gap-1 px-4 py-3">
          <h3 className="text-heading3 text-gray-800">
            거래한 게스트를 선택해주세요
          </h3>
          <div className="text-cap1-med leading-none text-gray-600">
            <span>하니홈에서 뷰잉을 예약하지 않은 사람과 거래했다면</span>
            <br />
            <span>체크박스를 선택해주세요</span>
          </div>
        </div>
        <div
          onClick={handleCheckToggle}
          className="flex cursor-pointer items-center gap-1 px-4 py-3"
        >
          <CheckIcon checked={checked} />
          <span className="text-cap1-med text-gray-700">
            하니홈에서 뷰잉을 예약한 게스트가 아닌 사람과 거래했어요
          </span>
        </div>

        {selectedListing?.guests.map((guest, index) => {
          const { date, time } = formatMeetingDay(guest.meetingDay);

          return (
            <div
              key={index}
              className={`flex cursor-pointer items-center gap-4 px-4 py-3 ${
                selectedGuestIndex === index ? "bg-mint-light" : ""
              }`}
              onClick={() => {
                setSelectedGuestIndex(index);
                setChecked(false);
              }}
            >
              <UserRoomPreview
                userImg="/svgs/common/profile-img.svg"
                roomImg="/svgs/common/room-img.svg"
                variant="md"
              />
              <div className="flex flex-col gap-2">
                <span
                  className={`text-body1-sb ${
                    selectedGuestIndex === index
                      ? "text-mint-contrast"
                      : "text-gray-800"
                  }`}
                >
                  {guest.nickname}
                </span>
                <div
                  className={`text-cap1-med flex flex-col gap-1 ${
                    selectedGuestIndex === index
                      ? "text-mint-contrast"
                      : "text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>날짜</span>
                    <span
                      className={`h-3 w-px ${
                        selectedGuestIndex === index
                          ? "bg-mint-contrast"
                          : "bg-gray-300"
                      }`}
                    />
                    <span>{date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>시간</span>
                    <span
                      className={`h-3 w-px ${
                        selectedGuestIndex === index
                          ? "bg-mint-contrast"
                          : "bg-gray-300"
                      }`}
                    />
                    <span>{time}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {showBottomBar && <BottomActionBar label="저장" onClick={() => {}} />}
      </div>
    </>
  );
};
export default ListingsGuests;
