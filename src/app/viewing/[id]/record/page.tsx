"use client";

import { useState } from "react";

import SelectTab from "@/components/common/SelectTab";
import BackHeader from "@/components/layout/header/BackHeader";
import ViewingChecklistSection from "@/components/viewings/ViewingChecklistSection";
import ViewingNoteSection from "@/components/viewings/ViewingNoteSection";
import ViewingSaveButton from "@/components/viewings/ViewingSaveButton";

import { viewingNoteTabs } from "@/constants/viewing-tabs";

const ViewingRecordPage = () => {
  const [activeTab, setActiveTab] = useState("note");
  return (
    <>
      <BackHeader />
      <SelectTab
        tabs={viewingNoteTabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      {activeTab === "note" && <ViewingNoteSection />}
      {activeTab === "checklist" && <ViewingChecklistSection />}
      <ViewingSaveButton />
    </>
  );
};

export default ViewingRecordPage;
