"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { useMemo, useState } from "react";

import { useMyProperties } from "@/hooks/property/usePropertyApi";

import LoadingLottie from "@/components/common/LoadingLottie";
import SelectTab from "@/components/common/SelectTab";
import ListingCard from "@/components/home/ListingCard";

import { SummaryProperty } from "@/types/property.type";

const BackHeader = dynamic(
  () => import("@/components/layout/header/BackHeader"),
  { ssr: false },
);

const TABS = [
  { label: "거래중", key: "active" },
  { label: "거래완료", key: "completed" },
  { label: "숨김", key: "hidden" },
];

const Listings = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "hidden">(
    "active",
  );

  const params = useMemo(() => {
    switch (activeTab) {
      case "active":
        return {
          view: "SUMMARY",
          tradeStatus: "BEFORE",
          displayStatus: "ACTIVE",
        } as const;
      case "completed":
        return {
          view: "SUMMARY",
          tradeStatus: "COMPLETED",
        } as const;
      case "hidden":
        return {
          view: "SUMMARY",
          displayStatus: "INACTIVE",
        } as const;
    }
  }, [activeTab]);

  const { data, isLoading } = useMyProperties(params, {
    staleTime: 0,
    refetchOnMount: true,
  });

  return (
    <div>
      <BackHeader />
      <div className="sticky top-12 z-10 bg-white">
        <SelectTab
          tabs={TABS}
          activeTab={activeTab}
          onChange={tab =>
            setActiveTab(tab as "active" | "completed" | "hidden")
          }
        />
      </div>

      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <LoadingLottie />
        </div>
      ) : (
        data?.map((item: SummaryProperty) => (
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
        ))
      )}
    </div>
  );
};

export default Listings;
