"use client";

import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { usePropertyDetailEditList, usePatchProperty } from "@/hooks/property/useProperty";

import toPostPropertyDetail from "@/utils/toPostPropertyDetail";

import BottomActionBar from "@/components/common/BottomActionBar";
import BackHeader from "@/components/layout/header/BackHeader";
import FunnelStepMenu from "@/components/listings/create/common/FunnelStepMenu";
import CostDetailField from "@/components/listings/create/contractTerms/CostDetailField";

import { CATEGORY_OPTIONS } from "@/constants/property-category";
import { COMMON_CONTRACT_TERMS } from "@/constants/question-map";

import { CostDetails } from "@/types/listingDetailPost";

import DownArrow from "@/public/svgs/common/down-arrow.svg";

const ContractTermsEdit = () => {
  const fixedKey = "contractTerms";

  const params = useParams();
  const id = params.id as string;
  const { data } = usePropertyDetailEditList(id ?? "");

  const [costDetails, setCostDetails] = useState<CostDetails>({
    weeklyCost: 0,
    billIncluded: false,
    costDescription: "",
    deposit: 0,
    keyDeposit: 0,
    depositAdjustable: false,
  });

  const [optionItemIds, setOptionItemIds] = useState<number[]>([]);

  useEffect(() => {
    if (data) {
      const parsed = toPostPropertyDetail(data);
      setCostDetails(parsed.costDetails);
      setOptionItemIds(parsed.optionItemIds ?? []);
    }
  }, [data]);

  const formatValue = () => {
    const val = costDetails;
    const parts = [];

    if (val.weeklyCost && val.weeklyCost > 0) {
      if (val.billIncluded) {
        parts.push(`빌 포함 주 ${val.weeklyCost}$`);
      } else {
        parts.push(`주 ${val.weeklyCost}$`);
      }
    }
    if (val.deposit && val.deposit > 0) parts.push(`디파짓 ${val.deposit}$`);
    if (val.keyDeposit && val.keyDeposit > 0)
      parts.push(`키 디파짓 ${val.keyDeposit}$`);

    return parts.join(", ");
  };
  const router = useRouter();

  const INCLUDED_OPTION_IDS = CATEGORY_OPTIONS[4];

  const { mutate: patchProperty } = usePatchProperty(Number(id));

  const handleSave = () => {
    const includedOptionIds = new Set<number>(
      INCLUDED_OPTION_IDS.items.map(item => item.optionId),
    );

    //기존 optionItemIds 중 included 항목만 제거
    const filteredOptionItemIds = optionItemIds.filter(
      id => !includedOptionIds.has(id),
    );

    //현재 상태의 included optionItemIds만 다시 추가
    const finalOptionItemIds = [
      ...filteredOptionItemIds,
      ...optionItemIds.filter(id => includedOptionIds.has(id)),
    ];
    const jsonDiscriminator = data?.kind;

    const payload = {
      jsonDiscriminator,
      costDetails,
      optionItemIds: finalOptionItemIds,
    };

    patchProperty(payload, {
      onSuccess: () => {
        router.push(`/listings/${id}/edit`);
      },
    });
  };

  return (
    <div className="pb-[70px]">
      <BackHeader />
      <FunnelStepMenu fixedKey={fixedKey} />
      <div className="flex h-19 w-[375px] cursor-pointer items-start justify-between p-4">
        <div className="flex flex-col">
          <div className="text-heading3 text-gray-900">
            {COMMON_CONTRACT_TERMS[0].label}
          </div>
          <div className="text-cap1-med text-gray-500">{formatValue()}</div>
        </div>
        <DownArrow className="h-6 w-6 rotate-180 text-gray-900" />
      </div>
      <CostDetailField
        value={costDetails}
        optionItemIds={optionItemIds}
        onCostDetailsChange={setCostDetails}
        onOptionItemIdsChange={setOptionItemIds}
      />
      <BottomActionBar label="저장" onClick={handleSave} />
    </div>
  );
};
export default ContractTermsEdit;
