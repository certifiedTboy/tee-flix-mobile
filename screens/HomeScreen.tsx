import { View, ScrollView, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
// import DescriptionTab from "../components/home/DescriptionTab";
import MovieSwiper from "../components/home/swiper/MovieSwiper";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <MovieSwiper />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary200,
  },
});
