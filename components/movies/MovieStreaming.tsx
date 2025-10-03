import { useNavigation } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { Colors } from "../../constants/Colors";
import { Size } from "../../constants/size";
import Icon from "../ui/Icon";

const MovieStreaming = ({ movieId }: { movieId: number }) => {
  const [fullScreen, setFullScreen] = useState(true);

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
    navigation.setOptions({ headerShown: false });
    return setFullScreen(true);
  };

  const closeFullScreen = () => {
    navigation.setOptions({ headerShown: true });
    setFullScreen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.movieContainer}>
        <WebView
          originWhitelist={["*"]}
          source={{
            html: `<iframe width="100%" height="100%" src=https://vidsrc.xyz/embed/movie/${movieId}></iframe>`,
          }}
        />
      </View>

      <View style={styles.toggleFullScreen}>
        {!fullScreen && (
          <Icon
            name="expand"
            size={Size.icon}
            color={Colors.Primary100}
            onPress={showFullScreen}
          />
        )}

        {fullScreen && (
          <Icon
            name="contract"
            size={Size.icon}
            color={Colors.Primary100}
            onPress={closeFullScreen}
          />
        )}
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
});

export default MovieStreaming;
