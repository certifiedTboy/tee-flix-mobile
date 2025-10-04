import { Dimensions, StyleSheet, View } from "react-native";
import Skeleton from "./Skeleton";

const MovieList = ({ length }: { length: number }) => {
  const width = Dimensions.get("window").width / 2.4;

  const arrayData = Array.from({ length }).map((_, index) => index);
  return (
    <View style={styles.movieListContainer}>
      {arrayData.map((item: number) => {
        return <Skeleton width={width} height={200} radius={10} key={item} />;
      })}
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  movieListContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: "auto",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    marginVertical: 20,
    gap: 20,
  },
});
