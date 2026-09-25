import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import MovieCard from "./MovieCard";

const RecommendedMovies = ({ movies }: { movies: any[] }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recommended Movies</Text>

      <View style={styles.cardContainer}>
        {movies &&
          movies.length > 0 &&
          movies.map((item: any) => {
            return (
              <MovieCard
                title={item?.original_title || item?.original_name}
                poster_image={item?.poster_path}
                rating={item?.vote_average}
                release_date={item?.release_date || item?.first_air_date}
                movieId={item?.id}
                key={item.id}
              />
            );
          })}
      </View>
    </View>
  );
};

export default RecommendedMovies;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },

  text: {
    color: Colors.Secondary300,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  cardContainer: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});
