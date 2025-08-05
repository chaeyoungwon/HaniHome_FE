"use client";

import { useRouter } from "next/navigation";

import { useMemo, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import { useLoginModalStore } from "@/stores/useLoginModalStore";

import {
  useToggleWish,
  useWishedProperties,
} from "@/hooks/wishlist/useWishListApi";

import BottomActionBar from "@/components/common/BottomActionBar";
import GuestLoginGuide from "@/components/common/GuestLoginGuide";
import LoadingLottie from "@/components/common/LoadingLottie";
import LoginAlertModal from "@/components/common/LoginAlertModal";
import ContentWrapper from "@/components/layout/ContentWrapper";
import TitleHeader from "@/components/layout/header/TitleHeader";
import DropDownMenu from "@/components/wishlist/DropDownMenu";
import RoomList from "@/components/wishlist/RoomList";

import { WishListSortType } from "@/types/wishlist.type";

import ListIcon from "@/public/svgs/header/list-icon.svg";

const Wishlist = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { openModal } = useLoginModalStore();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [sortOrder, setSortOrder] = useState<WishListSortType>("latest");
  const { data: listings = [], isLoading } = useWishedProperties(sortOrder);
  const { mutate: toggleWish } = useToggleWish([["wishList", sortOrder]]);

  const filteredListings = useMemo(() => {
    const available = listings.filter(item => item.tradeStatus === "BEFORE");
    const completed = listings.filter(item => item.tradeStatus !== "BEFORE");
    return [...available, ...completed];
  }, [listings]);

  const handleRoomClick = (id: number) => {
    if (!ensureLogin()) return;
    setSelectedId(prevId => (prevId === id ? null : id));
  };

  const ensureLogin = () => {
    if (isLoggedIn) return true;
    openModal();
    return false;
  };

  const handleNavigate = (type: "overview" | "reservation") => {
    if (!selectedId) return;
    router.push(
      type === "overview"
        ? `/listings/${selectedId}`
        : `/viewing/reservation/${selectedId}`,
    );
  };

  return (
    <ContentWrapper
      className="relative flex min-h-screen w-full flex-col"
      bottomOffset={selectedId !== null ? 65 : 62}
    >
      {isLoading && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center bg-white/80 backdrop-blur-xs">
          <LoadingLottie />
        </div>
      )}

      <TitleHeader
        title="즐겨찾기"
        rightIcon={isLoggedIn ? "list" : undefined}
        onRightClick={isLoggedIn ? () => setIsOpen(prev => !prev) : undefined}
      />

      {isOpen && (
        <div className="absolute top-9 right-[17px] z-60">
          <DropDownMenu
            onSelect={order => {
              setSortOrder(order);
              setIsOpen(false);
            }}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}

      {/* 개수 표시 */}
      <div className="text-body2-med flex items-center justify-between px-4 py-3 text-gray-800">
        <div className="flex items-center gap-1">
          <div>즐겨찾기 매물</div>
          <div>{filteredListings.length}개</div>
        </div>
        {!isLoggedIn && (
          <button onClick={ensureLogin} className="cursor-pointer">
            <ListIcon className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* 목록 */}
      {isLoggedIn ? (
        <>
          {/* 매물 없음 처리 */}
          {filteredListings.length === 0 ? (
            <div className="text-body1-med flex flex-1 items-center justify-center text-gray-400">
              즐겨찾기 내역이 없어요
            </div>
          ) : (
            filteredListings.map(item => (
              <div
                key={item.id}
                onClick={() => handleRoomClick(item.id)}
                className={`cursor-pointer transition ${
                  selectedId === item.id ? "bg-mint-light" : ""
                }`}
              >
                <RoomList
                  {...item}
                  isLiked={item.metaInfo?.wished ?? false}
                  wishCount={item.wishCount}
                  onToggleLike={() =>
                    toggleWish({
                      id: item.id,
                      isLiked: item.metaInfo?.wished ?? false,
                    })
                  }
                />
              </div>
            ))
          )}
        </>
      ) : (
        <GuestLoginGuide
          type="wishlist"
          description={`로그인 후 마음에 드는 매물을\n즐겨찾기할 수 있어요`}
        />
      )}

      {/* 하단 바 */}
      {isLoggedIn && selectedId !== null && (
        <BottomActionBar
          buttons={[
            {
              label: "상세페이지 이동",
              onClick: () => handleNavigate("overview"),
              variant: "outline",
            },
            {
              label: "뷰잉 예약",
              onClick: () => handleNavigate("reservation"),
              variant: "filled",
              disabled:
                filteredListings.find(item => item.id === selectedId)
                  ?.tradeStatus !== "BEFORE",
            },
          ]}
          layout="equal"
        />
      )}
      <LoginAlertModal />
    </ContentWrapper>
  );
};

export default Wishlist;
