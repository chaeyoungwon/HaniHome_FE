import AddListingFab from "@/components/home/AddListingFab";
import CategoryHeader from "@/components/home/CategoryHeader";
import ListingList from "@/components/home/ListingList";
import LocationHeader from "@/components/home/LocationHeader";
import ViewingSection from "@/components/home/ViewingSection";
import FilterBar from "@/components/home/filterBar/FilterBar";
import ContentWrapper from "@/components/layout/ContentWrapper";
import MainHeader from "@/components/layout/header/MainHeader";

const Home = () => {
  return (
    <ContentWrapper className="bg-gray-0">
      <MainHeader />
      <div className="bg-gray-0 flex flex-col pt-6 pb-2">
        <CategoryHeader />
        <ViewingSection />
      </div>
      <div className="flex flex-col bg-white py-5">
        <LocationHeader />
        <FilterBar />
        <ListingList />
      </div>
      <AddListingFab />
    </ContentWrapper>
  );
};

export default Home;
