import { useListingStore } from "@/stores/useListingStore";

import BackHeader from "@/components/layout/header/BackHeader";

import RentIcon from "@/public/svgs/listings/rent-icon.svg";
import ShareIcon from "@/public/svgs/listings/share-icon.svg";

interface ListingTypeProps {
  onSelectType: (type: "SHARE" | "RENT") => void;
  variant?: "create" | "edit";
}
const ListingType = ({
  onSelectType,
  variant = "create",
}: ListingTypeProps) => {
  const { listingType, setListingType } = useListingStore();
  const handleClick = (type: "SHARE" | "RENT") => {
    setListingType(type);
    onSelectType(type);
  };

  return (
    <>
      <BackHeader />
      <div className="py-9">
        <div className="gray-900 text-heading2 px-4 py-3">
          {variant == "create" ? (
            <>
              반가워요!
              <br /> 어떤 매물을 내놓을까요?
            </>
          ) : (
            <>어떤 매물을 내놓을까요?</>
          )}
        </div>
        <div className="flex items-center justify-center gap-6 px-4 py-8">
          {/*쉐어 */}
          <div
            onClick={() => handleClick("SHARE")}
            className={`group hover:bg-mint-light hover:text-mint hover:border-mint flex h-[140px] w-[140px] cursor-pointer flex-col gap-4 rounded-[4px] border ${
              listingType === "SHARE"
                ? "bg-mint-light border-mint text-mint"
                : "border-gray-400 text-gray-800"
            } px-9 py-5`}
          >
            <ShareIcon />
            <div className="text-body1-sb group-hover:text-mint flex items-center justify-center">
              쉐어
            </div>
          </div>
          {/*렌트 */}
          <div
            onClick={() => handleClick("RENT")}
            className={`group hover:bg-mint-light hover:text-mint hover:border-mint flex h-[140px] w-[140px] cursor-pointer flex-col gap-4 rounded-[4px] border ${listingType === "RENT" ? "bg-mint-light border-mint text-mint" : "border-gray-400 text-gray-800"} px-9 py-5`}
          >
            <RentIcon />
            <div className="group-hover:text-mint text-body1-sb flex items-center justify-center">
              렌트
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListingType;
