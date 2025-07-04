import { useState } from "react";

import CheckIcon from "@/components/common/CheckIcon";

import Arrow from "@/public/svgs/common/left-arrow.svg";

import Divider from "./Divider";

interface AccordionProps {
  title: string;
  content?: string;
  items?: {
    id: number;
    label: string;
  }[];
  checked?: number[];
  onToggle?: (id: number) => void;
  mode: "faq" | "checklist";
  isLast?: boolean;
  isOpen?: boolean; // 외부 제어
  onClickToggle?: () => void; // 외부 제어
}

const Accordion = ({
  title,
  content,
  items,
  checked,
  onToggle,
  mode,
  isLast = false,
  isOpen: controlledIsOpen,
  onClickToggle,
}: AccordionProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalOpen;

  const toggle = () => {
    if (isControlled) {
      onClickToggle?.(); // 외부 제어일 때만 이거 호출
    } else {
      setInternalOpen(prev => !prev); // 내부 제어
    }
  };

  return (
    <section>
      <button
        className="flex w-full cursor-pointer items-start justify-between p-4 text-left"
        onClick={toggle}
      >
        <div className="flex flex-col">
          <span
            className={`text-heading3 ${isOpen ? "text-gray-900" : "text-gray-500"}`}
          >
            {title}
          </span>
          {mode === "faq" && isOpen && (
            <span className="text-cap1-med mt-1 text-gray-400">답변 내용</span>
          )}
        </div>

        <Arrow
          className={`h-6 w-6 ${
            isOpen ? "rotate-90 text-gray-900" : "-rotate-90 text-gray-500"
          }`}
        />
      </button>

      {isOpen && (
        <div className="bg-gray-0 px-4 py-6">
          {mode === "faq" &&
            content &&
            (content.trim().match(/^1\.\s+/m) ? (
              <ol className="text-body2-med list-decimal pl-[22px] leading-[150%] text-gray-700">
                {content.split("\n").map((line, idx) => (
                  <li key={idx}>{line.replace(/^\d+\.\s*/, "")}</li>
                ))}
              </ol>
            ) : (
              <p className="text-body2-med whitespace-pre-line text-gray-700">
                {content}
              </p>
            ))}
          {mode === "checklist" && items?.length && checked && onToggle && (
            <ul className="space-y-4">
              {items.map(item => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onToggle(item.id)}
                    className="flex items-center gap-2"
                  >
                    <CheckIcon checked={checked.includes(item.id)} />
                    <span className="text-body2-med text-gray-700">
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {!(mode === "faq" && isLast) && (!isLast || !isOpen) && (
        <Divider className={isLast ? "mt-3 mb-1" : "my-3"} />
      )}
    </section>
  );
};

export default Accordion;
