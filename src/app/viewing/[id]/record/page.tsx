"use client";

import { useParams } from "next/navigation";

import { useRef, useState } from "react";

import SelectTab from "@/components/common/SelectTab";
import BackHeader from "@/components/layout/header/BackHeader";
import ViewingChecklistSection from "@/components/viewings/ViewingChecklistSection";
import ViewingNoteSection from "@/components/viewings/ViewingNoteSection";
import ViewingSaveButton from "@/components/viewings/ViewingSaveButton";

import { viewingNoteTabs } from "@/constants/viewing-tabs";

const ViewingRecordPage = () => {
  const [activeTab, setActiveTab] = useState("note");
  const params = useParams();
  const viewingId = Number(params.id);

  const noteRef = useRef<{ handleSave: () => Promise<void> }>(null);

  const handleClickSave = async () => {
    if (activeTab === "note") {
      await noteRef.current?.handleSave();
    }

    if (activeTab === "checklist") {
      // 체크리스트 저장 로직 추가
    }
  };

  return (
    <>
      <BackHeader />
      <SelectTab
        tabs={viewingNoteTabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      {activeTab === "note" && (
        <ViewingNoteSection ref={noteRef} viewingId={viewingId} />
      )}
      {activeTab === "checklist" && <ViewingChecklistSection />}
      <ViewingSaveButton onClick={handleClickSave} />
    </>
  );
};

export default ViewingRecordPage;
