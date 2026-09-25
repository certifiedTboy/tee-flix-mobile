import { useGetTvShowsMutation } from "@/lib/apis/movies-apis";
import TvShowsCategories from "@/components/tv-shows/TvShowsCategories";
import CatalogFeatureHeader from "@/components/common/CatalogFeatureHeader";
import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";

const TvShowsScreen = () => {
  const [getTvShows, { data, isLoading }] = useGetTvShowsMutation();

  useEffect(() => {
    getTvShows(null);
  }, [getTvShows]);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    >
      <CatalogFeatureHeader
        eyebrow="TUNE INTO SOMETHING GOOD"
        greeting="Tonight deserves a great show."
        featureLabel="ON YOUR WATCHLIST"
        fallbackTitle="Find your next favorite show"
        fallbackDescription="Discover fresh episodes, fan favorites, and the next show you won't want to pause."
        mediaLabel="TV Show"
        icon="tv-outline"
        accent="#70d9cb"
        featuredItem={data?.results?.[0]}
        isLoading={isLoading}
        detailRoute={(id, title) => ({
          pathname: "/tvshows-details-screen",
          params: { tvShowId: id, title },
        })}
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
