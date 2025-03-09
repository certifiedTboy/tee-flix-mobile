import { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
import Icons from "../ui/Icons";
import { Colors } from "../../constants/colors";
import { Size } from "../../constants/size";

const SeriesStreaming: React.FC<{ seriesId: string }> = ({ seriesId }) => {
  const [fullScreen, setFullScreen] = useState(true);
  const [episode, setEpisode] = useState(1);
  const [season, setSeason] = useState(1);

  const navigation = useNavigation();

  const changeScreenOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  };

  const changePortraitOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  };

  useEffect(() => {
    changeScreenOrientation();

    navigation.setOptions({ headerShown: false });

    return () => {
      changePortraitOrientation();
    };
  }, []);

  const showFullScreen = () => {
    navigation.setOptions({ headerShown: fullScreen });
    return setFullScreen(true);
  };

  const closeFullScreen = () => {
    navigation.setOptions({ headerShown: fullScreen });
    setFullScreen(false);
  };

  // change series episode up by 1
  const onChangeEpisodeUp = () => {
    setEpisode(episode + 1);
  };

  // change series season up by 1
  const onChangeSeasonUp = () => {
    setSeason(season + 1);
  };

  // change series episode down by 1
  const onChangeEpisodeDown = () => {
    if (episode === 1) return;

    setEpisode(episode - 1);
  };

  // change series season down by 1
  const onChangeSeasonDown = () => {
    if (season === 1) return;
    setSeason(season - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.movieContainer}>
        <WebView
          originWhitelist={["*"]}
          source={{
            html: `<iframe width="100%" height="100%"  src=https://vidsrc.pro/embed/tv/${seriesId}/${season}/${episode}></iframe>`,
          }}
        />
      </View>

      <View style={styles.toggleFullScreen}>
        {!fullScreen && (
          <Icons
            name="expand"
            size={Size.icon}
            color={Colors.Primary100}
            onPress={showFullScreen}
          />
        )}

        {fullScreen && (
          <Icons
            name="contract"
            size={Size.icon}
            color={Colors.Primary100}
            onPress={closeFullScreen}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.episode}>
          <Icons
            name="play-skip-forward-circle-outline"
            size={26}
            color={Colors.Secondary300}
            onPress={onChangeEpisodeUp}
          />

          <TextInput value={`E${episode.toString()}`} style={styles.input} />

          <Icons
            name="play-skip-back-circle-outline"
            size={26}
            color={Colors.Secondary300}
            onPress={onChangeEpisodeDown}
          />
        </View>

        <View style={styles.episode}>
          <Icons
            name="play-skip-forward-circle-outline"
            size={26}
            color={Colors.Secondary300}
            onPress={onChangeSeasonUp}
          />
          <TextInput value={`S${season.toString()}`} style={styles.input} />
          <Icons
            name="play-skip-back-circle-outline"
            size={26}
            color={Colors.Secondary300}
            onPress={onChangeSeasonDown}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Primary200,
  },

  movieContainer: {
    width: "100%",
    height: "100%",
  },

  toggleFullScreen: { position: "absolute", top: 20, right: 20 },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    paddingHorizontal: 20,
  },

  episode: {
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    // backgroundColor: "#1C1C1C",
    width: 40,
    height: 40,
    borderRadius: 5,
    textAlign: "center",
    color: Colors.Secondary300,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SeriesStreaming;
