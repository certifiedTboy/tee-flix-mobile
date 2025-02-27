import { useState, useEffect, useCallback } from "react";
import { ScrollView, View, Text, StyleSheet, FlatList } from "react-native";
import SearchInput from "../common/SearchInput";
import SeriesCard from "../common/SeriesCard";
import {
  useSearchShowsMutation,
  useGetAllSeriesMutation,
} from "../../lib/apis/movieApis";
import { Colors } from "../../constants/colors";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const ShowSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchShows, { data }] = useSearchShowsMutation();
  const [searchFreshShows, { data: freshResult }] = useSearchShowsMutation();
  const [getAllSeries, { data: seriesData }] = useGetAllSeriesMutation();

  useEffect(() => {
    const timer = setTimeout(() => {
      searchShows({ searchQuery, currentPage });
    }, 1000);

    if (searchQuery.trim().length === 0) {
      getAllSeries(null);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (seriesData && seriesData?.results?.length > 0) {
      setShowResults(seriesData.results);
    }
  }, [seriesData]);

  useEffect(() => {
    if (data && data.results?.length > 0) {
      setShowResults(data.results);
    }
  }, [data]);

  const handleEndReached = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchFreshMovies = () => {
      if (currentPage >= freshResult?.total_pages) {
        return;
      }

      if (currentPage > 1) {
        searchFreshShows({ searchQuery, currentPage });
      }
    };

    fetchFreshMovies();
  }, [currentPage]);

  useEffect(() => {
    if (freshResult && freshResult.results?.length > 0 && currentPage > 1) {
      setShowResults((prev) => [...prev, ...freshResult.results]);
    }
  }, [freshResult]);

  const RenderedCard = useCallback(
    ({ item }: { item: any }) => (
      <SeriesCard
        title={item?.original_name}
        poster_image={item?.poster_path}
        rating={item?.vote_average}
        release_date={item?.first_air_date}
        movieId={item?.id}
        key={item.id}
      />
    ),
    []
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SearchInput
          onSearchChange={(enteredText: string) => setSearchQuery(enteredText)}
        />

        <Text style={styles.text}>
          {data?.results?.length > 0 ? "Search Results" : "Recommended Shows"}
        </Text>

        <View style={styles.listContainer}>
          <FlatList
            data={showResults}
            renderItem={RenderedCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEventThrottle={16} // Improves performance
            onEndReached={handleEndReached} // Trigger when reaching the end
            onEndReachedThreshold={0.5} // Adjust sensitivity
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ShowSearch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary200,
    width: "100%",
    flex: 1,
  },

  listContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },

  text: {
    color: Colors.Secondary300,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 23,
  },
});
