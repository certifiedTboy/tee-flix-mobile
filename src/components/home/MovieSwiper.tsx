import { useGetOtherMovieCategoryMutation } from "@/lib/apis/movies-apis";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";

type NowPlayingMovie = {
  id: number;
  original_title?: string;
  poster_path?: string | null;
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
  original_language?: string;
  overview?: string;
};

const imageUrl = process.env.EXPO_PUBLIC_API_IMAGE_URL;

const MovieSwiper = () => {
  const [getMovies, { data, isLoading, isError }] =
    useGetOtherMovieCategoryMutation();
  const { width } = useWindowDimensions();

  useEffect(() => {
    getMovies("now_playing");
  }, [getMovies]);

  const movies: NowPlayingMovie[] = data?.results ?? [];
  const cardWidth = Math.min(width * 0.72, 300);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeading}>
        <View style={styles.headingCopy}>
          <View style={styles.eyebrowRow}>
            <View style={styles.liveDot} />
            <Text style={styles.eyebrow}>IN THEATERS NOW</Text>
          </View>
          <Text style={styles.sectionTitle}>Now playing</Text>
          <Text style={styles.sectionSubtitle}>
            A closer look at what’s on the big screen
          </Text>
        </View>
        <Link
          href={{
            pathname: "/explore-movies-screen",
            params: { title: "Now Playing", category: "now_playing" },
          }}
          style={styles.seeAll}
        >
          <Text style={styles.seeAllText}>See all</Text>
          <Ionicons name="arrow-forward" size={15} color={Colors.Primary100} />
        </Link>
      </View>

      {isLoading ? (
        <View style={styles.status}>
          <ActivityIndicator color={Colors.Primary100} />
          <Text style={styles.statusText}>Finding your next movie…</Text>
        </View>
      ) : isError ? (
        <View style={styles.status}>
          <Text style={styles.statusText}>
            We couldn’t load movies right now. Please try again later.
          </Text>
        </View>
      ) : movies.length === 0 ? (
        <View style={styles.status}>
          <Text style={styles.statusText}>
            No now-playing movies are available right now.
          </Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => (
            <MovieCard movie={item} width={cardWidth} index={index} />
          )}
        />
      )}
    </View>
  );
};

