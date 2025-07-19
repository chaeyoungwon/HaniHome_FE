"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import SelectTab from "@/components/common/SelectTab";
import ListingCard from "@/components/home/ListingCard";
import BackHeader from "@/components/layout/header/BackHeader";

import { ListingDummies } from "@/constants/mock/listing-card-dummies";

const TABS = [
  { label: "거래중", key: "active" },
  { label: "거래완료", key: "completed" },
  { label: "숨김", key: "hidden" },
];

const Listings = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("active");

  const filteredListings = ListingDummies.filter(item => {
    if (activeTab === "active") return item.tradeStatus === "BEFORE";
    if (activeTab === "completed") return item.tradeStatus !== "BEFORE";
    if (activeTab === "hidden") return false;
    return true;
  });

  return (
    <div>
      <BackHeader />
      <SelectTab tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      {filteredListings.map(item => (
        <div
          key={item.id}
          onClick={() => {
            if (item.tradeStatus === "BEFORE") {
              router.push(`/listings/${item.id}?mode=edit`);
            }
          }}
        >
          <ListingCard
            {...item}
            isLiked={false}
            onToggleLike={() => {}}
            heartColor="text-gray"
          />
        </div>
      ))}
    </div>
  );
};
export default Listings;
