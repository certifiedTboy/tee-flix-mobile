import React, {
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
  useEffect,
} from "react";
import { View, Alert, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useGetSeriesThrillersMutation } from "../../lib/apis/movieApis";

const SeriesThrillerReels: React.FC<{ seriesId: number }> = ({ seriesId }) => {
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
      Alert.alert("video has finished playing!");
    }
  }, []);

  useEffect(() => {
    // find main trailler key

    if (data && data?.results?.length > 0) {
      const trailerKey = data?.results.find(
        (result: any) => result?.type === "Trailer"
      )?.key;

      setTrailerId(trailerKey);
      // const keys = data?.results.map((result: any) => result?.key);

      // if ((keys && keys.length > 0) || trailerKey) {
      //   setPlayList([trailerKey, ...keys]);
      // }
    }
  }, [data]);

  // const togglePlaying = useCallback(() => {
  //   setPlaying((prev) => !prev);
  // }, []);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.movieContainer}>
        {trailerId && (
          <YoutubePlayer
            height={200}
            play={playing}
            // playList={playList}
            videoId={trailerId}
            onChangeState={onStateChange}
          />
        )}
      </View>
    </View>
  );
};

export default SeriesThrillerReels;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  movieContainer: {
    width: "100%",
    height: "100%",
  },
});
