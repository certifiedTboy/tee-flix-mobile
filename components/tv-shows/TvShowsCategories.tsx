import { useGetOtherTvShowsCategoryMutation } from "@/lib/apis/movies-apis";
import { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DescriptionTab from "../common/DescriptionTab";
import TvShowCard from "./TvShowCard";

const TvShowsCategories = ({
  category,
  categoryTitle,
}: {
  category: string;
  categoryTitle: string;
}) => {
  const [getOtherTvShowsCategory, { data, isLoading }] =
    useGetOtherTvShowsCategoryMutation();

  useEffect(() => {
    getOtherTvShowsCategory(category);
  }, []);

  const RenderedCard = useCallback(
    ({ item }: { item: any }) => (
      <TvShowCard
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
    <View style={styles.container}>
      <DescriptionTab
        title={categoryTitle}
        category={category}
        pathname="/explore-tvshows-screen"
      />
      <FlatList
        renderItem={RenderedCard}
        data={data?.results}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </View>
  );
};

export default TvShowsCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
