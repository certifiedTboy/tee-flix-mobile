import { StyleSheet, View, useWindowDimensions } from "react-native";
import MediaPosterCardSkeleton from "./MediaPosterCardSkeleton";

const MovieList = ({ length }: { length: number }) => {
  const { width } = useWindowDimensions();
  const cardWidth = width / 2.3;

  const arrayData = Array.from({ length }).map((_, index) => index);
  return (
    <View style={styles.movieListContainer}>
      {arrayData.map((item: number) => {
        return <MediaPosterCardSkeleton width={cardWidth} key={item} />;
      })}
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  movieListContainer: {
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    paddingHorizontal: 8,
  },
});
