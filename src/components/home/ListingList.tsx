"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import { useLoginModalStore } from "@/stores/useLoginModalStore";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

import { usePropertyList } from "@/hooks/property/useProperty";

import ListingCard from "./ListingCard";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const ListingList = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { openModal } = useLoginModalStore();

  const { data: properties } = usePropertyList<"SUMMARY">({ view: "SUMMARY" });

  const [likedState, setLikedState] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!properties) return;
    const init: Record<number, number> = {};
    properties.forEach(p => {
      init[p.id] = p.wishCount ?? 0;
    });
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

  return (
    <div className="flex flex-1 flex-col">
      {properties?.map(p => (
        <ListingCard
          key={p.id}
          id={p.id}
          thumbnailUrl={p.thumbnailUrl}
          weeklyCost={p.weeklyCost}
          tradeStatus={p.tradeStatus}
          internalArea={p.internalArea}
          totalFloors={p.totalFloors}
          propertySubType={p.propertySubType}
          billIncluded={p.billIncluded}
          suburb={p.suburb}
          createdAt={p.createdAt}
          wishCount={likeCounts[p.id] ?? 0}
          isLiked={likedState[p.id] ?? false}
          onToggleLike={() => toggleLike(p.id)}
          onClick={() => handleCardClick(p.id)}
        />
      ))}
    </div>
  );
};

export default ListingList;
