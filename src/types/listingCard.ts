export interface ListingCardProps {
  id: number;
  thumbnailUrl: string | null;
  weeklyCost: number;
  tradeStatus: string;
  internalArea?: number;
  totalFloors?: number;
  propertySubType: string;
  billIncluded: boolean;
  suburb: string;
  createdAt: string;
  wishCount: number;
  isLiked: boolean;
  onToggleLike: () => void;
  onClick?: () => void;
  heartColor?: string;
}
