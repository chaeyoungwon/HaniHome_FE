"use client";

import { useEffect } from "react";

import { useListingStore } from "@/stores/useListingStore";

import { useFunnel } from "@/hooks/common/useFunnel";

import Funnel from "@/components/common/Funnel/Funnel";
import AddressPhoto from "@/components/listings/create/addressPhoto/AddressPhoto";
import ContractTerms from "@/components/listings/create/contractTerms/ContractTermsLayout";
import CreateConfirm from "@/components/listings/create/createConfirm/CreateConfirm";
import CreateSuccess from "@/components/listings/create/createSuccess/CreateSuccess";
import ListingDescription from "@/components/listings/create/listingDescription/ListingDescription";
import ListingDetails from "@/components/listings/create/listingDetails/ListingDetailsLayout";
import ListingType from "@/components/listings/create/listingType/ListingType";
import MovingCondition from "@/components/listings/create/movingConditions/MovingConditionLayout";

import { FUNNEL_FLOW } from "@/constants/funnel-steps";

const ListingCreateClient = () => {
  const { step, subStep, onNextStep, onPrevStep } = useFunnel({
    steps: FUNNEL_FLOW,
  });

  const { setListingType } = useListingStore();

  const reset = useListingStore(state => state.reset);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <Funnel step={step}>
      <Funnel.Step name="ListingType">
        <ListingType
          onSelectType={type => {
            setListingType(type);
            onNextStep();
          }}
        />
      </Funnel.Step>

      <Funnel.Step name="AddressPhoto">
        <AddressPhoto
          subStep={subStep === "address" ? "address" : "photo"}
          onNext={onNextStep}
          onPrev={onPrevStep}
        />
      </Funnel.Step>

      <Funnel.Step name="ListingDetails">
        <ListingDetails onNext={onNextStep} onPrev={onPrevStep} />
      </Funnel.Step>

      <Funnel.Step name="MovingConditions">
        <MovingCondition onNext={onNextStep} onPrev={onPrevStep} />
      </Funnel.Step>
      <Funnel.Step name="ContractTerms">
        <ContractTerms onNext={onNextStep} onPrev={onPrevStep} />
      </Funnel.Step>

      <Funnel.Step name="ListingDescription">
        <ListingDescription onNext={onNextStep} onPrev={onPrevStep} />
      </Funnel.Step>

      <Funnel.Step name="CreateConfirm">
        <CreateConfirm onNext={onNextStep} onPrev={onPrevStep} />
      </Funnel.Step>

      <Funnel.Step name="CreateSuccess">
        <CreateSuccess />
      </Funnel.Step>
    </Funnel>
  );
};

export default ListingCreateClient;
