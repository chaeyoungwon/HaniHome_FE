"use client";

import { useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import { useMyViewingList } from "@/hooks/viewing/useViewingApi";

import GuestLoginGuide from "@/components/common/GuestLoginGuide";
import LoadingLottie from "@/components/common/LoadingLottie";
import SelectTab from "@/components/common/SelectTab";
import ContentWrapper from "@/components/layout/ContentWrapper";
import TitleHeader from "@/components/layout/header/TitleHeader";
import ViewingCanceledSection from "@/components/viewings/ViewingCanceledSection";
import ViewingCompletedSection from "@/components/viewings/ViewingCompletedSection";
import ViewingConfirmedSection from "@/components/viewings/ViewingConfirmedSection";

import { viewingTabs } from "@/constants/viewing-tabs";

import { ViewingPropertyItem, ViewingStatus } from "@/types/viewing.type";

const Viewing = () => {
  const { isLoggedIn } = useAuthStore();
  const [activeTab, setActiveTab] = useState<ViewingStatus>("REQUESTED");

  const { data = [], isLoading } = useMyViewingList<ViewingPropertyItem[]>({
    view: "DATE_WITH_PROPERTY",
    status: activeTab,
  });

  return (
    <ContentWrapper className="flex h-screen w-full flex-col" bottomOffset={62}>
      <TitleHeader title="뷰잉 관리" />
      <div className="sticky top-12 z-10 bg-white">
        <SelectTab
          tabs={viewingTabs}
          activeTab={activeTab}
          onChange={tab => setActiveTab(tab as ViewingStatus)}
        />
      </div>

      <main className="flex flex-1 flex-col">
        {!isLoggedIn ? (
          <GuestLoginGuide
            type="viewing"
            description={`로그인 후 마음에 드는 매물의\n뷰잉 일정을 잡을 수 있어요`}
          />
        ) : isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <LoadingLottie />
          </div>
        ) : (
          <>
            {activeTab === "REQUESTED" && (
              <ViewingConfirmedSection data={data} />
            )}
            {activeTab === "CANCELLED" && (
              <ViewingCanceledSection data={data} />
            )}
            {activeTab === "COMPLETED" && (
              <ViewingCompletedSection data={data} />
            )}
          </>
        )}
      </main>
    </ContentWrapper>
  );
};

export default Viewing;
