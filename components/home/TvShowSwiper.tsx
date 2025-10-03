import { useGetAllSeriesMutation } from "@/lib/apis/movies-apis";
import { useCallback, useEffect } from "react";
import { FlatList } from "react-native";
import DescriptionTab from "../common/DescriptionTab";
import TvShowCard from "../tv-shows/TvShowCard";

const TvShowsSwiper = () => {
  const [getAllSeries, { data }] = useGetAllSeriesMutation();

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
      <DescriptionTab
        title="TV Shows / Series"
        category="popular"
        pathname="/explore-series-screen"
      />
      <FlatList
        renderItem={RenderedCard}
        data={data?.results}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </>
  );
};

export default TvShowsSwiper;
