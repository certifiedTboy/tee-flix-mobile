import { useGetOtherMovieCategoryMutation } from "@/lib/apis/movies-apis";
import { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DescriptionTab from "../common/DescriptionTab";
import MovieCard from "./MovieCard";

const MoviesCategories = ({
  category,
  categoryTitle,
}: {
  category: string;
  categoryTitle: string;
}) => {
  const [getOtherMovieCategory, { data, isLoading }] =
    useGetOtherMovieCategoryMutation();

  useEffect(() => {
    getOtherMovieCategory(category);
  }, []);

  // Render the card
  // useCallback is used to prevent re-rendering of the card
  const RenderedCard = useCallback(
    ({ item }: { item: any }) => (
      <MovieCard
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
    <View style={styles.container}>
      <DescriptionTab
        title={categoryTitle}
        category={category}
        pathname="/explore-movies-screen"
      />
      <FlatList
        data={data?.results}
        renderItem={RenderedCard}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </View>
  );
};

export default MoviesCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
