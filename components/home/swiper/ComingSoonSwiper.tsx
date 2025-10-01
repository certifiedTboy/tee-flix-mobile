import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { useGetUpcomingMoviesMutation } from "../../../lib/apis/movieApis";
import DescriptionTab from "../../common/DescriptionTab";
import OtherMovieCard from "../../common/OtherMovieCard";

const ComingSoonSwiper = () => {
  const [getUpcomingMovies, { data }] = useGetUpcomingMoviesMutation();

  const navigation = useNavigation();

  useEffect(() => {
    getUpcomingMovies(null);
  }, []);
  return (
    <>
      <DescriptionTab
        title="Coming Soon"
        onPress={() =>
          // @ts-ignore
          navigation.navigate("AllMovies", {
            category: "upcoming",
            categoryTitle: "Coming Soon",
          })
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
            <OtherMovieCard
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
