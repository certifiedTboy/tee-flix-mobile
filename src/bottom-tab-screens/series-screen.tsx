import { useGetAllSeriesMutation } from "@/lib/apis/movies-apis";
import SeriesCategories from "@/components/series/SeriesCategories";
import CatalogFeatureHeader from "@/components/common/CatalogFeatureHeader";
import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";

const SeriesScreen = () => {
  const [getAllSeries, { data, isLoading }] = useGetAllSeriesMutation();

  useEffect(() => {
    getAllSeries(null);
  }, [getAllSeries]);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    >
      <CatalogFeatureHeader
        eyebrow="YOUR NEXT BINGE"
        greeting="Just one more episode?"
        featureLabel="SERIES SPOTLIGHT"
        fallbackTitle="A new world is one episode away"
        fallbackDescription="Meet unforgettable characters and follow their stories season after season."
        mediaLabel="Series"
        icon="logo-youtube"
        accent="#b99aff"
        featuredItem={data?.results?.[0]}
        isLoading={isLoading}
        detailRoute={(id, title) => ({
          pathname: "/series-details-screen",
          params: { seriesId: id, title },
        })}
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
  listContainer: { paddingBottom: 32 },
  sections: { gap: 20 },
});
