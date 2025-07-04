import { useState } from "react";

import Accordion from "@/components/common/Accordion";

import { checklistTerms } from "@/constants/viewing-checklist-terms";

const ViewingChecklistSection = () => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setCheckedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="pb-37">
      {checklistTerms.map((section, idx) => (
        <Accordion
          key={section.title}
          title={section.title}
          items={section.items}
          checked={checkedItems}
          onToggle={toggleItem}
          mode="checklist"
          isLast={idx === checklistTerms.length - 1}
        />
      ))}
    </div>
  );
};

export default ViewingChecklistSection;
