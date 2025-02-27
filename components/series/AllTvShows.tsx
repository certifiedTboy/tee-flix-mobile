import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import SeriesCard from "../common/SeriesCard";
import { useGetTvShowsMutation } from "../../lib/apis/movieApis";
import { Colors } from "../../constants/colors";

const AllTvShows = () => {
  const [getTvShows, { data }] = useGetTvShowsMutation();

  useEffect(() => {
    getTvShows(null);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>All Series</Text> */}
      <View style={styles.cardContainer}>
        {data?.results?.length > 0 &&
          data?.results.map((item: any) => (
            <SeriesCard
              key={item.id}
              title={item?.name}
              poster_image={item?.poster_path}
              rating={item?.vote_average}
              release_date={item?.first_air_date}
              movieId={item?.id}
            />
          ))}
      </View>
    </View>
  );
};

export default AllTvShows;

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
