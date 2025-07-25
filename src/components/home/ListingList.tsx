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
import utc from "dayjs/plugin/utc";

import { addWish, removeWish } from "@/apis/wishlist";

import { usePropertySearch } from "@/hooks/filter/useFilter";

import { buildQueryParams } from "@/utils/buildQueryParams";

import { FALLBACK_SUBURB } from "@/constants/default-region";

import { SummaryProperty } from "@/types/property";

import ListingCard from "./ListingCard";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("ko");

const ListingList = ({ fallbackSuburb }: { fallbackSuburb: string | null }) => {
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
    selectedMetroStop,
    suburb,
  } = useFilterStore();

  const finalSuburb = suburb || fallbackSuburb || FALLBACK_SUBURB;

  const params = useMemo(
    () =>
      buildQueryParams({
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
        suburb: finalSuburb,
        metroStopLatitude: selectedMetroStop?.latitude ?? null,
        metroStopLongitude: selectedMetroStop?.longitude ?? null,
      }),
    [
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
      finalSuburb,
      selectedMetroStop?.latitude,
      selectedMetroStop?.longitude,
    ],
  );

  const { data: searchData } = usePropertySearch(params, {
    enabled: isAuthInitialized && !!(finalSuburb && finalSuburb.trim()),
  });

  const properties: SummaryProperty[] = useMemo(() => {
    return searchData?.list ?? [];
  }, [searchData?.list]);

  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});

  useMemo(() => {
    if (!properties.length) return;

    const initCounts: Record<number, number> = {};
    const initLiked: Record<number, boolean> = {};

    properties.forEach(p => {
      initCounts[p.id] = p.wishCount ?? 0;
      initLiked[p.id] = p.metaInfo?.wished ?? false;
    });

    setLikeCounts(initCounts);
    setLikedMap(initLiked);
  }, [properties]);

  const mutation = useMutation({
    mutationFn: async ({ id, isLiked }: { id: number; isLiked: boolean }) => {
      if (isLiked) {
        await removeWish(id);
      } else {
        await addWish(id);
      }
    },
    onMutate: async ({ id, isLiked }) => {
      setLikeCounts(prev => ({
        ...prev,
        [id]: prev[id] + (isLiked ? -1 : 1),
      }));
      setLikedMap(prev => ({
        ...prev,
        [id]: !isLiked,
      }));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishList"] });
    },
  });

  const handleToggleLike = (id: number, isLiked: boolean) => {
    if (!isLoggedIn) {
      openModal();
      return;
    }
    mutation.mutate({ id, isLiked });
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
          nearestStation={p.nearestStation}
          kind={p.kind}
          billIncluded={p.billIncluded}
          suburb={p.suburb}
          createdAt={p.createdAt}
          wishCount={likeCounts[p.id] ?? p.wishCount ?? 0}
          isLiked={likedMap[p.id] ?? false}
          onToggleLike={() => handleToggleLike(p.id, likedMap[p.id] ?? false)}
          onClick={() => handleCardClick(p.id)}
        />
      ))}
    </div>
  );
};

export default ListingList;
