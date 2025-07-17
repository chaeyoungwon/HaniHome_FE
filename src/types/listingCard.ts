import { NearestStation } from "./property";

export interface ListingCardProps {
  id: number;
  kind:string;
  thumbnailUrl: string | null;
  weeklyCost: number;
  tradeStatus: string;
  internalArea?: number;
  totalFloors?: number;
  nearestStation:NearestStation;
  billIncluded: boolean;
  suburb: string;
  createdAt: string;
  wishCount: number;
  isLiked: boolean;
  onToggleLike: () => void;
  onClick?: () => void;
  heartColor?: string;
}
