"use client";

import { useRouter } from "next/navigation";

import { useMyDeals } from "@/hooks/property/usePropertyApi";

import LoadingLottie from "@/components/common/LoadingLottie";
import ListingCard from "@/components/home/ListingCard";
import BackHeader from "@/components/layout/header/BackHeader";

const Purchases = () => {
  const { data: purchases, isLoading } = useMyDeals("DEAL_AS_GUEST");
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col">
      <BackHeader />
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <LoadingLottie />
        </div>
      ) : purchases?.length === 0 ? (
        <div className="text-body1-med flex flex-1 items-center justify-center text-gray-400">
          거래 내역이 없어요
        </div>
      ) : (
        purchases?.map(item => (
          <ListingCard
            key={item.id}
            {...item}
            isLiked={false}
            onToggleLike={() => {}}
            heartColor="text-gray-400"
            onClick={() => router.push(`/listings/${item.id}`)}
          />
        ))
      )}
    </div>
  );
};
export default Purchases;
