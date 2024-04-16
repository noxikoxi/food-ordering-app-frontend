import {useParams} from "react-router-dom";
import {useSearchRestaurants} from "@/api/RestaurantApi.tsx";
import SearchResultInfo from "@/components/SearchResultInfo.tsx";
import SearchResultCard from "@/components/SearchResultCard.tsx";
import {useEffect, useState} from "react";
import SearchBar, {searchForm} from "@/components/SearchBar.tsx";
import PaginationSelector from "@/components/PaginationSelector.tsx";
import CuisineFilter from "@/components/CuisineFilter.tsx";
import SortOptionDropdown from "@/components/SortOptionDropdown.tsx";

export type SearchState = {
    searchQuery: string;
    page: Number;
    selectedCuisines: string[];
    sortOption: string;
}

const SearchPage = () => {
    const {city} = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch",
    });

    const {results, isLoading} = useSearchRestaurants(searchState, city);

    useEffect( () => {
        document.title = 'Restaurants';
    }, []);

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const setSelectedCuisines = (selectedCuisines: string[]) => {
      setSearchState((prevState) => ({
          ...prevState,
          selectedCuisines,
          page: 1,
      }))
    };

    const setSortOption = (sortOption: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            page: 1,
            sortOption,
        }))
    }

    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page: page,
        }));
    };

    const setSearchQuery = (searchFormData: searchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page: 1,
        }));
    };

    const resetSearch = () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
            page: 1,
        }));
    };

    if(isLoading) {
        return <span>Loading...</span>;
    }

    if(!results?.data || !city){
        return <span>No results found</span>;
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
          <div id="cuisines-list">
              <CuisineFilter
                  selectedCuisines={searchState.selectedCuisines}
                  onChange={setSelectedCuisines}
                  isExpanded={isExpanded}
                  onExpandClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
              />
          </div>

          <div id="main-content" className="flex flex-col gap-5">
              <SearchBar
                  searchQuery={searchState.searchQuery}
                  onSubmit={setSearchQuery}
                  placeHolder="Search by Cuisine or Restaurant Name"
                  onReset={resetSearch}
              />

              <div className="flex flex-col justify-between gap-3 lg:flex-row">
                  <SearchResultInfo total={results.pagination.total} city={city}/>
                  <SortOptionDropdown
                      onChange={(value) => setSortOption(value)}
                      sortOption={searchState.sortOption}
                  />
              </div>

              {results.data.map((restaurant, index) => (
                  <SearchResultCard key={index} restaurant={restaurant}/>

              ))}
              <PaginationSelector
                  page={results.pagination.page}
                  pages={results.pagination.pages}
                  onPageChange={setPage}
              />
          </div>
      </div>
    );
}

export default SearchPage;