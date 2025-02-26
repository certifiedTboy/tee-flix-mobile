import { View, ScrollView, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import MovieSwiper from "../components/home/swiper/MovieSwiper";
import ComingSoonSwiper from "../components/home/swiper/ComingSoonSwiper";
import TvShowsSwiper from "../components/home/swiper/TvShowsSwiper";

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
