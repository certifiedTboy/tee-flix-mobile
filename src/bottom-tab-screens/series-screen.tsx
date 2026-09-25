import SeriesCategories from "@/components/series/SeriesCategories";
import { ScrollView, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

const SeriesScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      <SeriesCategories category="popular" categoryTitle="Popular" />
      <SeriesCategories category="top_rated" categoryTitle="Top Rated" />
      <SeriesCategories category="on_the_air" categoryTitle="On The Air" />
      <SeriesCategories category="airing_today" categoryTitle="Airing Today" />
    </ScrollView>
  );
};

export default SeriesScreen;

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
