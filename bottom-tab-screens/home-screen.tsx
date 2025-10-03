import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ComingSoonSwiper from "../components/home/ComingSoonSwiper";
import MovieSwiper from "../components/home/MovieSwiper";
import TvShowsSwiper from "../components/home/TvShowSwiper";
import { Colors } from "../constants/Colors";

const HomeScreen = () => {
  return (
    <SafeAreaView
      style={{ backgroundColor: "#000000" }}
      edges={["bottom", "left", "right"]}
    >
      <ScrollView style={styles.container}>
        <MovieSwiper />
        <ComingSoonSwiper />
        <TvShowsSwiper />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary200,
  },
});
