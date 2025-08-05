import {
  PropertyDetail,
  RentProperty,
  ShareProperty,
} from "@/types/listingDetailGet.type";
import {
  RentPropertyDetail,
  SharePropertyDetail,
} from "@/types/listingDetailPost.type";

export default function toPostPropertyDetail(
  getProperty: PropertyDetail,
): SharePropertyDetail | RentPropertyDetail {
  const base = {
    memberId: getProperty.memberId,
    kind: getProperty.kind,
    genderPreference: getProperty.genderPreference,
    lgbtAvailable: getProperty.lgbtAvailable,
    region: getProperty.region,
    photoUrls: getProperty.photoUrls,
    thumbnailUrl: getProperty.thumbnailUrl,
    costDetails: getProperty.costDetails,
    optionItemIds: getProperty.optionItems.map(item => item.optionItemId),
    livingConditions: getProperty.livingConditions,
    moveInInfo: getProperty.moveInInfo,
    meetingDateFrom: "",
    meetingDateTo: "",
    timeSlots: [],
    viewingAlwaysAvailable: false,
    description: getProperty.description,
  };

  if (getProperty.kind === "SHARE") {
    return {
      ...base,
      jsonDiscriminator: "SHARE",
      sharePropertySubType: (getProperty as ShareProperty).sharePropertySubType,
      capacityShare: (getProperty as ShareProperty).capacityShare,
      internalDetails: (getProperty as ShareProperty).internalDetails,
      
    };
  } else {
    return {
      ...base,
      jsonDiscriminator: "RENT",
      rentPropertySubType: (getProperty as RentProperty).rentPropertySubType,
      capacityRent: (getProperty as RentProperty).capacityRent,
      internalDetails: (getProperty as RentProperty).internalDetails,
    };
  }
}
