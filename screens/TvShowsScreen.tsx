import { ScrollView, Text, StyleSheet } from "react-native";
import AllTvShows from "../components/series/AllTvShows";
import { Colors } from "../constants/colors";

const TvShowsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <AllTvShows />
    </ScrollView>
  );
};

export default TvShowsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary200,
  },
});
