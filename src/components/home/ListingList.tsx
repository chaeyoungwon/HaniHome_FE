"use client";

import { useRouter } from "next/navigation";

import { useMemo, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import { useFilterStore } from "@/stores/useFilterStore";
import { useLoginModalStore } from "@/stores/useLoginModalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

import { addWish, removeWish } from "@/apis/wishlist";

import { usePropertySearch } from "@/hooks/filter/useFilter";
import { usePropertyList } from "@/hooks/property/useProperty";
import { useWishList } from "@/hooks/wishlist/useWishList";

import { buildQueryParams } from "@/utils/buildQueryParams";

import { SummaryProperty } from "@/types/property";

import ListingCard from "./ListingCard";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const ListingList = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isLoggedIn, isAuthInitialized } = useAuthStore();
  const { openModal } = useLoginModalStore();
  const {
    selectedTypes,
    selectedRoomTypes,
    billIncluded,
    availableFrom,
    availableTo,
    immediate,
    negotiable,
    minWeeklyCost,
    maxWeeklyCost,
    radiusKm,
  } = useFilterStore();

  const params = buildQueryParams({
    selectedTypes,
    selectedRoomTypes,
    billIncluded,
    availableFrom,
    availableTo,
    immediate,
    negotiable,
    minWeeklyCost,
    maxWeeklyCost,
    radiusKm,
  });

  const { data: listData } = usePropertyList<"SUMMARY">({
    view: "SUMMARY",
    enabled: isAuthInitialized && !isLoggedIn,
  });

  const { data: searchData } = usePropertySearch(params, {
    enabled: isAuthInitialized && isLoggedIn,
  });

  const { data: wishList = [] } = useWishList();

  const properties: SummaryProperty[] = useMemo(() => {
    return isLoggedIn ? (searchData?.list ?? []) : (listData ?? []);
  }, [isLoggedIn, searchData, listData]);

  const likedMap = useMemo(() => {
    const map: Record<number, boolean> = {};
    wishList.forEach(item => {
      map[item.id] = true;
    });
    return map;
  }, [wishList]);

  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});

  useMemo(() => {
    if (!properties.length) return;

    const init: Record<number, number> = {};
    properties.forEach(p => {
      init[p.id] = p.wishCount ?? 0;
    });
    setLikeCounts(init);
  }, [properties]);

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      if (likedMap[id]) {
        await removeWish(id);
      } else {
        await addWish(id);
      }
    },
    onMutate: async id => {
      setLikeCounts(prev => ({
        ...prev,
        [id]: prev[id] + (likedMap[id] ? -1 : 1),
      }));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishList"] as const });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["wishList"] as const });
    },
  });

  const handleToggleLike = (id: number) => {
    if (!isLoggedIn) {
      openModal();
      return;
    }
    mutation.mutate(id);
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
      {properties.map(p => (
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
          wishCount={likeCounts[p.id] ?? p.wishCount ?? 0}
          isLiked={likedMap[p.id] ?? false}
          onToggleLike={() => handleToggleLike(p.id)}
          onClick={() => handleCardClick(p.id)}
        />
      ))}
    </div>
  );
};

export default ListingList;
