import { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SearchInput from "../common/SearchInput";
import OtherMovieCard from "../common/OtherMovieCard";
import {
  useSearchMoviesMutation,
  useGetLatestMoviesMutation,
} from "../../lib/apis/movieApis";
import { Colors } from "../../constants/colors";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

interface ScrollEvent {
  nativeEvent: {
    contentOffset: {
      y: number;
    };
  };
}

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movieResults, setMovieResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchMovies, { data }] = useSearchMoviesMutation();
  const [searchFreshMovies, { data: freshResult }] = useSearchMoviesMutation();

  const [getLatestMovies, { data: latestMovies }] =
    useGetLatestMoviesMutation();

  useEffect(() => {
    const timer = setTimeout(() => {
      searchMovies({ searchQuery, currentPage });
    }, 1000);

    if (searchQuery.trim().length === 0) {
      getLatestMovies(null);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (latestMovies && latestMovies?.results?.length > 0) {
      setMovieResults(latestMovies.results);
    }
  }, [latestMovies]);

  useEffect(() => {
    if (data && data.results?.length > 0) {
      setMovieResults(data.results);
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
        searchFreshMovies({ searchQuery, currentPage });
      }
    };

    fetchFreshMovies();
  }, [currentPage]);

  useEffect(() => {
    if (freshResult && freshResult.results?.length > 0 && currentPage > 1) {
      setMovieResults((prev) => [...prev, ...freshResult.results]);
    }
  }, [freshResult]);

  // Render the card
  // useCallback is used to prevent re-rendering of the card
  const RenderedCard = useCallback(
    ({ item }: { item: any }) => (
      <OtherMovieCard
        title={item?.original_title}
        poster_image={item?.poster_path}
        rating={item?.vote_average}
        release_date={item?.release_date}
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
          {data?.results?.length > 0 ? "Search Results" : "Recommended Movies"}
        </Text>

        <View style={styles.listContainer}>
          <FlatList
            data={movieResults}
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

export default MovieSearch;

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
