export interface ListingCardProps {
  image: string;
  price: string;
  status: string;
  area: string;
  floor: string;
  type: string;
  options: string;
  distance: string;
  location: string;
  timeAgo: string;
  likes: number;
  isLiked: boolean;
  onToggleLike: () => void;
  onClick?: () => void;
}
