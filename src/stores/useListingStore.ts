import { create } from "zustand";

import {
  CapacityRent,
  CapacityShare,
  CostDetails,
  GenderPreference,
  LivingConditions,
  MoveInInfo,
  PropertyRegion,
  RentInternalDetails,
  RentPropertySubType,
  ShareInternalDetails,
  SharePropertySubType,
  TimeSlot,
} from "@/types/listingDetailPost.type";

interface ListingState {
  listingType: "SHARE" | "RENT" | null;
  setListingType: (type: "SHARE" | "RENT" | null) => void;

  region: PropertyRegion;
  setRegion: (data: PropertyRegion) => void;

  photoUrls: string[];
  setPhotoUrls: (data: string[]) => void;

  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;

  rentPropertyType: RentPropertySubType | null;
  setRentPropertyType: (data: RentPropertySubType | null) => void;

  sharePropertyType: SharePropertySubType | null;
  setSharePropertyType: (data: SharePropertySubType | null) => void;

  rentCapacityPeople: CapacityRent | null;
  setRentCapacityPeople: (data: CapacityRent | null) => void;

  shareCapacityPeople: CapacityShare | null;
  setShareCapacityPeople: (data: CapacityShare | null) => void;

  rentInternalDetails: RentInternalDetails | null;
  setRentInternalDetails: (data: RentInternalDetails | null) => void;

  shareInternalDetails: ShareInternalDetails | null;
  setShareInternalDetails: (data: ShareInternalDetails | null) => void;

  costDetails: CostDetails;
  setCostDetails: <K extends keyof CostDetails>(
    key: K,
    value: CostDetails[K],
  ) => void;
  setAllCostDetails: (value: CostDetails) => void;

  optionItemIds: number[];
  setOptionItemIds: (ids: number[]) => void;

  timeSlots: TimeSlot[];
  setTimeSlots: (data: TimeSlot[]) => void;

  meetingDateFrom: string | null;
  meetingDateTo: string | null;
  setMeetingDateRange: (from: string | null, to: string | null) => void;

  viewingAlwaysAvailable: boolean;
  setViewingAlwaysAvailable: (value: boolean) => void;

  description: string;
  setDescription: (data: string) => void;

  genderPreference: GenderPreference | null;
  setGenderPreference: (value: GenderPreference | null) => void;

  lgbtAvailable: boolean;
  setLgbtAvailable: (value: boolean) => void;

  moveInInfo: MoveInInfo;
  setMoveInInfo: (value: MoveInInfo) => void;

  livingConditions: LivingConditions | null;
  setLivingConditions: (value: LivingConditions | null) => void;

  isSquareMeter: boolean;
  setIsSquareMeter: (value: boolean) => void;

  reset: () => void;
}

const initialState = {
  listingType: null,
  region: {
    country: "",
    postCode: "",
    state: "",
    suburb: "",
    streetName: "",
    streetNumber: "",
    unit: "",
    buildingName: "",
    longitude: 0,
    latitude: 0,
  },
  photoUrls: [],
  searchKeyword: "",
  rentPropertyType: null,
  sharePropertyType: null,
  rentCapacityPeople: null,
  shareCapacityPeople: null,
  rentInternalDetails: {
    internalArea: null,
    totalArea: null,
    totalFloors: null,
    propertyFloor: null,
    numberOfRoom: null,
    numberOfBath: null,
    yardIncluded: false,
    verandaIncluded: false,
  },
  shareInternalDetails: {
    internalArea: null,
    totalArea: null,
    totalFloors: null,
    propertyFloor: null,
    totalResidents: null,
    totalBathUser: null,
    withPropertyOwner: false,
  },
  costDetails: {
    weeklyCost: 0,
    costDescription: "",
    deposit: 0,
    keyDeposit: 0,
    depositAdjustable: false,
    billIncluded: false,
  },
  optionItemIds: [],
  timeSlots: [
    { timeFrom: null, timeTo: null },
    { timeFrom: null, timeTo: null },
    { timeFrom: null, timeTo: null },
  ],
  meetingDateFrom: null,
  meetingDateTo: null,
  viewingAlwaysAvailable: false,
  description: "",
  genderPreference: null,
  lgbtAvailable: false,
  moveInInfo: {
    availableFrom: "",
    availableTo: "",
    immediate: false,
    negotiable: false,
  },
  livingConditions: null,
  isSquareMeter: false,
};

export const useListingStore = create<ListingState>()(set => ({
  ...initialState,

  reset: () => set(initialState),

  setListingType: type => set({ listingType: type }),
  setRegion: data => set({ region: data }),
  setPhotoUrls: data => set({ photoUrls: data }),
  setSearchKeyword: keyword => set({ searchKeyword: keyword }),
  setRentPropertyType: data => set({ rentPropertyType: data }),
  setSharePropertyType: data => set({ sharePropertyType: data }),
  setRentCapacityPeople: data => set({ rentCapacityPeople: data }),
  setShareCapacityPeople: data => set({ shareCapacityPeople: data }),
  setRentInternalDetails: data => set({ rentInternalDetails: data }),
  setShareInternalDetails: data => set({ shareInternalDetails: data }),

  setCostDetails: (key, value) =>
    set(state => ({
      costDetails: {
        ...state.costDetails,
        [key]: value,
      },
    })),
  setAllCostDetails: value => set({ costDetails: value }),

  setOptionItemIds: ids => set({ optionItemIds: ids }),
  setTimeSlots: data => set({ timeSlots: data }),
  setMeetingDateRange: (from, to) =>
    set({ meetingDateFrom: from, meetingDateTo: to }),
  setViewingAlwaysAvailable: value => set({ viewingAlwaysAvailable: value }),
  setDescription: data => set({ description: data }),
  setGenderPreference: value => set({ genderPreference: value }),
  setLgbtAvailable: value => set({ lgbtAvailable: value }),
  setMoveInInfo: value => set({ moveInInfo: value }),
  setLivingConditions: value => set({ livingConditions: value }),
  setIsSquareMeter: value => set({ isSquareMeter: value }),
}));

export type UseListingStoreReturn = ReturnType<typeof useListingStore.getState>;
