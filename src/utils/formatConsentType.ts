import { CONSENT_TYPE_MAP } from "@/constants/consent-options";

export const formatConsents = (agreedIds: number[]) => {
  return Object.entries(CONSENT_TYPE_MAP).map(([id, type]) => ({
    type,
    agreed: agreedIds.includes(Number(id)),
  }));
};
