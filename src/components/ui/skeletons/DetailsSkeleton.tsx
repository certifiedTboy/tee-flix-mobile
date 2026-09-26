import { StyleSheet, View, useWindowDimensions } from "react-native";
import Skeleton from "./Skeleton";
import RecommendationCardSkeleton from "./RecommendationCardSkeleton";

const DetailsSkeleton = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Skeleton width="100%" height={200} radius={0} />

      <View style={styles.details}>
        <Skeleton width="76%" height={27} radius={5} />
        <Skeleton width="52%" height={13} radius={4} />

        <View style={styles.metadata}>
          <View style={styles.metadataColumn}>
            <Skeleton width={112} height={12} radius={4} />
            <Skeleton width={76} height={12} radius={4} />
          </View>
          <View style={styles.metadataColumn}>
            <Skeleton width={118} height={12} radius={4} />
            <Skeleton width={86} height={12} radius={4} />
          </View>
        </View>

        <View style={styles.playButton}>
          <Skeleton width={38} height={30} radius={5} />
        </View>

        <View style={styles.overview}>
          <Skeleton width="96%" height={12} radius={4} />
          <Skeleton width="100%" height={12} radius={4} />
          <Skeleton width="88%" height={12} radius={4} />
          <Skeleton width="63%" height={12} radius={4} />
        </View>
      </View>

      <View style={styles.recommendations}>
        <Skeleton width={190} height={22} radius={5} />
        <Skeleton width={172} height={11} radius={4} />
      </View>

      <View style={styles.recommendationList}>
        <RecommendationCardSkeleton
          width={Math.min(width * 0.72, 300)}
          isFirst
        />
        <RecommendationCardSkeleton width={Math.min(width * 0.72, 300)} />
      </View>
    </View>
  );
};

export default DetailsSkeleton;

const styles = StyleSheet.create({
  container: { flex: 1 },
  details: { paddingHorizontal: 10, paddingTop: 10 },
  metadata: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 0,
    marginTop: 12,
  },
  metadataColumn: { gap: 8 },
  playButton: {
    alignItems: "center",
    backgroundColor: "#27272f",
    height: 54,
    justifyContent: "center",
    marginHorizontal: -10,
    marginTop: 16,
  },
  overview: {
    gap: 7,
    marginHorizontal: -4,
    marginTop: 4,
    paddingBottom: 4,
  },
  recommendations: {
    gap: 6,
    marginTop: 26,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  recommendationList: { flexDirection: "row", overflow: "hidden" },
});
