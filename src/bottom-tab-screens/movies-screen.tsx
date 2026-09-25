import MoviesCategories from "@/components/movies/MoviesCategories";
import { ScrollView, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

const MoviesScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      <MoviesCategories category="upcoming" categoryTitle="Upcoming" />
      <MoviesCategories category="top_rated" categoryTitle="Top Rated" />
      <MoviesCategories category="now_playing" categoryTitle="Now Playing" />
      <MoviesCategories category="popular" categoryTitle="Popular" />
    </ScrollView>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary200,
    width: "100%",
    flex: 1,
  },

  listContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: Colors.Secondary300,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 23,
    marginVertical: 20,
  },
});
