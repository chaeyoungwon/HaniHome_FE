"use client";

import { useRouter } from "next/navigation";

import { useEffect, useMemo, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import { useLoginModalStore } from "@/stores/useLoginModalStore";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

import { usePropertyList } from "@/hooks/property/useProperty";

import { ListingCardProps } from "@/types/listingCard";
import { Property } from "@/types/property";

import ListingCard from "./ListingCard";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const toListingCard = (
  p: Property,
  likes: number,
  isLiked: boolean,
  onToggleLike: () => void,
  onClick: () => void,
): ListingCardProps => ({
  id: p.id,
  image: p.photoUrls[0] ?? "/svgs/common/room-img.svg",
  price: p.costDetails.weeklyCost,
  area: p.internalDetails.totalArea ?? undefined,
  floor:
    p.kind === "SHARE"
      ? (p.internalDetails.propertyFloor ?? undefined)
      : (p.internalDetails.propertyFloors ?? undefined),
  type: p.kind === "SHARE" ? "쉐어" : "렌트",
  billIncluded: p.costDetails.billIncluded,
  distance: "500",
  location: `${p.region.state} ${p.region.suburb}`,
  timeAgo: dayjs(p.moveInInfo.availableFrom).fromNow(),
  likes,
  isLiked,
  onToggleLike,
  onClick,
});

const ListingList = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { openModal } = useLoginModalStore();

  const { data: properties } = usePropertyList();

  const [likedState, setLikedState] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!properties) return;
    const init: Record<number, number> = {};
    properties.forEach(p => (init[p.id] = 0));
    setLikeCounts(init);
  }, [properties]);

  const toggleLike = (id: number) => {
    if (!isLoggedIn) {
      openModal();
      return;
    }
    setLikedState(prev => ({ ...prev, [id]: !prev[id] }));
    setLikeCounts(prev => ({
      ...prev,
      [id]: prev[id] + (likedState[id] ? -1 : 1),
    }));
  };

  const handleCardClick = (id: number) => {
    if (!isLoggedIn) {
      openModal();
      return;
    }
    router.push(`/listings/${id}`);
  };

  const cards = useMemo(() => {
    if (!properties) return [];
    return properties.map(p =>
      toListingCard(
        p,
        likeCounts[p.id] ?? 0,
        likedState[p.id] ?? false,
        () => toggleLike(p.id),
        () => handleCardClick(p.id),
      ),
    );
  }, [properties, likeCounts, likedState]);

  return (
    <div className="flex flex-1 flex-col">
      {cards.map(card => (
        <ListingCard key={card.id} {...card} />
      ))}
    </div>
  );
};

export default ListingList;
