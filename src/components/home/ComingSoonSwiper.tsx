import { useGetUpcomingMoviesMutation } from "@/lib/apis/movies-apis";
import { useCallback, useEffect } from "react";
import { FlatList } from "react-native";
import DescriptionTab from "../common/DescriptionTab";
import MovieCard from "../movies/MovieCard";
import DescriptionTabSkeleton from "../ui/skeletons/DescriptionTabSkeleton";
import HorinzontalMovielist from "../ui/skeletons/HorizontalMovielist";

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
        <DescriptionTabSkeleton />
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
