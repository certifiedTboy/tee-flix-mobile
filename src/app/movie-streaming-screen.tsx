import { Stack, useLocalSearchParams } from "expo-router";
import MovieStreaming from "../components/movies/MovieStreaming";

const MovieStreamScreen = () => {
  const { movieId, title } = useLocalSearchParams<{
    movieId?: string;
    title?: string;
  }>();

  return (
    <>
      <Stack.Screen
        options={{
          title: title || "Movie",
          animation: "slide_from_right",
        }}
      />
      <MovieStreaming movieId={Number(movieId)} />
    </>
  );
};

export default MovieStreamScreen;
