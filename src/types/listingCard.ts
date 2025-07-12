export interface ListingCardProps {
  image: string;
  id: number;
  price: number;
  status?: string;
  area?: number;
  floor?: number;
  type: string;
  billIncluded: boolean;
  distance: string;
  location: string;
  timeAgo: string;
  likes: number;
  isLiked: boolean;
  onToggleLike: () => void;
  onClick?: () => void;
  heartColor?: string;
}
