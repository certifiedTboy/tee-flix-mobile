import { useState, useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
import Icons from "../ui/Icons";
import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { Size } from "../../constants/size";

const MovieStreaming: React.FC<{ movieId: string }> = ({ movieId }) => {
  const [fullScreen, setFullScreen] = useState(false);

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
