import { ScrollView, StyleSheet } from "react-native";
import ComingSoonSwiper from "../components/home/swiper/ComingSoonSwiper";
import MovieSwiper from "../components/home/swiper/MovieSwiper";
import TvShowsSwiper from "../components/home/swiper/TvShowsSwiper";
import { Colors } from "../constants/Colors";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <MovieSwiper />
      <ComingSoonSwiper />
      <TvShowsSwiper />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary200,
  },
});
