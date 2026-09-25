import TvShowsCategories from "@/components/tv-shows/TvShowsCategories";
import CatalogScreenHeader from "@/components/common/CatalogScreenHeader";
import { ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";

const TvShowsScreen = () => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    >
      <CatalogScreenHeader
        eyebrow="LIVE & ON DEMAND"
        title="TV Shows"
        description="Stay up to date with the shows making every day a little better."
        icon="tv"
        accent="#70d9cb"
      />
      <View style={styles.sections}>
        <TvShowsCategories category="popular" categoryTitle="Popular" />
        <TvShowsCategories category="on_the_air" categoryTitle="On The Air" />
        <TvShowsCategories category="airing_today" categoryTitle="Airing Today" />
        <TvShowsCategories category="top_rated" categoryTitle="Top Rated" />
      </View>
    </ScrollView>
  );
};

export default TvShowsScreen;

const styles = StyleSheet.create({
  screen: { backgroundColor: Colors.Primary200, flex: 1 },
  listContainer: {
    paddingBottom: 32,
  },
  sections: { gap: 20 },
});
