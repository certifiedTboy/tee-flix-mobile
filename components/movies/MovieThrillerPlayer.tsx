import { useGetMovieThrillersMutation } from "@/lib/apis/movies-apis";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import YoutubePlayer from "react-native-youtube-iframe";

const MovieThrillerPlayer: React.FC<{ movieId: number }> = ({ movieId }) => {
  const [playing, setPlaying] = useState(true);
  const [trailerId, setTrailerId] = useState<string | null>(null);

  const [getMovieThrillers, { data }] = useGetMovieThrillersMutation();

  useLayoutEffect(() => {
    if (movieId) {
      getMovieThrillers(movieId);
    }
  }, [movieId]);

  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    // find main trailler key
    if (data && data?.results?.length > 0) {
      const trailerKey = data?.results.find(
        (result: any) => result?.type === "Trailer"
      )?.key;

      setTrailerId(trailerKey);
    }
  }, [data]);

  return (
    <>
      {trailerId && (
        <YoutubePlayer
          height={200}
          play={playing}
          // playList={playList}
          videoId={trailerId}
          onChangeState={onStateChange}
        />
      )}
    </>
  );
};

export default MovieThrillerPlayer;
