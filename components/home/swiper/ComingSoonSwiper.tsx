import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import DescriptionTab from "../../common/DescriptionTab";
import MovieCard from "../../common/MovieCard";
import { useGetUpcomingMoviesMutation } from "../../../lib/apis/movieApis";

// const { width, height } = Dimensions.get("window");

const ComingSoonSwiper = () => {
  const [getUpcomingMovies, { data }] = useGetUpcomingMoviesMutation();

  const navigation = useNavigation();

  useEffect(() => {
    getUpcomingMovies(null);
  }, []);
  return (
    <>
      <DescriptionTab
        title="COMING SOON"
        onPress={() =>
          navigation.navigate("AllMovies", { type: "coming_soon" })
        }
      />

      <View style={styles.container}>
        <SwiperFlatList
          // autoplay
          // autoplayDelay={2}
          // autoplayLoop
          // index={2}
          // showPagination
          data={data?.results?.slice(0, 11)}
          renderItem={({ item }) => (
            <MovieCard
              title={item?.original_title}
              poster_image={item?.poster_path}
              rating={item?.vote_average}
              release_date={item?.release_date}
              movieId={item?.id}
            />
          )}
        />
      </View>
    </>
  );
};

export default ComingSoonSwiper;

const styles = StyleSheet.create({
  container: { paddingTop: 20 },
});
