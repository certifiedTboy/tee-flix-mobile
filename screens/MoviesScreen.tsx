import OtherMoviesCategories from "@/components/movies/OtherMoviesCategories";
import { Colors } from "@/constants/colors";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const MoviesScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.listContainer}>
          <OtherMoviesCategories category="upcoming" categoryTitle="Upcoming" />
          <OtherMoviesCategories
            category="top_rated"
            categoryTitle="Top Rated"
          />
          <OtherMoviesCategories
            category="now_playing"
            categoryTitle="Now Playing"
          />
          <OtherMoviesCategories category="popular" categoryTitle="Popular" />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
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
