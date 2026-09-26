import { StyleSheet, View } from "react-native";
import Skeleton from "./Skeleton";

const DescriptionTabSkeleton = () => (
  <View style={styles.container}>
    <Skeleton width="68%" height={23} radius={5} />
    <View style={styles.chevron} />
  </View>
);

export default DescriptionTabSkeleton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  chevron: {
    borderColor: "#27272f",
    borderRightWidth: 2,
    borderTopWidth: 2,
    height: 8,
    transform: [{ rotate: "45deg" }],
    width: 8,
  },
});
