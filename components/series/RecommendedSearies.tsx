import { Text, View, StyleSheet } from "react-native";
import OtherMovieCard from "../common/OtherMovieCard";
import SeriesCard from "../common/SeriesCard";
import { Colors } from "../../constants/colors";

const RecommendedSeries: React.FC<{ movies: {}[] }> = ({ movies }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recommended Shows</Text>

      <View style={styles.cardContainer}>
        {movies &&
          movies.length > 0 &&
          movies.map((item: any) => {
            return (
              <SeriesCard
                title={item?.original_name}
                poster_image={item?.poster_path}
                rating={item?.vote_average}
                release_date={item?.first_air_date}
                movieId={item?.id}
                key={item.id}
              />
            );
          })}
      </View>
    </View>
  );
};

export default RecommendedSeries;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    justifyContent: "space-evenly",
  },
});
