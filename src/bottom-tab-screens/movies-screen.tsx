import MoviesCategories from "@/components/movies/MoviesCategories";
import CatalogScreenHeader from "@/components/common/CatalogScreenHeader";
import { ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";

const MoviesScreen = () => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    >
      <CatalogScreenHeader
        eyebrow="THE BIG SCREEN"
        title="Movies"
        description="Find your next favorite, from fresh releases to all-time greats."
        icon="film"
        accent={Colors.Primary100}
      />
      <View style={styles.sections}>
        <MoviesCategories category="now_playing" categoryTitle="Now Playing" />
        <MoviesCategories category="popular" categoryTitle="Popular" />
        <MoviesCategories category="upcoming" categoryTitle="Coming Soon" />
        <MoviesCategories category="top_rated" categoryTitle="Top Rated" />
      </View>
    </ScrollView>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  screen: { backgroundColor: Colors.Primary200, flex: 1 },
  listContainer: {
    paddingBottom: 32,
  },
  sections: { gap: 20 },
});
