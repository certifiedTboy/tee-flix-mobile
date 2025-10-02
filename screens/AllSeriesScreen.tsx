import SeriesCard from "@/components/common/SeriesCard";
import LoadMoreBtn from "@/components/ui/LoadMoreBtn";
import {
  useGetOtherSeriesCategoryMutation,
  useSearchShowsMutation,
} from "@/lib/apis/movieApis";
import { SearchContext } from "@/store/search-context";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

const AllSeriesScreen = ({ route }: { route: any }) => {
  const [seriesResults, setSeriesResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [getOtherSeriesCategory, { data, isLoading }] =
    useGetOtherSeriesCategoryMutation();

  const [searchSeries, { data: result }] = useSearchShowsMutation();

  const { seriesSearchQuery, setSeriesSearchQuery } = useContext(SearchContext);

  useFocusEffect(
    useCallback(() => {
      if (seriesSearchQuery.trim().length === 0 && route?.params?.category) {
        getOtherSeriesCategory(route?.params?.category);
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
    <View style={styles.container}>
      <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
        {result?.results?.length > 0
          ? `Search results for ${seriesSearchQuery}`
          : "Recommended Series"}
      </Text>

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
        {/* <Text style={styles.text}>All Series</Text> */}
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
  );
};

export default AllSeriesScreen;

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
    justifyContent: "space-evenly",
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
    elevation: 5,
    shadowColor: Colors.Secondary200,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  infoText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  reloadBtn: {
    backgroundColor: Colors.Primary100,
  },
});
