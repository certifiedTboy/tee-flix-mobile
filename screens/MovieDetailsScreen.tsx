import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import MovieDetails from "../components/movies/MovieDetails";
import { RouteProp } from "@react-navigation/native";
import { useGetMovieDetailsMutation } from "../lib/apis/movieApis";
import { Colors } from "../constants/colors";

type MovieDetailsScreenRouteProp = RouteProp<
  { params: { movieId: string }; navigation: any },
  "params"
>;

const MovieDetailsScreen = ({
  route,
  navigation,
}: {
  route: MovieDetailsScreenRouteProp;
  navigation: any;
}) => {
  const [getMovieDetails, { data }] = useGetMovieDetailsMutation();
  const movieId = route.params.movieId;

  useEffect(() => {
    if (movieId) {
      getMovieDetails(movieId);
    }
  }, [movieId]);

  useEffect(() => {
    if (data) {
      navigation.setOptions({ title: data.original_title });
    }
  }, [data]);

  console.log(data);
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
          title={data?.title}
          rating={data?.vote_average}
          tagline={data?.tagline}
          runtime={data?.runtime}
        />
      )}
    </ScrollView>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary200,
  },
});
