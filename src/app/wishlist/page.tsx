"use client";

import { useRouter } from "next/navigation";

import { useMemo, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import { useLoginModalStore } from "@/stores/useLoginModalStore";

import BottomActionBar from "@/components/common/BottomActionBar";
import GuestLoginGuide from "@/components/common/GuestLoginGuide";
import LoginAlertModal from "@/components/common/LoginAlertModal";
import ContentWrapper from "@/components/layout/ContentWrapper";
import TitleHeader from "@/components/layout/header/TitleHeader";
import DropDownMenu from "@/components/wishlist/dropDownMenu";
import RoomList from "@/components/wishlist/roomList";

import { ListingDummies } from "@/constants/mock/listing-card-dummies";

import ListIcon from "@/public/svgs/header/list-icon.svg";

const Wishlist = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { openModal } = useLoginModalStore();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});
  const [sortOrder, setSortOrder] = useState<"latest" | "popular">("latest");

  const extractTime = (timeAgo: string): number => {
    const match = timeAgo.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const sortedListings = useMemo(() => {
    if (!isLoggedIn) return [];
    const likedFiltered = ListingDummies.filter(
      item => likedMap[item.id] !== false,
    );

    const available = likedFiltered.filter(item => item.status !== "거래 완료");
    const completed = likedFiltered.filter(item => item.status === "거래 완료");

    const sortedAvailable = [...available].sort((a, b) => {
      if (sortOrder === "latest") {
        return extractTime(a.timeAgo) - extractTime(b.timeAgo);
      }
      if (sortOrder === "popular") {
        return b.likes - a.likes;
      }
      return 0;
    });

    return [...sortedAvailable, ...completed];
  }, [isLoggedIn, sortOrder, likedMap]);

  const ensureLogin = () => {
    if (isLoggedIn) return true;
    openModal();
    return false;
  };

  const handleRoomClick = (id: number) => {
    if (!ensureLogin()) return;
    setSelectedId(prevId => (prevId === id ? null : id));
  };

  const toggleLike = (id: number) => {
    if (!ensureLogin()) return;
    setLikedMap(prev => {
      const current = prev[id] ?? true;
      return { ...prev, [id]: !current };
    });
    if (selectedId === id) setSelectedId(null);
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
        <div className="flex gap-1">
          <div>즐겨찾기 매물</div>
          <div>{sortedListings.length}개</div>
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
          {/* 매물 리스트 */}
          {sortedListings.map(item => (
            <div
              key={item.id}
              onClick={() => handleRoomClick(item.id)}
              className={`cursor-pointer transition ${
                selectedId === item.id ? "bg-mint-light" : ""
              }`}
            >
              <RoomList
                {...item}
                isLiked={
                  likedMap[item.id] !== undefined ? likedMap[item.id] : true
                }
                likes={
                  likedMap[item.id] !== undefined
                    ? item.likes + (likedMap[item.id] ? 0 : -1)
                    : item.likes
                }
                onToggleLike={() => toggleLike(item.id)}
              />
            </div>
          ))}
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
                sortedListings.find(item => item.id === selectedId)?.status ===
                "거래 완료",
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
