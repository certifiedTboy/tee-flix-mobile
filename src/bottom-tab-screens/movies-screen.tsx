import CatalogFeatureHeader from "@/components/common/CatalogFeatureHeader";
import MoviesCategories from "@/components/movies/MoviesCategories";
import { useGetLatestMoviesMutation } from "@/lib/apis/movies-apis";
import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";

const MoviesScreen = () => {
  const [getLatestMovies, { data, isLoading }] = useGetLatestMoviesMutation();

  useEffect(() => {
    getLatestMovies(null);
  }, [getLatestMovies]);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    >
      <CatalogFeatureHeader
        eyebrow="ROLL THE CREDITS"
        greeting="What story calls to you?"
        featureLabel="SPOTLIGHT PICK"
        fallbackTitle="Your next favorite is waiting"
        fallbackDescription="Explore big-screen adventures, hidden gems, and stories worth sharing."
        mediaLabel="Movie"
        icon="film-outline"
        accent={Colors.Primary100}
        featuredItem={data?.results?.[0]}
        isLoading={isLoading}
        detailRoute={(id, title) => ({
          pathname: "/movie-details-screen",
          params: { movieId: id, title },
        })}
      />
      <View style={styles.sections}>
        <MoviesCategories category="now_playing" categoryTitle="Now Playing" />
        <MoviesCategories category="popular" categoryTitle="Popular" />
        <MoviesCategories category="upcoming" categoryTitle="Coming Soon" />
        <MoviesCategories category="top_rated" categoryTitle="Top Rated" />
      </View>
    </ScrollView>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  screen: { backgroundColor: Colors.Primary200, flex: 1 },
  listContainer: { paddingBottom: 32 },
  sections: { gap: 20 },
});
