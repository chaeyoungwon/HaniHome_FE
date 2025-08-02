"use client";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import { useFilterStore } from "@/stores/useFilterStore";

import { useMyInfo } from "@/hooks/member/useMember";

import { extractSuburb } from "@/utils/address/extractSuburb";

import AddListingFab from "@/components/home/AddListingFab";
import CategoryHeader from "@/components/home/CategoryHeader";
import ListingList from "@/components/home/ListingList";
import LocationHeader from "@/components/home/LocationHeader";
import ViewingSection from "@/components/home/ViewingSection";
import FilterBar from "@/components/home/filterBar/FilterBar";
import ContentWrapper from "@/components/layout/ContentWrapper";
import MainHeader from "@/components/layout/header/MainHeader";

const Home = () => {
  const { isLoggedIn, memberId, setMemberId } = useAuthStore();
  const { data: myInfo, isLoading } = useMyInfo();
  const { suburb, setFilters } = useFilterStore();

  const [selectedSuburb, setSelectedSuburb] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn && myInfo && !memberId) {
      setMemberId(myInfo.id);
    }
    if (myInfo?.interestRegions) {
      const extracted = extractSuburb(myInfo.interestRegions);
      setSelectedSuburb(extracted);
    }
  }, [isLoggedIn, myInfo, memberId, setMemberId]);

  return (
    <ContentWrapper
      className="bg-gray-0 flex min-h-screen flex-col"
      bottomOffset={62}
    >
      <MainHeader />
      <div className="bg-gray-0 flex flex-col pt-6 pb-2">
        <CategoryHeader />
        <ViewingSection />
      </div>
      <div className="flex flex-col bg-white py-5">
        <LocationHeader
          interestRegions={myInfo?.interestRegions ?? ""}
          isLoading={isLoading}
          suburbFromFilter={suburb}
          onSuburbChange={suburb => setFilters({ suburb })}
        />
        <FilterBar />
        <ListingList fallbackSuburb={selectedSuburb} />
      </div>
      {isLoggedIn && <AddListingFab />}
    </ContentWrapper>
  );
};

export default Home;
