import ExploreCatalogLayout from "@/components/common/ExploreCatalogLayout";
import SeriesCard from "@/components/series/SeriesCard";
import {
  useGetOtherSeriesCategoryMutation,
  useSearchShowsMutation,
} from "@/lib/apis/movies-apis";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

const ExploreSeriesScreen = () => {
  const { category: categoryParam, title: titleParam } = useLocalSearchParams<{
    category?: string | string[];
    title?: string | string[];
  }>();
  const category = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;
  const title = Array.isArray(titleParam) ? titleParam[0] : titleParam;
  const activeCategory = category || "popular";
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [getCategory, categoryState] = useGetOtherSeriesCategoryMutation();
  const [searchSeries, searchState] = useSearchShowsMutation();
  const searchQuery = searchText.trim();
  const isSearchMode = searchQuery.length > 0;

  useEffect(() => {
    if (isSearchMode) return;
    getCategory({ category: activeCategory, page: currentPage });
  }, [activeCategory, currentPage, getCategory, isSearchMode]);

  useEffect(() => {
    if (searchQuery.length < 2) return;
    const timer = setTimeout(() => {
      searchSeries({ searchQuery, currentPage });
    }, 350);
    return () => clearTimeout(timer);
  }, [currentPage, searchQuery, searchSeries]);

  const isCurrentSearch =
    searchState.originalArgs?.searchQuery === searchQuery &&
    searchState.originalArgs?.currentPage === currentPage &&
    !searchState.isLoading;
  const isCurrentCategory =
    categoryState.originalArgs?.category === activeCategory &&
    categoryState.originalArgs?.page === currentPage &&
    !categoryState.isLoading;
  const results = isSearchMode
    ? isCurrentSearch
      ? (searchState.data?.results ?? [])
      : []
    : isCurrentCategory
      ? (categoryState.data?.results ?? [])
      : [];
  const response = isSearchMode
    ? isCurrentSearch
      ? searchState.data
      : undefined
    : isCurrentCategory
      ? categoryState.data
      : undefined;
  const isLoading = isSearchMode
    ? searchQuery.length >= 2 && (!isCurrentSearch || searchState.isLoading)
    : !isCurrentCategory || categoryState.isLoading;
  const hasError = isSearchMode
    ? isCurrentSearch && searchState.isError
    : isCurrentCategory && categoryState.isError;
  const totalPages = response?.total_pages ?? 1;

  const updateSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  return (
    <>
      <Stack.Screen
        options={{ title: `${title || "Discover"} Series`, animation: "slide_from_right" }}
      />
      <ExploreCatalogLayout
        title="Series"
        eyebrow="WORLDS WORTH GETTING LOST IN"
        description="Meet the characters you love, follow every twist, and always have another episode waiting."
        accent="#b99aff"
        searchPlaceholder="Find your next series"
        searchValue={searchText}
        onSearchChange={updateSearch}
        suggestions={["Drama", "Crime", "Fantasy", "Sci-fi"]}
        resultCount={response?.total_results ?? results.length}
        currentPage={currentPage}
        totalPages={totalPages}
        isSearching={isSearchMode && searchQuery.length >= 2 && isLoading}
        isLoadingCategory={!isSearchMode && isLoading}
        hasError={hasError}
        isSearchMode={isSearchMode}
        onPreviousPage={() => setCurrentPage((page) => Math.max(1, page - 1))}
        onNextPage={() =>
          setCurrentPage((page) => Math.min(totalPages, page + 1))
        }
      >
        {results.map((item: any) => (
          <SeriesCard
            title={item?.original_name || item?.name}
            poster_image={item?.poster_path}
            rating={item?.vote_average}
            release_date={item?.first_air_date}
            movieId={item?.id}
            key={item.id}
          />
        ))}
      </ExploreCatalogLayout>
    </>
  );
};

export default ExploreSeriesScreen;
