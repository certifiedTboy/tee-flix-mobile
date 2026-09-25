import TvShowsCategories from "@/components/tv-shows/TvShowsCategories";
import { ScrollView, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

const TvShowsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      <TvShowsCategories category="popular" categoryTitle="Popular" />
      <TvShowsCategories category="top_rated" categoryTitle="Top Rated" />
      <TvShowsCategories category="on_the_air" categoryTitle="On The Air" />
      <TvShowsCategories category="airing_today" categoryTitle="Airing Today" />
    </ScrollView>
  );
};

export default TvShowsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary200,
    width: "100%",
    flex: 1,
  },

  listContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
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
