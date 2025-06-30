import { useState } from "react";

import CheckIcon from "@/components/common/CheckIcon";

import Arrow from "@/public/svgs/common/left-arrow.svg";

import Divider from "./Divider";

interface AccordionProps {
  title: string;
  items: {
    id: number;
    label: string;
  }[];
  checked: number[];
  onToggle: (id: number) => void;
  isLast?: boolean;
}

const Accordion = ({
  title,
  items,
  checked,
  onToggle,
  isLast = false,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <button
        className="flex w-full cursor-pointer items-center justify-between p-4 text-left"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span
          className={`text-heading3 ${isOpen ? "text-gray-900" : "text-gray-500"}`}
        >
          {title}
        </span>

        <Arrow
          className={`${
            isOpen ? "rotate-90 text-gray-900" : "-rotate-90 text-gray-500"
          }`}
        />
      </button>

      {isOpen && (
        <ul className="bg-gray-0 space-y-4 px-4 py-6">
          {items.map(item => (
            <li key={item.id} className="flex items-center gap-1">
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
      {(!isLast || !isOpen) && (
        <Divider className={isLast ? "mt-3 mb-1" : "my-3"} />
      )}
    </section>
  );
};

export default Accordion;
