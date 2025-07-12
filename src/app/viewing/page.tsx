"use client";

import { useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import GuestLoginGuide from "@/components/common/GuestLoginGuide";
import SelectTab from "@/components/common/SelectTab";
import ContentWrapper from "@/components/layout/ContentWrapper";
import TitleHeader from "@/components/layout/header/TitleHeader";
import ViewingCanceledSection from "@/components/viewings/ViewingCanceledSection";
import ViewingCompletedSection from "@/components/viewings/ViewingCompletedSection";
import ViewingConfirmedSection from "@/components/viewings/ViewingConfirmedSection";

import { mockViewings } from "@/constants/mock/my-viewing-dummies";
import { viewingTabs } from "@/constants/viewing-tabs";

import { ViewingCardItem } from "@/types/viewing";

const Viewing = () => {
  const { isLoggedIn } = useAuthStore();
  const currentUserId = 1;
  const [activeTab, setActiveTab] = useState("requested");

  const withUserType: ViewingCardItem[] = mockViewings.map(v => ({
    ...v,
    userType: v.memberId === currentUserId ? "guest" : "host",
  }));

  const requested = withUserType.filter(v => v.status === "REQUESTED");
  const canceled = withUserType.filter(v => v.status === "CANCELLED");
  const completed = withUserType.filter(v => v.status === "COMPLETED");

  return (
    <ContentWrapper className="flex h-screen w-full flex-col" bottomOffset={62}>
      <TitleHeader title="뷰잉 관리" />
      <SelectTab
        tabs={viewingTabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <main className="flex flex-1 flex-col">
        {!isLoggedIn ? (
          <GuestLoginGuide
            type="viewing"
            description={`로그인 후 마음에 드는 매물의\n뷰잉 일정을 잡을 수 있어요`}
          />
        ) : activeTab === "requested" ? (
          <ViewingConfirmedSection
            data={requested}
            currentUserId={currentUserId}
          />
        ) : activeTab === "canceled" ? (
          <ViewingCanceledSection data={canceled} />
        ) : (
          <ViewingCompletedSection data={completed} />
        )}
      </main>
    </ContentWrapper>
  );
};

export default Viewing;
