import { RouteProp } from "@react-navigation/native";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import MovieDetails from "../components/movies/MovieDetails";
import RecommendedMovies from "../components/movies/RecommendedMovies";
import { Colors } from "../constants/Colors";
import { useGetMovieDetailsMutation } from "../lib/apis/movieApis";

type MovieDetailsScreenRouteProp = RouteProp<
  { params: { movieId: string } },
  "params"
>;

const MovieDetailsScreen = ({
  route,
}: {
  route: MovieDetailsScreenRouteProp;
}) => {
  const [getMovieDetails, { data }] = useGetMovieDetailsMutation();
  const movieId = route.params.movieId;

  useEffect(() => {
    if (movieId) {
      getMovieDetails(movieId);
    }
  }, [movieId]);

  // useEffect(() => {
  //   if (data) {
  //     navigation.setOptions({ title: data.original_title });
  //   }
  // }, [data]);

  return (
    <ScrollView style={styles.container}>
      {data && (
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
          key={data?.id}
        />
      )}

      {data && <RecommendedMovies movies={data?.recommendations?.results} />}
    </ScrollView>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary200,
  },
});
