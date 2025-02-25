import { ScrollView, Text, StyleSheet } from "react-native";
import AllSeries from "../components/series/AllSeries";
import { Colors } from "../constants/colors";

const TvShowsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <AllSeries />
    </ScrollView>
  );
};

export default TvShowsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary200,
  },
});
