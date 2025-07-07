"use client";

import { useEffect, useMemo, useState } from "react";

import { useSignupStore } from "@/stores/useSignupStore";

import CheckIcon from "@/components/common/CheckIcon";
import Divider from "@/components/common/Divider";

import { AgreementTerm } from "@/constants/agreement-terms";

import AgreementGroup from "./AgreementGroup";

interface AgreementListProps {
  onChange: (checked: number[]) => void;
  onRequiredValidChange?: (valid: boolean) => void;
}

const AgreementList = ({
  onChange,
  onRequiredValidChange,
}: AgreementListProps) => {
  const agreedIds = useSignupStore(state => state.agreed);

  const requiredTerms = useMemo(
    () => AgreementTerm.filter(t => t.required),
    [],
  );
  const optionalTerms = useMemo(
    () => AgreementTerm.filter(t => !t.required),
    [],
  );

  const [agreed, setAgreed] = useState({
    required: requiredTerms.every(term => agreedIds.includes(term.id)),
    optional: optionalTerms.every(term => agreedIds.includes(term.id)),
  });

  const [openGroup, setOpenGroup] = useState({
    required: false,
    optional: false,
  });

  const isAllChecked = agreed.required && agreed.optional;

  useEffect(() => {
    const checkedIds = [
      ...(agreed.required ? requiredTerms.map(t => t.id) : []),
      ...(agreed.optional ? optionalTerms.map(t => t.id) : []),
    ];
    onChange(checkedIds);
    onRequiredValidChange?.(agreed.required);
  }, [agreed]);

  const toggleGroup = (type: "required" | "optional" | "all") => {
    if (type === "all") {
      const next = !isAllChecked;
      setAgreed({ required: next, optional: next });
    } else {
      setAgreed(prev => ({ ...prev, [type]: !prev[type] }));
    }
  };

  return (
    <div className="flex flex-col py-8">
      {/* 전체 동의 */}
      <button
        onClick={() => toggleGroup("all")}
        className="text-cap1-med flex cursor-pointer items-center gap-1 text-gray-700"
      >
        <CheckIcon checked={isAllChecked} />만 14세 이상이며 모든 약관에
        동의합니다
      </button>

      <Divider className="mt-3" />

      <AgreementGroup
        title="필수 동의란"
        terms={requiredTerms}
        isChecked={agreed.required}
        isOpen={openGroup.required}
        onToggleOpen={() =>
          setOpenGroup(prev => ({ ...prev, required: !prev.required }))
        }
        onToggleGroup={() => toggleGroup("required")}
        gap="gap-1"
      />

      <AgreementGroup
        title="선택 동의란"
        terms={optionalTerms}
        isChecked={agreed.optional}
        isOpen={openGroup.optional}
        onToggleOpen={() =>
          setOpenGroup(prev => ({ ...prev, optional: !prev.optional }))
        }
        onToggleGroup={() => toggleGroup("optional")}
      />
    </div>
  );
};

export default AgreementList;
