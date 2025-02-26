import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import SeriesDetails from "../components/series/SeriesDetails";
import RecommendedSeries from "../components/series/RecommendedSearies";
import { RouteProp } from "@react-navigation/native";
import {
  useGetSeriesDetailsMutation,
  useGetSeriesRecommendationsMutation,
} from "../lib/apis/movieApis";
import { Colors } from "../constants/colors";

type MovieDetailsScreenRouteProp = RouteProp<
  { params: { seriesId: string } },
  "params"
>;

const SeriesDetailsScreen = ({
  route,
}: {
  route: MovieDetailsScreenRouteProp;
}) => {
  const [getSeriesDetails, { data }] = useGetSeriesDetailsMutation();

  const [getSeriesRecommendations, { data: recoData }] =
    useGetSeriesRecommendationsMutation();

  const seriesId = route.params.seriesId;

  useEffect(() => {
    if (seriesId) {
      getSeriesDetails(seriesId);
      getSeriesRecommendations(seriesId);
    }
  }, [seriesId]);

  // useEffect(() => {
  //   if (data) {
  //     navigation.setOptions({ title: data.name });
  //   }
  // }, [data]);

  return (
    <ScrollView style={styles.container}>
      {data && (
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
        />
      )}

      {recoData && <RecommendedSeries movies={recoData?.results} />}
    </ScrollView>
  );
};

export default SeriesDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary200,
  },
});
