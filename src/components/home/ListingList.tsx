"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { ListingDummies } from "@/constants/ListingDummies";

import ListingCard from "./ListingCard";

const ListingList = () => {
  const [likedState, setLikedState] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(() =>
    ListingDummies.reduce(
      (acc, cur) => {
        acc[cur.id] = cur.likes;
        return acc;
      },
      {} as Record<number, number>,
    ),
  );

  const router = useRouter();

  const toggleLike = (id: number) => {
    setLikedState(prev => ({
      ...prev,
      [id]: !prev[id],
    }));

    setLikeCounts(prev => ({
      ...prev,
      [id]: prev[id] + (likedState[id] ? -1 : 1),
    }));
  };

  const handleCardClick = (id: number) => {
    router.push(`/listings/${id}`);
  };

  return (
    <div className="flex flex-col">
      {ListingDummies.map(listing => (
        <ListingCard
          key={listing.id}
          {...listing}
          likes={likeCounts[listing.id] ?? listing.likes}
          isLiked={likedState[listing.id] ?? false}
          onToggleLike={() => toggleLike(listing.id)}
          onClick={() => handleCardClick(listing.id)}
        />
      ))}
    </div>
  );
};

export default ListingList;
