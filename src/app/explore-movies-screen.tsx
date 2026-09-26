import ExploreCatalogLayout from "@/components/common/ExploreCatalogLayout";
import MovieCard from "@/components/movies/MovieCard";
import {
  useGetOtherMovieCategoryMutation,
  useSearchMoviesMutation,
} from "@/lib/apis/movies-apis";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";

const ExploreMoviesScreen = () => {
  const { category: categoryParam, title: titleParam } = useLocalSearchParams<{
    category?: string | string[];
    title?: string | string[];
  }>();
  const category = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;
  const title = Array.isArray(titleParam) ? titleParam[0] : titleParam;
  const activeCategory = category || "popular";
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [getCategory, categoryState] = useGetOtherMovieCategoryMutation();
  const [searchMovies, searchState] = useSearchMoviesMutation();
  const searchQuery = searchText.trim();
  const isSearchMode = searchQuery.length > 0;

  useEffect(() => {
    if (isSearchMode) return;
    getCategory({ category: activeCategory, page: currentPage });
  }, [activeCategory, currentPage, getCategory, isSearchMode]);

  useEffect(() => {
    if (searchQuery.length < 2) return;
    const timer = setTimeout(() => {
      searchMovies({ searchQuery, currentPage });
    }, 350);
    return () => clearTimeout(timer);
  }, [currentPage, searchMovies, searchQuery]);

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
        options={{ title: `${title || "Discover"} Movies`, animation: "slide_from_right" }}
      />
      <ExploreCatalogLayout
        title="Movies"
        eyebrow="THE BIG-SCREEN COLLECTION"
        description="From midnight premieres to unforgettable classics, find a story for every mood."
        accent={Colors.Primary100}
        searchPlaceholder="Search titles, stories, and more"
        searchValue={searchText}
        onSearchChange={updateSearch}
        suggestions={["Adventure", "Comedy", "Science fiction", "Mystery"]}
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
          <MovieCard
            title={item?.original_title || item?.title}
            poster_image={item?.poster_path}
            rating={item?.vote_average}
            release_date={item?.release_date}
            movieId={item?.id}
            key={item.id}
          />
        ))}
      </ExploreCatalogLayout>
    </>
  );
};

export default ExploreMoviesScreen;
