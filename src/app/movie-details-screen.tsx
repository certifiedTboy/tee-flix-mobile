import DetailsSkeleton from "@/components/ui/skeletons/DetailsSkeleton";
import { useGetMovieDetailsMutation } from "@/lib/apis/movies-apis";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import MovieDetails from "../components/movies/MovieDetails";
import { Colors } from "../constants/Colors";

const MovieDetailsScreen = () => {
  const [getMovieDetails, { data, isLoading }] = useGetMovieDetailsMutation();

  const { movieId, title } = useLocalSearchParams<{ movieId?: string; title?: string }>();

  useEffect(() => {
    if (movieId) {
      getMovieDetails(movieId);
    }
  }, [movieId]);

  return (
    <>
      <Stack.Screen
        options={{
          title: title || "Movie details",
          animation: "slide_from_right",
        }}
      />
      <ScrollView style={styles.container}>
        {isLoading ? (
          <DetailsSkeleton />
        ) : (
          <MovieDetails
            movieId={data?.id}
            release_date={data?.release_date}
            overview={data?.overview}
            genres={data?.genres}
            poster_image={data?.poster_path}
            production_companies={data?.production_companies}
            title={data?.original_title}
            rating={data?.vote_average}
            tagline={data?.tagline}
            runtime={data?.runtime}
            recommendations={data?.recommendations?.results}
            key={data?.id}
          />
        )}
      </ScrollView>
    </>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary200,
  },
});
