import TvShowsDetails from "@/components/tv-shows/TvShowsDetails";
import DetailsSkeleton from "@/components/ui/skeletons/DetailsSkeleton";
import MovieList from "@/components/ui/skeletons/MovieList";
import {
  useGetSeriesDetailsMutation,
  useGetSeriesRecommendationsMutation,
} from "@/lib/apis/movies-apis";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import RecommendedSeries from "../components/series/RecommendedSeries";
import { Colors } from "../constants/Colors";

const TvShowsDetailsScreen = () => {
  const [getSeriesDetails, { data, isLoading }] = useGetSeriesDetailsMutation();

  const [getSeriesRecommendations, { data: recoData }] =
    useGetSeriesRecommendationsMutation();

  const { tvShowId } = useLocalSearchParams();

  useEffect(() => {
    if (tvShowId) {
      getSeriesDetails(tvShowId);
      getSeriesRecommendations(tvShowId);
    }
  }, [tvShowId]);

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <DetailsSkeleton />
      ) : (
        <TvShowsDetails
          movieId={data?.id}
          release_date={data?.first_air_date}
          overview={data?.overview}
          genres={data?.genres}
          poster_image={data?.poster_path}
          production_companies={data?.production_companies}
          title={data?.original_name || data?.name}
          rating={data?.vote_average}
          tagline={data?.tagline}
          key={data?.id}
          episodes={data?.number_of_episodes}
          seasons={data?.number_of_seasons}
        />
      )}

      {!recoData ? (
        <MovieList length={4} />
      ) : (
        <RecommendedSeries movies={recoData?.results} />
      )}
    </ScrollView>
  );
};

export default TvShowsDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary200,
  },
});
