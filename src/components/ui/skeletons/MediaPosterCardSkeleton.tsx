import { StyleSheet, View } from "react-native";
import Skeleton from "./Skeleton";

const MediaPosterCardSkeleton = ({ width }: { width: number }) => (
  <View style={[styles.card, { width }]}>
    <View style={[styles.poster, { height: width / 0.68 }]}>
      <View style={styles.badges}>
        <Skeleton width={38} height={14} radius="round" />
        <Skeleton width={32} height={14} radius="round" />
      </View>
      <View style={styles.posterTitle}>
        <Skeleton width="90%" height={12} radius={4} />
        <Skeleton width="62%" height={12} radius={4} />
      </View>
    </View>
    <View style={styles.details}>
      <Skeleton width={12} height={12} radius="round" />
      <Skeleton width={82} height={10} radius={4} />
      <View style={styles.chevron} />
    </View>
  </View>
);

export default MediaPosterCardSkeleton;

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
  poster: {
    backgroundColor: "#202026",
    justifyContent: "space-between",
    overflow: "hidden",
    padding: 9,
  },
  badges: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  posterTitle: {
    gap: 6,
    paddingHorizontal: 2,
    paddingBottom: 2,
  },
  details: {
    alignItems: "center",
    flexDirection: "row",
    gap: 7,
    minHeight: 48,
    paddingHorizontal: 12,
  },
  chevron: {
    borderColor: "#27272f",
    borderRightWidth: 2,
    borderTopWidth: 2,
    height: 7,
    marginLeft: "auto",
    transform: [{ rotate: "45deg" }],
    width: 7,
  },
});
