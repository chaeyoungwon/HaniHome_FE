import { useState } from "react";

import clsx from "clsx";

import { listingDetailTabs } from "@/constants/listing-detail-tabs";

import { Property } from "@/types/property";

interface DetailTabsProps {
  listingId: string;
  data: Property;
}

const DetailTabs = ({ listingId, data }: DetailTabsProps) => {
  const [activeKey, setActiveKey] =
    useState<(typeof listingDetailTabs)[number]["key"]>("detail");

  const activeTab = listingDetailTabs.find(tab => tab.key === activeKey);
  const ActiveComponent = activeTab?.Component;

  return (
    <>
      <div className="flex w-full border-b border-gray-200">
        {listingDetailTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveKey(tab.key)}
            className={clsx(
              "text-body1-sb w-1/3 cursor-pointer p-[10px] text-center",
              activeKey === tab.key
                ? "border-b border-gray-900 text-gray-900"
                : "text-gray-400",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {ActiveComponent && (
          <ActiveComponent listingId={listingId} data={data} />
        )}
      </div>
    </>
  );
};

export default DetailTabs;
