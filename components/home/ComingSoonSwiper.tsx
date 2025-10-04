import { useGetUpcomingMoviesMutation } from "@/lib/apis/movies-apis";
import { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DescriptionTab from "../common/DescriptionTab";
import MovieCard from "../movies/MovieCard";
import HorinzontalMovielist from "../ui/skeletons/HorizontalMovielist";
import Skeleton from "../ui/skeletons/Skeleton";

const ComingSoonSwiper = () => {
  const [getUpcomingMovies, { data, isLoading }] =
    useGetUpcomingMoviesMutation();

  useEffect(() => {
    getUpcomingMovies(null);
  }, []);

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
    <>
      {isLoading ? (
        <View style={styles.skeletonContainer}>
          <Skeleton width="95%" height={30} radius={5} />
        </View>
      ) : (
        <DescriptionTab
          title="Coming Soon"
          category={"upcoming"}
          pathname="/explore-movies-screen"
        />
      )}

      {isLoading ? (
        <HorinzontalMovielist length={20} />
      ) : (
        <FlatList
          data={data?.results}
          renderItem={RenderedCard}
          keyExtractor={(item) => item.id}
          horizontal
        />
      )}
    </>
  );
};

export default ComingSoonSwiper;

const styles = StyleSheet.create({
  skeletonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
    flex: 1,
    marginVertical: 20,
  },
});
