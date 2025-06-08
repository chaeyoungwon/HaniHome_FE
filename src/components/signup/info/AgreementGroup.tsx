import clsx from "clsx";

import { AgreementTerm } from "@/constants/agreement-terms";

import DownArrow from "@/public/svgs/signup/down-arrow.svg";

import AgreementItem from "./AgreementItem";
import CheckIcon from "./CheckIcon";

interface AgreementGroupProps {
  title: string;
  terms: typeof AgreementTerm;
  isChecked: boolean;
  isOpen: boolean;
  onToggleOpen: () => void;
  onToggleGroup: () => void;
  gap?: string;
}

const AgreementGroup = ({
  title,
  terms,
  isChecked,
  isOpen,
  onToggleOpen,
  onToggleGroup,
  gap,
}: AgreementGroupProps) => {
  return (
    <>
      <div className="mt-3 flex items-center justify-between">
        <button
          onClick={onToggleGroup}
          className="text-cap1-med flex cursor-pointer items-center gap-1 text-gray-700"
        >
          <CheckIcon checked={isChecked} />
          {title}
        </button>
        <button
          onClick={onToggleOpen}
          className={clsx("cursor-pointer", isOpen && "rotate-180")}
        >
          <DownArrow className="h-[18px] w-[18px] object-contain text-gray-700" />
        </button>
      </div>

      {isOpen && (
        <div className={clsx("mt-3 flex flex-col", gap)}>
          {terms.map(term => (
            <AgreementItem
              key={term.id}
              id={term.id}
              link={term.link}
              label={term.label}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AgreementGroup;
