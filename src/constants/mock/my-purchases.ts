import { ListingCardProps } from "@/types/listingCard";

export const myPurchases: ListingCardProps[] = [
  {
    id: 4,
    thumbnailUrl: "/svgs/common/room-img.svg",
    weeklyCost: 100.0,
    tradeStatus: "BEFORE",
    internalArea: 30,
    totalFloors: 4,
    kind: "SHARE",
    nearestStation: { distanceFromStation: 10, metroStopId: 62, name: "dd" },

    billIncluded: true,
    suburb: "chatswood",
    createdAt: "2025-07-12T06:51:31.915Z",
    wishCount: 234,
    isLiked: false,
    onToggleLike: () => {},
    onClick: () => {},
    heartColor: "text-gray",
  },
  {
    id: 5,
    thumbnailUrl: "/svgs/common/room-img.svg",
    weeklyCost: 100.0,
    tradeStatus: "BEFORE",
    internalArea: 28,
    totalFloors: 3,
    kind: "SHARE",
    nearestStation: { distanceFromStation: 10, metroStopId: 62, name: "dd" },

    billIncluded: true,
    suburb: "chatswood",
    createdAt: "2025-07-12T06:51:31.915Z",
    wishCount: 234,
    isLiked: false,
    onToggleLike: () => {},
    onClick: () => {},
    heartColor: "text-gray",
  },
];
