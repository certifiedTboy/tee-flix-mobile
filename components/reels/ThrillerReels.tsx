import React, {
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
  useEffect,
} from "react";
import { View, Alert, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useGetMovieThrillersMutation } from "../../lib/apis/movieApis";

const ThrillerReels: React.FC<{ movieId: string }> = ({ movieId }) => {
  const [playing, setPlaying] = useState(true);
  const [playList, setPlayList] = useState<string[]>([]);

  const [getMovieThrillers, { data }] = useGetMovieThrillersMutation();

  useLayoutEffect(() => {
    if (movieId) {
      getMovieThrillers(movieId);
    }
  }, [movieId]);

  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  useEffect(() => {
    // find main trailler key
    if (data) {
      const trailerKey = data?.results.find(
        (result: any) => result?.type === "Trailer"
      ).key;
      const keys = data?.results.map((result: any) => result.key);

      if ((keys && keys.length > 0) || trailerKey) {
        setPlayList([trailerKey, ...keys]);
      }
    }
  }, [data]);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.movieContainer}>
        {data && playList?.length > 0 && (
          <YoutubePlayer
            height={200}
            play={playing}
            playList={playList}
            //   videoId={"rUSdnuOLebE"}
            onChangeState={onStateChange}
          />
        )}
      </View>
    </View>
  );
};

export default ThrillerReels;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  movieContainer: {
    width: "100%",
    height: "100%",
  },
});
