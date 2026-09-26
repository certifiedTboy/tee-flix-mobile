import { StyleSheet, View } from "react-native";
import Skeleton from "./Skeleton";

const RecommendationCardSkeleton = ({
  width,
  isFirst = false,
}: {
  width: number;
  isFirst?: boolean;
}) => (
  <View
    style={[
      styles.card,
      { width },
      !isFirst && styles.cardSpacing,
    ]}
  >
    <View style={styles.poster}>
      <View style={styles.badges}>
        <Skeleton width={68} height={20} radius="round" />
        <Skeleton width={54} height={20} radius="round" />
      </View>
      <View style={styles.posterTitle}>
        <Skeleton width="91%" height={17} radius={5} />
        <Skeleton width="64%" height={17} radius={5} />
      </View>
    </View>
    <View style={styles.details}>
      <View style={styles.metadata}>
        <Skeleton width={36} height={9} radius={4} />
        <Skeleton width={28} height={12} radius={4} />
        <Skeleton width={58} height={9} radius={4} />
      </View>
      <View style={styles.overview}>
        <Skeleton width="100%" height={9} radius={4} />
        <Skeleton width="100%" height={9} radius={4} />
        <Skeleton width="76%" height={9} radius={4} />
      </View>
      <Skeleton width={116} height={10} radius={4} />
    </View>
  </View>
);

export default RecommendationCardSkeleton;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111116",
    borderColor: "#25252d",
    borderRadius: 19,
    borderWidth: 1,
    marginBottom: 16,
    overflow: "hidden",
  },
  cardSpacing: { marginLeft: 13 },
  poster: {
    backgroundColor: "#29252a",
    height: 245,
    justifyContent: "space-between",
    padding: 12,
  },
  badges: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  posterTitle: { gap: 7, paddingHorizontal: 3, paddingBottom: 3 },
  details: { paddingHorizontal: 15, paddingTop: 12, paddingBottom: 15 },
  metadata: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginBottom: 9,
  },
  overview: { gap: 6, marginBottom: 12 },
});