const MovieCard = ({
  movie,
  width,
  index,
}: {
  movie: NowPlayingMovie;
  width: number;
  index: number;
}) => {
  const rating = Number(movie.vote_average);
  const year = movie.release_date?.slice(0, 4);
  const posterUri =
    imageUrl && movie.poster_path ? `${imageUrl}${movie.poster_path}` : null;
  const title = movie.original_title || "Untitled movie";

  return (
    <Link
      href={{
        pathname: "/movie-details-screen",
        params: { movieId: movie.id, title },
      }}
      asChild
    >
      <Pressable
        accessibilityLabel={`${title}, rated ${
          Number.isFinite(rating) ? rating.toFixed(1) : "not rated"
        }`}
        style={({ pressed }) => [
          styles.card,
          { width },
          index > 0 && styles.cardSpacing,
          pressed && styles.cardPressed,
        ]}
      >
        <View style={styles.posterFrame}>
          {posterUri ? (
            <Image
              source={{ uri: posterUri }}
              style={styles.poster}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.poster, styles.posterFallback]} />
          )}
          <LinearGradient
            colors={["rgba(7, 8, 12, 0.16)", "rgba(7, 8, 12, 0.02)", "#111116"]}
            locations={[0, 0.48, 1]}
            style={styles.posterGradient}
          />
          <View style={styles.nowPlayingBadge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>NOW PLAYING</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color={Colors.Primary100} />
            <Text style={styles.ratingText}>
              {Number.isFinite(rating) && rating > 0 ? rating.toFixed(1) : "NR"}
            </Text>
          </View>
          <Text numberOfLines={2} style={styles.posterTitle}>
            {title}
          </Text>
        </View>

        <View style={styles.cardDetails}>
          <View style={styles.metadataRow}>
            {year ? (
              <Text style={styles.metadataText}>{year}</Text>
            ) : null}
            {movie.original_language ? (
              <Text style={styles.languageTag}>
                {movie.original_language.toUpperCase()}
              </Text>
            ) : null}
            {typeof movie.vote_count === "number" && movie.vote_count > 0 ? (
              <Text style={styles.metadataText}>
                {movie.vote_count.toLocaleString()} votes
              </Text>
            ) : null}
          </View>
          <Text numberOfLines={3} style={styles.overview}>
            {movie.overview?.trim() || "Discover the story behind this movie."}
          </Text>
          <View style={styles.detailsLink}>
            <Text style={styles.detailsLinkText}>Explore movie</Text>
            <Ionicons name="arrow-forward" size={14} color={Colors.Primary100} />
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default MovieSwiper;

const styles = StyleSheet.create({
  container: { marginTop: 26 },
  sectionHeading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headingCopy: { flex: 1 },
  eyebrowRow: { alignItems: "center", flexDirection: "row", marginBottom: 6 },
  liveDot: {
    backgroundColor: Colors.Primary100,
    borderRadius: 4,
    height: 7,
    marginRight: 7,
    width: 7,
  },
  eyebrow: {
    color: Colors.Primary100,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  sectionTitle: { color: Colors.Secondary300, fontSize: 21, fontWeight: "800" },
  sectionSubtitle: {
    color: Colors.Secondary200,
    fontSize: 11,
    marginTop: 4,
  },
  seeAll: { alignItems: "center", flexDirection: "row", gap: 6, padding: 6 },
  seeAllText: { color: Colors.Primary100, fontSize: 12, fontWeight: "700" },
  card: {
    backgroundColor: "#111116",
    borderColor: "#25252d",
    borderRadius: 19,
    borderWidth: 1,
    marginBottom: 16,
    overflow: "hidden",
  },
  cardSpacing: { marginLeft: 13 },
  cardPressed: { opacity: 0.92, transform: [{ scale: 0.985 }] },
  posterFrame: { height: 245, overflow: "hidden", position: "relative" },
  poster: { height: "100%", position: "absolute", width: "100%" },
  posterFallback: { backgroundColor: "#29252a" },
  posterGradient: {
    bottom: 0,
    height: "75%",
    left: 0,
    position: "absolute",
    right: 0,
  },
  nowPlayingBadge: {
    alignItems: "center",
    backgroundColor: "rgba(14, 14, 18, 0.78)",
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
    position: "absolute",
    top: 12,
  },
  badgeDot: {
    backgroundColor: Colors.Primary100,
    borderRadius: 3,
    height: 6,
    marginRight: 6,
    width: 6,
  },
  badgeText: {
    color: Colors.Secondary300,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  ratingBadge: {
    alignItems: "center",
    backgroundColor: "rgba(14, 14, 18, 0.8)",
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
    position: "absolute",
    right: 12,
    top: 12,
  },
  ratingText: { color: Colors.Secondary300, fontSize: 11, fontWeight: "800" },
  posterTitle: {
    bottom: 15,
    color: Colors.Secondary300,
    fontSize: 21,
    fontWeight: "900",
    left: 15,
    lineHeight: 25,
    position: "absolute",
    right: 15,
  },
  cardDetails: { paddingHorizontal: 15, paddingTop: 12, paddingBottom: 15 },
  metadataRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 9,
  },
  metadataText: { color: "#d1d1d7", fontSize: 10, fontWeight: "600" },
  languageTag: {
    backgroundColor: "#25252d",
    borderRadius: 5,
    color: "#d1d1d7",
    fontSize: 8,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  overview: { color: Colors.Secondary200, fontSize: 11, lineHeight: 16 },
  detailsLink: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    marginTop: 12,
  },
  detailsLinkText: { color: Colors.Primary100, fontSize: 11, fontWeight: "700" },
  listContent: { paddingHorizontal: 20, paddingBottom: 4 },
  status: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    minHeight: 120,
    paddingHorizontal: 22,
  },
  statusText: { color: Colors.Secondary200, fontSize: 12, lineHeight: 18 },
});
