"use client";

import { useState } from "react";

import ContentWrapper from "@/components/layout/ContentWrapper";
import TitleHeader from "@/components/layout/header/TitleHeader";
import SelectTab from "@/components/viewings/SelectTab";
import ViewingCanceledSection from "@/components/viewings/ViewingCanceledSection";
import ViewingCompletedSection from "@/components/viewings/ViewingCompletedSection";
import ViewingConfirmedSection from "@/components/viewings/ViewingConfirmedSection";

import { mockViewings } from "@/constants/mock/my-viewing-dummies";
import { viewingTabs } from "@/constants/viewing-tabs";

import { ViewingCardItem } from "@/types/viewing";

const Viewing = () => {
  const currentUserId = 1; // 사용자 본인 ID -> 추후 zustand에서 가져옴

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
        {activeTab === "requested" && (
          <ViewingConfirmedSection
            data={requested}
            currentUserId={currentUserId}
          />
        )}
        {activeTab === "canceled" && <ViewingCanceledSection data={canceled} />}
        {activeTab === "completed" && (
          <ViewingCompletedSection data={completed} />
        )}
      </main>
    </ContentWrapper>
  );
};

export default Viewing;
