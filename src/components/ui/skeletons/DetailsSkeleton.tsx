import { StyleSheet, View } from "react-native";
import Skeleton from "./Skeleton";

const DetailsSkeleton = () => {
  return (
    <>
      <View style={styles.player}>
        <Skeleton width="95%" height={180} radius={10} />
      </View>

      <View style={styles.overview}>
        <Skeleton width="95%" height={100} radius={5} />
      </View>

      <View style={styles.playBtn}>
        <Skeleton width="95%" height={50} radius={5} />
      </View>
    </>
  );
};

export default DetailsSkeleton;

const styles = StyleSheet.create({
  player: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  overview: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  playBtn: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
