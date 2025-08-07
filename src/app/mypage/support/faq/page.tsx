"use client";

import { useState } from "react";

import Accordion from "@/components/common/Accordion";
import SelectableChip from "@/components/common/SelectableChip";
import BackHeader from "@/components/layout/header/BackHeader";

import { faqData } from "@/constants/faq-data";

type CategoryType = "서비스 이용" | "뷰잉";

const FaqPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "서비스 이용" | "뷰잉"
  >("서비스 이용");

  const [openMap, setOpenMap] = useState<Record<CategoryType, Set<number>>>({
    "서비스 이용": new Set(),
    뷰잉: new Set(),
  });
  const faqs = faqData[selectedCategory];

  const handleToggle = (idx: number) => {
    setOpenMap(prev => {
      const newSet = new Set(prev[selectedCategory]);
      newSet.has(idx) ? newSet.delete(idx) : newSet.add(idx);
      return {
        ...prev,
        [selectedCategory]: newSet,
      };
    });
  };

  return (
    <div className="w-full max-w-[430px] pb-15">
      <BackHeader />
      <div className="flex gap-2 px-4 pt-4 pb-2">
        {(["서비스 이용", "뷰잉"] as const).map(category => (
          <SelectableChip
            key={category}
            label={category}
            selected={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </div>

      {faqs.map((faq, idx) => (
        <Accordion
          key={idx}
          title={faq.title}
          content={faq.content}
          mode="faq"
          isLast={idx === faqs.length - 1}
          isOpen={openMap[selectedCategory]?.has(idx)}
          onClickToggle={() => handleToggle(idx)}
        />
      ))}
    </div>
  );
};

export default FaqPage;
