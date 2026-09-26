import { StyleSheet, View } from "react-native";
import Skeleton from "./Skeleton";

const FeatureContentSkeleton = ({ padding = 20 }: { padding?: number }) => (
  <View style={[styles.container, { padding }]}>
    <View style={styles.content}>
      <View style={styles.badge}>
        <Skeleton width={7} height={7} radius="round" />
        <Skeleton width={112} height={8} radius={4} />
      </View>
      <View style={styles.title}>
        <Skeleton width="82%" height={27} radius={5} />
        <Skeleton width="58%" height={27} radius={5} />
      </View>
      <View style={styles.metadata}>
        <Skeleton width={38} height={10} radius={4} />
        <Skeleton width={34} height={10} radius={4} />
        <Skeleton width={40} height={10} radius={4} />
      </View>
      <View style={styles.description}>
        <Skeleton width="96%" height={9} radius={4} />
        <Skeleton width="79%" height={9} radius={4} />
      </View>
      <Skeleton width={142} height={36} radius={9} />
    </View>
  </View>
);

export default FeatureContentSkeleton;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-end" },
  content: { gap: 0 },
  badge: {
    alignItems: "center",
    flexDirection: "row",
    gap: 7,
    marginBottom: 9,
  },
  title: { gap: 7 },
  metadata: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  description: {
    gap: 6,
    marginTop: 10,
    marginBottom: 14,
  },
});
