"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import { useMyInfo } from "@/hooks/member/useMember";

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
  const { data: myInfo } = useMyInfo();

  useEffect(() => {
    if (isLoggedIn && myInfo && !memberId) {
      setMemberId(myInfo.id);
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
        <LocationHeader />
        <FilterBar />
        <ListingList />
      </div>
      {isLoggedIn && <AddListingFab />}
    </ContentWrapper>
  );
};

export default Home;
