import { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, FlatList } from "react-native";
import SearchInput from "../common/SearchInput";
import OtherMovieCard from "../common/OtherMovieCard";
import {
  useSearchMoviesMutation,
  useGetLatestMoviesMutation,
} from "../../lib/apis/movieApis";
import { Colors } from "../../constants/colors";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movieResults, setMovieResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchMovies, { data }] = useSearchMoviesMutation();
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
            renderItem={({ item }) => (
              <OtherMovieCard
                title={item?.original_title}
                poster_image={item?.poster_path}
                rating={item?.vote_average}
                release_date={item?.release_date}
                movieId={item?.id}
                key={item.id}
              />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
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
