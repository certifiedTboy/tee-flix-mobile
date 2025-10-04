import { useGetOtherSeriesCategoryMutation } from "@/lib/apis/movies-apis";
import { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DescriptionTab from "../common/DescriptionTab";
import HorinzontalMovielist from "../ui/skeletons/HorizontalMovielist";
import Skeleton from "../ui/skeletons/Skeleton";
import SeriesCard from "./SeriesCard";

const SeriesCategories = ({
  category,
  categoryTitle,
}: {
  category: string;
  categoryTitle: string;
}) => {
  const [getOtherSeriesCategory, { data, isLoading }] =
    useGetOtherSeriesCategoryMutation();

  useEffect(() => {
    getOtherSeriesCategory(category);
  }, []);

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
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.skeletonContainer}>
          <Skeleton width="95%" height={30} radius={5} />
        </View>
      ) : (
        <DescriptionTab
          title={categoryTitle}
          category={category}
          pathname="/explore-series-screen"
        />
      )}
      {isLoading ? (
        <HorinzontalMovielist length={20} />
      ) : (
        <FlatList
          renderItem={RenderedCard}
          data={data?.results}
          keyExtractor={(item) => item.id}
          horizontal
        />
      )}
    </View>
  );
};

export default SeriesCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skeletonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
    flex: 1,
    marginVertical: 20,
  },
});
