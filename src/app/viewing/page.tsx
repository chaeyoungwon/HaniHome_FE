"use client";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import { getUserInfo } from "@/apis/member";

import { useMyViewingList } from "@/hooks/viewing/useViewing";

import GuestLoginGuide from "@/components/common/GuestLoginGuide";
import LoadingLottie from "@/components/common/LoadingLottie";
import SelectTab from "@/components/common/SelectTab";
import ContentWrapper from "@/components/layout/ContentWrapper";
import TitleHeader from "@/components/layout/header/TitleHeader";
import ViewingCanceledSection from "@/components/viewings/ViewingCanceledSection";
import ViewingCompletedSection from "@/components/viewings/ViewingCompletedSection";
import ViewingConfirmedSection from "@/components/viewings/ViewingConfirmedSection";

import { viewingTabs } from "@/constants/viewing-tabs";

import { ViewingCardItem, ViewingStatus } from "@/types/viewing";

const Viewing = () => {
  const { isLoggedIn, memberId } = useAuthStore();

  const [activeTab, setActiveTab] = useState<ViewingStatus>("REQUESTED");
  const { data = [], isLoading } = useMyViewingList<ViewingCardItem[]>({
    view: "DEFAULT",
  });

  const [nicknameMap, setNicknameMap] = useState<Record<number, string>>({});

  useEffect(() => {
    if (data.length === 0) return;

    const ids = Array.from(new Set(data.flatMap(v => [v.hostId, v.guestId])));

    Promise.all(ids.map(id => getUserInfo(id))).then(resList => {
      const map = resList.reduce(
        (acc, cur) => {
          acc[cur.id] = cur.nickname ?? "알 수 없음";
          return acc;
        },
        {} as Record<number, string>,
      );
      setNicknameMap(map);
    });
  }, [data]);

  const filtered = data.filter(v => v.status === activeTab);
  const withUserType: ViewingCardItem[] = filtered.map(v => {
    const isGuest = Number(memberId) === v.guestId;
    return {
      ...v,
      userType: isGuest ? "guest" : "host",
      nickname: isGuest
        ? nicknameMap[v.hostId] || "호스트 닉네임 없음"
        : nicknameMap[v.guestId] || "게스트 닉네임 없음",
    };
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
        ) : isLoading || Object.keys(nicknameMap).length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <LoadingLottie />
          </div>
        ) : activeTab === "REQUESTED" ? (
          <ViewingConfirmedSection
            data={withUserType}
            memberId={Number(memberId)}
          />
        ) : activeTab === "CANCELLED" ? (
          <ViewingCanceledSection data={withUserType} />
        ) : (
          <ViewingCompletedSection data={withUserType} />
        )}
      </main>
    </ContentWrapper>
  );
};

export default Viewing;
