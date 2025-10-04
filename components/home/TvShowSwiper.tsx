import { useGetAllSeriesMutation } from "@/lib/apis/movies-apis";
import { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DescriptionTab from "../common/DescriptionTab";
import TvShowCard from "../tv-shows/TvShowCard";
import HorinzontalMovielist from "../ui/skeletons/HorizontalMovielist";
import Skeleton from "../ui/skeletons/Skeleton";

const TvShowsSwiper = () => {
  const [getAllSeries, { data, isLoading }] = useGetAllSeriesMutation();

  useEffect(() => {
    getAllSeries(null);
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
    <>
      {isLoading ? (
        <View style={styles.skeletonContainer}>
          <Skeleton width="95%" height={30} radius={5} />
        </View>
      ) : (
        <DescriptionTab
          title="TV Shows / Series"
          category="popular"
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
    </>
  );
};

export default TvShowsSwiper;

const styles = StyleSheet.create({
  skeletonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
    flex: 1,
    marginVertical: 20,
  },
});
