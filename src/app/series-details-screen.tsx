import DetailsSkeleton from "@/components/ui/skeletons/DetailsSkeleton";
import {
  useGetSeriesDetailsMutation,
  useGetSeriesRecommendationsMutation,
} from "@/lib/apis/movies-apis";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import SeriesDetails from "../components/series/SeriesDetails";
import { Colors } from "../constants/Colors";

const SeriesDetailsScreen = () => {
  const [getSeriesDetails, { data, isLoading }] = useGetSeriesDetailsMutation();

  const [
    getSeriesRecommendations,
    {
      data: recoData,
      isLoading: recommendationsLoading,
      isError: recommendationsError,
    },
  ] =
    useGetSeriesRecommendationsMutation();

  const { seriesId, title } = useLocalSearchParams<{
    seriesId?: string;
    title?: string;
  }>();

  useEffect(() => {
    if (seriesId) {
      getSeriesDetails(seriesId);
      getSeriesRecommendations(seriesId);
    }
  }, [seriesId]);

  return (
    <>
      <Stack.Screen
        options={{
          title: title || "Series details",
          animation: "slide_from_right",
        }}
      />
      <ScrollView style={styles.container}>
        {isLoading ? (
          <DetailsSkeleton />
        ) : (
          <SeriesDetails
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
            recommendations={recoData?.results}
            recommendationsLoading={recommendationsLoading}
            recommendationsError={recommendationsError}
          />
        )}
      </ScrollView>
    </>
  );
};

export default SeriesDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary200,
  },
});
