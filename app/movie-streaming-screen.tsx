import { useLocalSearchParams } from "expo-router";
import MovieStreaming from "../components/movies/MovieStreaming";

const MovieStreamScreen = () => {
  const { movieId } = useLocalSearchParams();

  // @ts-ignore
  return <MovieStreaming movieId={movieId} />;
};

export default MovieStreamScreen;
