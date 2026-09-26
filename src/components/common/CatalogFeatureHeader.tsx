import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";
import FeatureContentSkeleton from "../ui/skeletons/FeatureContentSkeleton";

type CatalogRoute =
  | "/explore-movies-screen"
  | "/explore-series-screen"
  | "/explore-tvshows-screen";

type FeaturedRoute =
  | {
      pathname: "/movie-details-screen";
      params: { movieId: number; title: string };
    }
  | {
      pathname: "/series-details-screen";
      params: { seriesId: number; title: string };
    }
  | {
      pathname: "/tvshows-details-screen";
      params: { tvShowId: number; title: string };
    };

type FeaturedItem = {
  id?: number;
  original_title?: string;
  original_name?: string;
  name?: string;
  backdrop_path?: string | null;
  overview?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
};

type CatalogFeatureHeaderProps = {
  eyebrow: string;
  greeting: string;
  featureLabel: string;
  fallbackTitle: string;
  fallbackDescription: string;
  mediaLabel: string;
  icon: "film-outline" | "logo-youtube" | "tv-outline";
  accent: string;
  featuredItem?: FeaturedItem;
  isLoading: boolean;
  detailRoute: (id: number, title: string) => FeaturedRoute;
};

const imageUrl = process.env.EXPO_PUBLIC_API_IMAGE_URL;

const CatalogFeatureHeader = ({
  eyebrow,
  greeting,
  featureLabel,
  fallbackTitle,
  fallbackDescription,
  mediaLabel,
  icon,
  accent,
  featuredItem,
  isLoading,
  detailRoute,
}: CatalogFeatureHeaderProps) => {
  const [imageFailed, setImageFailed] = useState(false);
  const title =
    featuredItem?.original_title ||
    featuredItem?.original_name ||
    featuredItem?.name ||
    fallbackTitle;
  const backdropUri =
    imageUrl && featuredItem?.backdrop_path
      ? `${imageUrl}${featuredItem.backdrop_path}`
      : undefined;
  const backdrop = !imageFailed ? backdropUri : undefined;
  const releaseDate =
    featuredItem?.release_date || featuredItem?.first_air_date;
  const rating = Number(featuredItem?.vote_average);
  const year = releaseDate?.slice(0, 4);
  const hasFeaturedDetails = Boolean(featuredItem?.id);
  const gradient = (
    <LinearGradient
      colors={["rgba(8, 9, 14, 0.12)", "rgba(8, 9, 14, 0.96)"]}
      style={styles.heroGradient}
    >
      <View style={styles.featuredContent}>
        <View style={styles.featuredBadge}>
          <View style={[styles.liveDot, { backgroundColor: accent }]} />
          <Text style={[styles.featuredBadgeText, { color: accent }]}>
            {featureLabel}
          </Text>
        </View>
        <Text style={styles.featuredTitle} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.metaRow}>
          {Number.isFinite(rating) && rating > 0 ? (
            <Text style={[styles.metaAccent, { color: accent }]}>
              ★ {rating.toFixed(1)}
            </Text>
          ) : null}
          {year ? <Text style={styles.metaText}>{year}</Text> : null}
          <Text style={styles.metaText}>{mediaLabel}</Text>
        </View>
        <Text style={styles.featuredDescription} numberOfLines={2}>
          {featuredItem?.overview?.trim() || fallbackDescription}
        </Text>
        {hasFeaturedDetails && featuredItem?.id ? (
          <Link href={detailRoute(featuredItem.id, title)} asChild>
            <Pressable
              style={StyleSheet.flatten([
                styles.watchButton,
                { backgroundColor: accent },
              ])}
              accessibilityLabel={`View details for ${title}`}
            >
              <Ionicons name="play" size={15} color="#101014" />
              <Text style={styles.watchButtonText}>Discover this title</Text>
            </Pressable>
          </Link>
        ) : null}
      </View>
    </LinearGradient>
  );

  return (
    <>
      <View style={styles.intro}>
        <View style={styles.introCopy}>
          <Text style={[styles.eyebrow, { color: accent }]}>{eyebrow}</Text>
          <Text style={styles.greeting}>{greeting}</Text>
        </View>
        <View
          style={[styles.avatar, { borderColor: `${accent}55` }]}
          accessible
          accessibilityLabel="Tee-Flix"
        >
          <Text style={[styles.avatarText, { color: accent }]}>T</Text>
        </View>
      </View>

      <View style={styles.hero}>
        {backdrop ? (
          <ImageBackground
            source={{ uri: backdrop }}
            style={styles.heroImage}
            imageStyle={styles.heroImageRadius}
            onError={() => setImageFailed(true)}
          >
            {gradient}
          </ImageBackground>
        ) : (
          <LinearGradient
            colors={[`${accent}52`, "#17171d", "#08090e"]}
            style={styles.heroImage}
          >
            {isLoading && !featuredItem ? (
              <FeatureContentSkeleton padding={18} />
            ) : (
              gradient
            )}
          </LinearGradient>
        )}
      </View>
    </>
  );
};

export default CatalogFeatureHeader;

const styles = StyleSheet.create({
  intro: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 16,
  },
  introCopy: { flex: 1, paddingRight: 12 },
  eyebrow: { fontSize: 9, fontWeight: "800", letterSpacing: 1.8 },
  greeting: {
    color: Colors.Secondary300,
    fontSize: 23,
    fontWeight: "800",
    marginTop: 5,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: "#1c1c23",
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  avatarText: { fontSize: 17, fontWeight: "800" },
  hero: {
    borderRadius: 22,
    height: 330,
    marginHorizontal: 16,
    overflow: "hidden",
    marginBottom: 30,
  },
  heroImage: { flex: 1, justifyContent: "flex-end" },
  heroImageRadius: { borderRadius: 22 },
  heroGradient: { flex: 1, justifyContent: "flex-end" },
  featuredContent: { padding: 18 },
  featuredBadge: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 9,
  },
  liveDot: { borderRadius: 4, height: 7, marginRight: 7, width: 7 },
  featuredBadgeText: { fontSize: 9, fontWeight: "800", letterSpacing: 1.2 },
  featuredTitle: {
    color: Colors.Secondary300,
    fontSize: 26,
    fontWeight: "900",
    lineHeight: 30,
    maxWidth: "95%",
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    marginTop: 9,
  },
  metaAccent: { fontSize: 12, fontWeight: "800" },
  metaText: { color: "#d5d5da", fontSize: 11 },
  featuredDescription: {
    color: "#c0c0c8",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 8,
    maxWidth: "97%",
  },
  watchButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: 9,
    flexDirection: "row",
    gap: 8,
    marginTop: 13,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  watchButtonText: { color: "#101014", fontSize: 11, fontWeight: "800" },
  quickActions: { gap: 7, paddingHorizontal: 16, paddingVertical: 16 },
  quickAction: {
    alignItems: "center",
    backgroundColor: "#15151c",
    borderColor: "#262630",
    borderRadius: 13,
    borderWidth: 1,
    flexDirection: "row",
    padding: 9,
  },
  quickActionPressed: { opacity: 0.75 },
  quickIcon: {
    alignItems: "center",
    borderRadius: 8,
    height: 31,
    justifyContent: "center",
    marginRight: 10,
    width: 31,
  },
  quickActionText: {
    color: Colors.Secondary300,
    flex: 1,
    fontSize: 12,
    fontWeight: "700",
  },
});
