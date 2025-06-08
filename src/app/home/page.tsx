import CategoryHeader from "@/components/home/CategoryHeader";
import ListingList from "@/components/home/ListingList";
import LocationHeader from "@/components/home/LocationHeader";
import ViewingSection from "@/components/home/ViewingSection";
import FilterBar from "@/components/home/filterBar/FilterBar";
import MainHeader from "@/components/layout/header/MainHeader";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col pt-12 pb-16">
      <MainHeader />
      <div className="bg-gray-0 flex flex-col pt-6 pb-2">
        <CategoryHeader />
        <ViewingSection />
      </div>
      <div className="flex flex-col py-5">
        <LocationHeader />
        <FilterBar />
        <ListingList />
      </div>
    </div>
  );
};

export default Home;
