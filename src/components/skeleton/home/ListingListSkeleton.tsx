import ListingCardSkeleton from "./ListingCardSkeleton";

const ListingListSkeleton = () => {
  return (
    <div className="flex flex-1 flex-col">
      {[...Array(5)].map((_, i) => (
        <ListingCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default ListingListSkeleton;
