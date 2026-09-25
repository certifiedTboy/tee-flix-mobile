import MovieList from "@/components/ui/skeletons/MovieList";
import Skeleton from "@/components/ui/skeletons/Skeleton";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SeriesCard from "../components/series/SeriesCard";
import LoadMoreBtn from "../components/ui/LoadMoreBtn";
import { Colors } from "../constants/Colors";

import {
  useGetOtherSeriesCategoryMutation,
  useSearchShowsMutation,
} from "../lib/apis/movies-apis";
import { SearchContext } from "../lib/context/search-context";

const ExploreSeriesScreen = () => {
  const [seriesResults, setSeriesResults] = useState<any[]>([]);
  const [searchBarIsFocused, setsearchBarIsFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [getOtherSeriesCategory, { data, isLoading }] =
    useGetOtherSeriesCategoryMutation();

  const [searchSeries, { data: result, isLoading: resultLoading }] =
    useSearchShowsMutation();

  const { category, title } = useLocalSearchParams();

  const { seriesSearchQuery, setSeriesSearchQuery } = useContext(SearchContext);

  useFocusEffect(
    useCallback(() => {
      if (seriesSearchQuery.trim().length === 0 && category) {
        getOtherSeriesCategory(category);
      }

      return () => {
        setSeriesSearchQuery("");
        setSeriesResults([]);
        setCurrentPage(1);
      };
    }, [])
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (seriesSearchQuery.trim().length > 0) {
        searchSeries({ searchQuery: seriesSearchQuery, currentPage });
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [seriesSearchQuery, currentPage]);

  useEffect(() => {
    if (result && result?.results?.length > 0) {
      setSeriesResults(result.results);
    }
  }, [result]);

  useEffect(() => {
    if (data && data?.results?.length > 0) {
      setSeriesResults(data?.results);
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
          title: `${title || "Recommended"} Series`,
          animation: "slide_from_right",
          headerBackVisible: !searchBarIsFocused,
          headerSearchBarOptions: {
            placeholder: "Search series...",
            hintTextColor: "#fff",
            textColor: Colors.Secondary200,
            tintColor: Colors.Primary100,
            headerIconColor: Colors.Primary100,
            onChangeText: (event: { nativeEvent: { text: string } }) => {
              setSeriesSearchQuery(event.nativeEvent.text);
            },
            onFocus: () => {
              setsearchBarIsFocused(true);
            },
            onCancelButtonPress: () => {
              setSeriesSearchQuery("");
              setsearchBarIsFocused(false);
            },
          },
        }}
      />
      <View style={styles.container}>
      <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
        {result?.results?.length > 0
          ? `Search results for ${seriesSearchQuery}`
          : "Recommended Series"}
      </Text>

      {resultLoading && (
        <View style={styles.skeletonContainer}>
          <Skeleton height={40} width="95%" />
        </View>
      )}

      {result && result?.results && result?.results?.length > 0 && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Total results: {result?.total_results}
          </Text>
          <Text style={styles.infoText}>
            Total pages: {result?.total_pages}
          </Text>
          <Text style={styles.infoText}>
            Current page: {result?.page <= 0 ? currentPage : result?.page}
          </Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.cardContainer}>
        {(isLoading || resultLoading) && <MovieList length={8} />}
        <View style={styles.cardContainer}>
          {seriesResults?.length > 0 &&
            seriesResults.map((item: any) => (
              <SeriesCard
                key={item.id}
                title={item?.name}
                poster_image={item?.poster_path}
                rating={item?.vote_average}
                release_date={item?.first_air_date}
                movieId={item?.id}
              />
            ))}
        </View>
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

export default ExploreSeriesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary200,
    width: "100%",
    flex: 1,
  },

  text: {
    color: Colors.Secondary300,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 15,
    // marginVertical: 20,
  },

  cardContainer: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-around",
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

  skeletonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 10,
  },

  infoText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  reloadBtn: {
    backgroundColor: Colors.Primary100,
  },
});
