"use client";

import ListingCard from "@/components/home/ListingCard";
import BackHeader from "@/components/layout/header/BackHeader";

import { myPurchases } from "@/constants/mock/my-purchases";

const Purchases = () => {
  return (
    <div>
      <BackHeader />
      {myPurchases.map(item => (
        <ListingCard
          key={item.id}
          {...item}
          isLiked={false}
          onToggleLike={() => {}}
          heartColor="text-gray-400"
        />
      ))}
    </div>
  );
};
export default Purchases;
