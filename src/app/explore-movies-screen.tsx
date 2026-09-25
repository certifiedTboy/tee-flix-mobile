import MovieCard from "@/components/movies/MovieCard";
import MovieList from "@/components/ui/skeletons/MovieList";
import Skeleton from "@/components/ui/skeletons/Skeleton";
import { SearchContext } from "@/lib/context/search-context";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import LoadMoreBtn from "../components/ui/LoadMoreBtn";
import { Colors } from "../constants/Colors";
import {
  useGetOtherMovieCategoryMutation,
  useSearchMoviesMutation,
} from "../lib/apis/movies-apis";

const ExploreMoviesScreen = () => {
  const [movieResults, setMovieResults] = useState<any[]>([]);
  const [searchBarIsFocused, setsearchBarIsFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchMovies, { data, isLoading }] = useSearchMoviesMutation();
  const [
    getOtherMovieCategory,
    { data: latestMovies, isLoading: isLoadingLatest },
  ] = useGetOtherMovieCategoryMutation();

  const { category, title } = useLocalSearchParams();

  const { movieSearchQuery, setMovieSearchQuery } = useContext(SearchContext);

  useFocusEffect(
    useCallback(() => {
      if (movieSearchQuery.trim().length === 0 && category) {
        getOtherMovieCategory(category);
      }

      return () => {
        setMovieSearchQuery("");
        setMovieResults([]);
        setCurrentPage(1);
      };
    }, [])
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (movieSearchQuery.trim().length > 0) {
        searchMovies({ searchQuery: movieSearchQuery, currentPage });
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [movieSearchQuery, currentPage]);

  useEffect(() => {
    if (latestMovies && latestMovies?.results?.length > 0) {
      setMovieResults(latestMovies.results);
    }
  }, [latestMovies]);

  useEffect(() => {
    if (data && data?.results?.length > 0) {
      setMovieResults(data?.results);
    }
  }, [data]);

  /**
   * increase page number by 1 until it reaches total pages on API
   */
  const incrementPage = () =>
    currentPage < data?.total_pages && setCurrentPage(currentPage + 1);

  /**
   * decrease page number by 1 until it reaches 1
   */
  const decrementPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <>
      <Stack.Screen
        options={{
          title: `${title || "Recommended"} Movies`,
          animation: "slide_from_right",
          headerBackVisible: !searchBarIsFocused,
          headerSearchBarOptions: {
            placeholder: "Search movies...",
            hintTextColor: "#fff",
            textColor: Colors.Secondary200,
            tintColor: Colors.Primary100,
            headerIconColor: Colors.Primary100,
            onChangeText: (event: { nativeEvent: { text: string } }) => {
              setMovieSearchQuery(event.nativeEvent.text);
            },
            onFocus: () => {
              setsearchBarIsFocused(true);
            },
            onCancelButtonPress: () => {
              setMovieSearchQuery("");
              setsearchBarIsFocused(false);
            },
          },
        }}
      />
      <View style={styles.container}>
      <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
        {data?.results?.length > 0
          ? `Search results for ${movieSearchQuery}`
          : "Recommended Movies"}
      </Text>
      {isLoading && (
        <View style={styles.skeletonContainer}>
          <Skeleton height={40} width="95%" />
        </View>
      )}

      {data && data?.results && data?.results?.length > 0 && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Total results: {data?.total_results}
          </Text>
          <Text style={styles.infoText}>Total pages: {data?.total_pages}</Text>
          <Text style={styles.infoText}>
            Current page: {data?.page <= 0 ? currentPage : data?.page}
          </Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.cardContainer}>
        {(isLoading || isLoadingLatest) && <MovieList length={8} />}
        {movieResults &&
          movieResults.length > 0 &&
          movieResults.map((item: any) => {
            return (
              <MovieCard
                title={item?.original_title || item?.original_name}
                poster_image={item?.poster_path}
                rating={item?.vote_average}
                release_date={item?.release_date || item?.first_air_date}
                movieId={item?.id}
                key={item.id}
              />
            );
          })}
      </ScrollView>

      <View style={styles.reloadBtnContainer}>
        <LoadMoreBtn
          onLoadMore={decrementPage}
          iconName="arrow-left"
          style={styles.reloadBtn}
        />
        <LoadMoreBtn
          onLoadMore={incrementPage}
          iconName="arrow-right"
          style={styles.reloadBtn}
        />
      </View>
      </View>
    </>
  );
};

export default ExploreMoviesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary200,
    width: "100%",
    flex: 1,
  },

  cardContainer: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },

  text: {
    color: Colors.Secondary300,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 15,
    // marginVertical: 20,
  },

  reloadBtnContainer: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 100,
    flexDirection: "row",
    gap: 10,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.Primary100,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 15,
    boxShadow: "0px 2px 3.84px rgba(140, 140, 140, 0.25)",
  },

  infoText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  skeletonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 10,
  },

  reloadBtn: {
    backgroundColor: Colors.Primary100,
  },
});
