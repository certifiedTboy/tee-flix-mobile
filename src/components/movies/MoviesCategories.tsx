import { useGetOtherMovieCategoryMutation } from "@/lib/apis/movies-apis";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import CatalogCategoryHeader from "../common/CatalogCategoryHeader";
import HorinzontalMovielist from "../ui/skeletons/HorizontalMovielist";
import MovieCard from "./MovieCard";

const MoviesCategories = ({
  category,
  categoryTitle,
}: {
  category: string;
  categoryTitle: string;
}) => {
  const [getOtherMovieCategory, { data, isLoading, isError }] =
    useGetOtherMovieCategoryMutation();

  useEffect(() => {
    getOtherMovieCategory(category);
  }, [category, getOtherMovieCategory]);

  const movies = data?.results ?? [];

  return (
    <View style={styles.container}>
      <CatalogCategoryHeader
        title={categoryTitle}
        category={category}
        pathname="/explore-movies-screen"
        count={isLoading || isError ? undefined : movies.length}
        accent={Colors.Primary100}
      />
      {isLoading ? (
        <HorinzontalMovielist length={5} />
      ) : isError ? (
        <View style={styles.message}>
          <Ionicons
            name="alert-circle-outline"
            size={18}
            color={Colors.Primary100}
          />
          <Text style={styles.messageText}>
            We couldn’t load these movies. Please try again later.
          </Text>
        </View>
      ) : movies.length === 0 ? (
        <View style={styles.message}>
          <Ionicons
            name="film-outline"
            size={18}
            color={Colors.Primary100}
          />
          <Text style={styles.messageText}>No movies found in this collection.</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) => String(item.id)}
          initialNumToRender={4}
          windowSize={3}
          renderItem={({ item }) => (
            <MovieCard
              title={item?.original_title}
              poster_image={item?.poster_path}
              rating={item?.vote_average}
              release_date={item?.release_date}
              movieId={item?.id}
            />
          )}
        />
      )}
    </View>
  );
};

export default MoviesCategories;

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { paddingHorizontal: 6, paddingBottom: 2 },
  message: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    minHeight: 90,
    paddingHorizontal: 22,
  },
  messageText: { color: Colors.Secondary200, fontSize: 11, lineHeight: 17 },
});
