import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";

type MediaCardHref =
  | {
      pathname: "/movie-details-screen";
      params: { movieId?: number; title?: string };
    }
  | {
      pathname: "/series-details-screen";
      params: { seriesId?: number; title?: string };
    }
  | {
      pathname: "/tvshows-details-screen";
      params: { tvShowId?: number; title?: string };
    };

type MediaPosterCardProps = {
  title?: string;
  posterImage?: ImageSourcePropType | null;
  releaseDate?: string;
  rating?: number | string;
  mediaLabel: "MOVIE" | "SERIES" | "TV SHOW";
  href: MediaCardHref;
  accessibilityLabel: string;
};

const imageUrl = process.env.EXPO_PUBLIC_API_IMAGE_URL;
const cardWidth = Dimensions.get("window").width / 2.3;

const MediaPosterCard = ({
  title,
  posterImage,
  releaseDate,
  rating,
  mediaLabel,
  href,
  accessibilityLabel,
}: MediaPosterCardProps) => {
  const numericRating = Number(rating);
  const posterSource =
    typeof posterImage === "string"
      ? imageUrl && posterImage
        ? { uri: `${imageUrl}${posterImage}` }
        : undefined
      : (posterImage ?? undefined);
  const year = releaseDate?.slice(0, 4);

  return (
    <Link href={href} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={({ pressed }) =>
          StyleSheet.flatten([
            styles.card,
            { width: cardWidth },
            pressed && styles.pressed,
          ])
        }
      >
        <View style={styles.posterFrame}>
          {posterSource ? (
            <Image
              source={posterSource}
              style={styles.poster}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.poster, styles.posterFallback]}>
              <Ionicons name="film-outline" size={32} color="#64646d" />
            </View>
          )}
          <LinearGradient
            colors={[
              "rgba(5, 6, 9, 0.20)",
              "rgba(5, 6, 9, 0.02)",
              "rgba(5, 6, 9, 0.76)",
            ]}
            locations={[0, 0.48, 1]}
            style={styles.posterGradient}
          />
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{mediaLabel}</Text>
          </View>
          {Number.isFinite(numericRating) && numericRating > 0 ? (
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={7} color={Colors.Primary100} />
              <Text style={styles.ratingText}>{numericRating.toFixed(1)}</Text>
            </View>
          ) : null}
          <View style={styles.posterFooter}>
            <Text numberOfLines={2} style={styles.posterTitle}>
              {title || "Untitled"}
            </Text>
          </View>
        </View>
        <View style={styles.details}>
          <View style={styles.metadata}>
            <Ionicons
              name="calendar-outline"
              size={12}
              color={Colors.Primary100}
            />
            <Text style={styles.releaseText}>{year || "Release date TBA"}</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={15}
            color={Colors.Secondary200}
          />
        </View>
      </Pressable>
    </Link>
  );
};

export default MediaPosterCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#121216",
    borderColor: "#27272f",
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 7,
    marginBottom: 30,
    overflow: "hidden",
  },
  pressed: { opacity: 0.88, transform: [{ scale: 0.98 }] },
  posterFrame: {
    aspectRatio: 0.68,
    backgroundColor: "#202026",
    overflow: "hidden",
    position: "relative",
  },
  poster: { height: "100%", position: "absolute", width: "100%" },
  posterFallback: {
    alignItems: "center",
    justifyContent: "center",
  },
  posterGradient: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  typeBadge: {
    backgroundColor: "rgba(12, 12, 16, 0.76)",
    borderColor: "rgba(255,255,255,0.13)",
    borderRadius: 12,
    borderWidth: 1,
    left: 9,
    paddingHorizontal: 4,
    paddingVertical: 5,
    position: "absolute",
    top: 9,
  },
  typeText: {
    color: "#f1f1f3",
    fontSize: 5,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  ratingBadge: {
    alignItems: "center",
    backgroundColor: "rgba(12, 12, 16, 0.82)",
    borderRadius: 12,
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 5,
    paddingVertical: 5,
    position: "absolute",
    right: 9,
    top: 9,
  },
  ratingText: { color: "#fff", fontSize: 7, fontWeight: "800" },
  posterFooter: { bottom: 11, left: 11, position: "absolute", right: 11 },
  posterTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 19,
  },
  details: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 48,
    paddingHorizontal: 12,
  },
  metadata: { alignItems: "center", flexDirection: "row", gap: 7 },
  releaseText: { color: "#c4c4cb", fontSize: 11, fontWeight: "600" },
});
