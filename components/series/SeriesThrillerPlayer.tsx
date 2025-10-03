import { useGetSeriesThrillersMutation } from "@/lib/apis/movies-apis";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import YoutubePlayer from "react-native-youtube-iframe";

const SeriesThrillerPlayer = ({ seriesId }: { seriesId: number }) => {
  const [playing, setPlaying] = useState(true);
  const [trailerId, setTrailerId] = useState<string | null>(null);
  // const [playList, setPlayList] = useState<string[]>([]);

  const [getSeriesThrillers, { data }] = useGetSeriesThrillersMutation();

  useLayoutEffect(() => {
    if (seriesId) {
      getSeriesThrillers(seriesId);
    }
  }, [seriesId]);

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

export default SeriesThrillerPlayer;
