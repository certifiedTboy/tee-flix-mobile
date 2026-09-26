import { useGetLatestMoviesMutation } from "@/lib/apis/movies-apis";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieSwiper from "../components/home/MovieSwiper";
import Icon from "../components/ui/Icon";
import FeatureContentSkeleton from "../components/ui/skeletons/FeatureContentSkeleton";
import { Colors } from "../constants/Colors";

const imageUrl = process.env.EXPO_PUBLIC_API_IMAGE_URL;

const HomeScreen = () => {
  const [getLatestMovies, { data, isLoading }] = useGetLatestMoviesMutation();
  const featuredMovie = data?.results?.[0];

  useEffect(() => {
    getLatestMovies(null);
  }, [getLatestMovies]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom", "left", "right"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <View>
            <Text style={styles.eyebrow}>GOOD EVENING</Text>
            <Text style={styles.greeting}>What will you watch?</Text>
          </View>
          <Pressable style={styles.avatar} accessibilityLabel="Open profile">
            <Text style={styles.avatarText}>T</Text>
          </Pressable>
        </View>

        <View style={styles.hero}>
          {featuredMovie?.backdrop_path ? (
            <ImageBackground
              source={{ uri: `${imageUrl}${featuredMovie.backdrop_path}` }}
              style={styles.heroImage}
              imageStyle={styles.heroImageRadius}
            >
              <LinearGradient
                colors={["rgba(8, 9, 14, 0.08)", "rgba(8, 9, 14, 0.98)"]}
                style={styles.heroGradient}
              >
                <FeaturedContent movie={featuredMovie} />
              </LinearGradient>
            </ImageBackground>
          ) : (
            <LinearGradient
              colors={["#392a08", "#111116", "#08090e"]}
              style={styles.heroImage}
            >
              {isLoading && !featuredMovie ? (
                <FeatureContentSkeleton />
              ) : (
                <FeaturedContent movie={featuredMovie} />
              )}
            </LinearGradient>
          )}
        </View>

        <View style={styles.quickActions}>
          <QuickAction
            icon="film-outline"
            label="Movies"
            href="/explore-movies-screen"
          />
          <QuickAction
            icon="logo-youtube"
            label="Series"
            href="/explore-series-screen"
          />
          <QuickAction
            icon="tv-outline"
            label="TV Shows"
            href="/explore-tvshows-screen"
          />
        </View>

        <MovieSwiper />
      </ScrollView>
    </SafeAreaView>
  );
};

const FeaturedContent = ({ movie }: { movie?: any }) => (
  <View style={styles.featuredContent}>
    <View style={styles.featuredBadge}>
      <View style={styles.liveDot} />
      <Text style={styles.featuredBadgeText}>FEATURED TONIGHT</Text>
    </View>
    <Text style={styles.featuredTitle} numberOfLines={2}>
      {movie?.original_title || "Stories worth staying up for"}
    </Text>
    <View style={styles.metaRow}>
      <Text style={styles.metaAccent}>
        ★ {Number(movie?.vote_average || 0).toFixed(1)}
      </Text>
      <Text style={styles.metaText}>
        {movie?.release_date?.slice(0, 4) || "2025"}
      </Text>
      <Text style={styles.metaText}>Movie</Text>
    </View>
    <Text style={styles.featuredDescription} numberOfLines={2}>
      {movie?.overview ||
        "Discover a hand-picked collection of unforgettable movies, series, and shows."}
    </Text>
    {movie?.id ? (
      <Link
        href={{
          pathname: "/movie-details-screen",
          params: { movieId: movie.id, title: movie.original_title },
        }}
        asChild
      >
        <Pressable style={styles.watchButton}>
          <Icon name="play" size={16} color={Colors.Primary200} />
          <Text style={styles.watchButtonText}>Watch details</Text>
        </Pressable>
      </Link>
    ) : null}
  </View>
);

const QuickAction = ({
  icon,
  label,
  href,
}: {
  icon: "film-outline" | "logo-youtube" | "tv-outline";
  label: string;
  href:
    | "/explore-movies-screen"
    | "/explore-series-screen"
    | "/explore-tvshows-screen";
}) => (
  <Link href={href} asChild>
    <Pressable style={styles.quickAction}>
      <View style={styles.quickIcon}>
        <Icon name={icon} size={19} color={Colors.Primary100} />
      </View>
      <Text style={styles.quickActionText}>{label}</Text>
      <Icon name="chevron-forward" size={14} color={Colors.Secondary200} />
    </Pressable>
  </Link>
);

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.Primary200 },
  container: { flex: 1, backgroundColor: Colors.Primary200 },
  contentContainer: { paddingBottom: 28 },
  intro: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 16,
  },
  eyebrow: {
    color: Colors.Primary100,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
  },
  greeting: {
    color: Colors.Secondary300,
    fontSize: 24,
    fontWeight: "800",
    marginTop: 5,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: "#25252d",
    borderColor: "#3b3b45",
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  avatarText: { color: Colors.Primary100, fontSize: 17, fontWeight: "800" },
  hero: {
    borderRadius: 22,
    height: Dimensions.get("window").width * 0.9,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  heroImage: { flex: 1, justifyContent: "flex-end" },
  heroImageRadius: { borderRadius: 22 },
  heroGradient: { flex: 1, justifyContent: "flex-end" },
  featuredContent: { padding: 20 },
  featuredBadge: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  liveDot: {
    backgroundColor: Colors.Primary100,
    borderRadius: 4,
    height: 7,
    marginRight: 7,
    width: 7,
  },
  featuredBadgeText: {
    color: Colors.Primary100,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.3,
  },
  featuredTitle: {
    color: Colors.Secondary300,
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 34,
    maxWidth: "92%",
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 13,
    marginTop: 11,
  },
  metaAccent: { color: Colors.Primary100, fontSize: 13, fontWeight: "800" },
  metaText: { color: "#d5d5da", fontSize: 12 },
  featuredDescription: {
    color: "#c0c0c8",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
    maxWidth: "95%",
  },
  watchButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: Colors.Primary100,
    borderRadius: 9,
    flexDirection: "row",
    gap: 8,
    marginTop: 17,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  watchButtonText: {
    color: Colors.Primary200,
    fontSize: 12,
    fontWeight: "800",
  },
  quickActions: { gap: 8, paddingHorizontal: 16, paddingVertical: 18 },
  quickAction: {
    alignItems: "center",
    backgroundColor: "#15151c",
    borderColor: "#262630",
    borderRadius: 13,
    borderWidth: 1,
    flexDirection: "row",
    padding: 11,
  },
  quickIcon: {
    alignItems: "center",
    backgroundColor: "#2a2412",
    borderRadius: 9,
    height: 34,
    justifyContent: "center",
    marginRight: 11,
    width: 34,
  },
  quickActionText: {
    color: Colors.Secondary300,
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
  },
});
