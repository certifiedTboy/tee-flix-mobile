import OtherTvShowsCategories from "@/components/series/OtherTvShowsCategories";
import { Colors } from "@/constants/Colors";
import { ScrollView, StyleSheet } from "react-native";

const TvShowsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      <OtherTvShowsCategories category="popular" categoryTitle="Popular" />
      <OtherTvShowsCategories category="top_rated" categoryTitle="Top Rated" />
      <OtherTvShowsCategories
        category="on_the_air"
        categoryTitle="On The Air"
      />
      <OtherTvShowsCategories
        category="airing_today"
        categoryTitle="Airing Today"
      />
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
