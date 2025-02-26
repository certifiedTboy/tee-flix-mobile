import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import DescriptionTab from "../../common/DescriptionTab";
import SeriesCard from "../../common/SeriesCard";
import { useGetAllSeriesMutation } from "../../../lib/apis/movieApis";

const TvShowsSwiper = () => {
  const [getAllSeries, { data }] = useGetAllSeriesMutation();

  const navigation = useNavigation();

  useEffect(() => {
    getAllSeries(null);
  }, []);
  return (
    <>
      <DescriptionTab
        title="TV SHOWS / SERIES"
        onPress={() => navigation.navigate("AllSeries")}
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
            <SeriesCard
              title={item?.original_name}
              poster_image={item?.poster_path}
              rating={item?.vote_average}
              release_date={item?.first_air_date}
              movieId={item?.id}
            />
          )}
        />
      </View>
    </>
  );
};

export default TvShowsSwiper;

const styles = StyleSheet.create({
  container: { paddingTop: 20 },
});
