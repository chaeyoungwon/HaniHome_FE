import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { useOptionItems } from "@/hooks/optionItem/useOptionItem";
import {
  usePutViewingChecklists,
  useViewingChecklists,
} from "@/hooks/viewing/useViewing";

import { groupOptionItemsByParent } from "@/utils/listing/groupOptionItemsByParent";

import Accordion from "@/components/common/Accordion";

const ViewingChecklistSection = forwardRef(
  ({ viewingId }: { viewingId: number }, ref) => {
    const { data: checkData, isLoading: isCheckLoading } =
      useViewingChecklists(viewingId);

    const { data: optionItems } = useOptionItems("VIEWING_CAT2");
    const checklistSections = groupOptionItemsByParent(optionItems || []);
    const { mutateAsync } = usePutViewingChecklists();

    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    useEffect(() => {
      if (checkData) {
        setCheckedItems(checkData.checklistOptionItemIds);
      }
    }, [checkData]);

    const toggleItem = (id: number) => {
      setCheckedItems(prev =>
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
      );
    };

    useImperativeHandle(ref, () => ({
      handleSave: async () => {
        await mutateAsync({
          viewingId,
          allOptionItemIds: checkedItems,
        });
      },
    }));

    if (isCheckLoading || !optionItems) return <div></div>;

    return (
      <div className="pb-37">
        {checklistSections.map((section, idx) => (
          <Accordion
            key={section.title}
            title={section.title}
            items={section.items}
            checked={checkedItems}
            onToggle={toggleItem}
            mode="checklist"
            isLast={idx === checklistSections.length - 1}
          />
        ))}
      </div>
    );
  },
);

export default ViewingChecklistSection;
