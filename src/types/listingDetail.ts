export type ListingType = "렌트" | "쉐어";

interface CommonListingFields {
  id: string;
  type: ListingType;
  parking: string;
  furniture: string[];
  hostDescription: string;
  tags: string[];
}

export interface RentListingDetail extends CommonListingFields {
  type: "렌트";
  residentCount: number;
  isBrokered: boolean;
  roomCount: number;
  bathroomCount: number;
  totalFloors: number;
  currentFloor: number;
  hasYard: boolean;
  hasBalcony: boolean;
  direction: string;
}

export interface ShareListingDetail extends CommonListingFields {
  type: "쉐어";
  shareCount: number;
  totalFloors: number;
  floorLocation: string;
}

export type ListingDetail = RentListingDetail | ShareListingDetail;
