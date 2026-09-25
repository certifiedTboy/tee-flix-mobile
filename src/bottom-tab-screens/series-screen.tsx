import SeriesCategories from "@/components/series/SeriesCategories";
import CatalogScreenHeader from "@/components/common/CatalogScreenHeader";
import { ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";

const SeriesScreen = () => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    >
      <CatalogScreenHeader
        eyebrow="BINGE-WORTHY STORIES"
        title="Series"
        description="Get hooked on remarkable stories, one episode at a time."
        icon="play"
        accent="#b99aff"
      />
      <View style={styles.sections}>
        <SeriesCategories category="popular" categoryTitle="Popular" />
        <SeriesCategories category="on_the_air" categoryTitle="On The Air" />
        <SeriesCategories category="airing_today" categoryTitle="Airing Today" />
        <SeriesCategories category="top_rated" categoryTitle="Top Rated" />
      </View>
    </ScrollView>
  );
};

export default SeriesScreen;

const styles = StyleSheet.create({
  screen: { backgroundColor: Colors.Primary200, flex: 1 },
  listContainer: {
    paddingBottom: 32,
  },
  sections: { gap: 20 },
});
