import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import {
  useFetchNowPlayingMoviesMutation,
  useGetLatestMoviesMutation,
  useGetUpcomingMoviesMutation,
} from "../../lib/apis/movieApis";
import OtherMovieCard from "../common/OtherMovieCard";

const AllMovies: React.FC<{ type: string }> = ({ type }) => {
  const [fetchNowPlayingMovies, { data }] = useFetchNowPlayingMoviesMutation();
  const [getUpcomingMovies, { data: upcomingData }] =
    useGetUpcomingMoviesMutation();
  const [getLatestMovies, { data: latestData }] = useGetLatestMoviesMutation();

  useEffect(() => {
    if (type === "now_playing") {
      fetchNowPlayingMovies(null);
    } else if (type === "coming_soon") {
      getUpcomingMovies(null);
    } else {
      getLatestMovies(null);
    }
  }, [type]);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {type === "now_playing" &&
          data?.results?.length > 0 &&
          data?.results.map((item: any) => (
            <OtherMovieCard
              key={item.id}
              title={item?.original_title}
              poster_image={item?.poster_path}
              rating={item?.vote_average}
              release_date={item?.release_date}
              movieId={item?.id}
            />
          ))}

        {type === "coming_soon" &&
          upcomingData?.results?.length > 0 &&
          upcomingData?.results.map((item: any) => (
            <OtherMovieCard
              key={item.id}
              title={item?.original_title}
              poster_image={item?.poster_path}
              rating={item?.vote_average}
              release_date={item?.release_date}
              movieId={item?.id}
            />
          ))}

        {type === "popular_movie" &&
          latestData?.results?.length > 0 &&
          latestData?.results.map((item: any) => (
            <OtherMovieCard
              key={item.id}
              title={item?.original_title}
              poster_image={item?.poster_path}
              rating={item?.vote_average}
              release_date={item?.release_date}
              movieId={item?.id}
            />
          ))}
      </View>
    </View>
  );
};

export default AllMovies;

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
