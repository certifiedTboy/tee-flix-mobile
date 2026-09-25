import { useGetOtherTvShowsCategoryMutation } from "@/lib/apis/movies-apis";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CatalogCategoryHeader from "../common/CatalogCategoryHeader";
import HorinzontalMovielist from "../ui/skeletons/HorizontalMovielist";
import TvShowCard from "./TvShowCard";

const ACCENT = "#70d9cb";

const TvShowsCategories = ({
  category,
  categoryTitle,
}: {
  category: string;
  categoryTitle: string;
}) => {
  const [getOtherTvShowsCategory, { data, isLoading, isError }] =
    useGetOtherTvShowsCategoryMutation();

  useEffect(() => {
    getOtherTvShowsCategory(category);
  }, [category, getOtherTvShowsCategory]);

  const tvShows = data?.results ?? [];

  return (
    <View style={styles.container}>
      <CatalogCategoryHeader
        title={categoryTitle}
        category={category}
        pathname="/explore-tvshows-screen"
        count={isLoading || isError ? undefined : tvShows.length}
        accent={ACCENT}
      />
      {isLoading ? (
        <HorinzontalMovielist length={5} />
      ) : isError ? (
        <View style={styles.message}>
          <Ionicons name="alert-circle-outline" size={18} color={ACCENT} />
          <Text style={styles.messageText}>
            We couldn’t load these TV shows. Please try again later.
          </Text>
        </View>
      ) : tvShows.length === 0 ? (
        <View style={styles.message}>
          <Ionicons name="tv-outline" size={18} color={ACCENT} />
          <Text style={styles.messageText}>No TV shows found in this collection.</Text>
        </View>
      ) : (
        <FlatList
          data={tvShows}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) => String(item.id)}
          initialNumToRender={4}
          windowSize={3}
          renderItem={({ item }) => (
            <TvShowCard
              title={item?.original_name}
              poster_image={item?.poster_path}
              rating={item?.vote_average}
              release_date={item?.first_air_date}
              movieId={item?.id}
            />
          )}
        />
      )}
    </View>
  );
};

export default TvShowsCategories;

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
  messageText: { color: "#81bdb6", fontSize: 11, lineHeight: 17 },
});
