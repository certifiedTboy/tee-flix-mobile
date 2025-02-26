import { useEffect } from "react";
import MovieStreaming from "../components/movies/MovieStreaming";
import { RouteProp } from "@react-navigation/native";

type MovieDetailsScreenRouteProp = RouteProp<
  { params: { movieId: string; movieTitle: string } },
  "params"
>;

const MovieStreamScreen: React.FC<{
  route: MovieDetailsScreenRouteProp;
}> = ({ route }) => {
  const movieId = route.params.movieId;
  // const movieTitle = route.params.movieTitle;

  // useEffect(() => {
  //   if (movieTitle) {
  //     navigation.setOptions({ title: `Now watching ${movieTitle}` });
  //   }
  // }, [movieTitle]);

  return <MovieStreaming movieId={movieId} />;
};

export default MovieStreamScreen;
