import { Text, ScrollView, StyleSheet } from "react-native";
import AllMovies from "../components/movies/AllMovies";
import { Colors } from "../constants/colors";

const MoviesScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text>Popular Movies</Text>

      <AllMovies type="popular_movie" />
    </ScrollView>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary200,
  },
});
