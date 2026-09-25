import { useGetOtherSeriesCategoryMutation } from "@/lib/apis/movies-apis";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CatalogCategoryHeader from "../common/CatalogCategoryHeader";
import HorinzontalMovielist from "../ui/skeletons/HorizontalMovielist";
import SeriesCard from "./SeriesCard";

const ACCENT = "#b99aff";

const SeriesCategories = ({
  category,
  categoryTitle,
}: {
  category: string;
  categoryTitle: string;
}) => {
  const [getOtherSeriesCategory, { data, isLoading, isError }] =
    useGetOtherSeriesCategoryMutation();

  useEffect(() => {
    getOtherSeriesCategory(category);
  }, [category, getOtherSeriesCategory]);

  const series = data?.results ?? [];

  return (
    <View style={styles.container}>
      <CatalogCategoryHeader
        title={categoryTitle}
        category={category}
        pathname="/explore-series-screen"
        count={isLoading || isError ? undefined : series.length}
        accent={ACCENT}
      />
      {isLoading ? (
        <HorinzontalMovielist length={5} />
      ) : isError ? (
        <View style={styles.message}>
          <Ionicons name="alert-circle-outline" size={18} color={ACCENT} />
          <Text style={styles.messageText}>
            We couldn’t load these series. Please try again later.
          </Text>
        </View>
      ) : series.length === 0 ? (
        <View style={styles.message}>
          <Ionicons name="play-circle-outline" size={18} color={ACCENT} />
          <Text style={styles.messageText}>No series found in this collection.</Text>
        </View>
      ) : (
        <FlatList
          data={series}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) => String(item.id)}
          initialNumToRender={4}
          windowSize={3}
          renderItem={({ item }) => (
            <SeriesCard
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

export default SeriesCategories;

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
  messageText: { color: "#9b8bb8", fontSize: 11, lineHeight: 17 },
});
