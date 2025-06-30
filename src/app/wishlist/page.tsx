"use client";

import { useRouter } from "next/navigation";

import { useMemo, useState } from "react";

import BottomActionBar from "@/components/common/BottomActionBar";
import ContentWrapper from "@/components/layout/ContentWrapper";
import TitleHeader from "@/components/layout/header/TitleHeader";
import DropDownMenu from "@/components/wishlist/dropDownMenu";
import RoomList from "@/components/wishlist/roomList";

import { ListingDummies } from "@/constants/mock/listing-card-dummies";

const Wishlist = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});
  const [sortOrder, setSortOrder] = useState<"latest" | "popular">("latest");

  const extractTime = (timeAgo: string): number => {
    const match = timeAgo.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const sortedListings = useMemo(() => {
    const likedFiltered = ListingDummies.filter(
      item => likedMap[item.id] !== false, // false일 경우 제외
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
  }, [sortOrder, likedMap]);

  const handleRoomClick = (id: number) => {
    setSelectedId(prevId => (prevId === id ? null : id));
  };

  const handleNavigate = (type: "overview" | "reservation") => {
    if (!selectedId) return;
    const url =
      type === "overview"
        ? `/listings/${selectedId}`
        : `/viewing/reservation/${selectedId}`;
    router.push(url);
  };

  const toggleLike = (id: number) => {
    setLikedMap(prev => {
      const current = prev[id] ?? true;
      return {
        ...prev,
        [id]: !current,
      };
    });
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <ContentWrapper
      className="relative flex min-h-screen w-full flex-col"
      bottomOffset={selectedId !== null ? 65 : 62}
    >
      <TitleHeader
        title="즐겨찾기"
        rightIcon="list"
        onRightClick={() => setIsOpen(prev => !prev)}
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

      <div>
        <div className="text-body2-med flex items-center gap-1 px-4 py-3 text-gray-800">
          <div>즐겨찾기 매물</div>
          <div>{sortedListings.length}개</div>
        </div>

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
      </div>

      {selectedId !== null && (
        <div className="duration-300">
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
                  sortedListings.find(item => item.id === selectedId)
                    ?.status === "거래 완료",
              },
            ]}
            layout="equal"
          />
        </div>
      )}
    </ContentWrapper>
  );
};

export default Wishlist;
