import { create } from "zustand";

import { PropertyRegion } from "@/types/listingDetail";

interface ListingState {
  listingType: "SHARE" | "RENT" | null;
  setListingType: (type: "SHARE" | "RENT" | null) => void;

  addressData: PropertyRegion;
  setAddressData: (data: PropertyRegion) => void;

  photoData: string[];
  setPhotoData: (data: string[]) => void;
}

export const useListingStore = create<ListingState>(set => ({
  listingType: null,
  setListingType: type => set({ listingType: type }),

  addressData: {
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
  setAddressData: data => set({ addressData: data }),

  photoData: [],
  setPhotoData: data => set({ photoData: data }),
}));
