import { useGetOtherSeriesCategoryMutation } from "@/lib/apis/movieApis";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DescriptionTab from "../common/DescriptionTab";
import SeriesCard from "../common/SeriesCard";

const OtherSeriesCategories = ({
  category,
  categoryTitle,
}: {
  category: string;
  categoryTitle: string;
}) => {
  const [getOtherSeriesCategory, { data, isLoading }] =
    useGetOtherSeriesCategoryMutation();

  const navigation = useNavigation();

  useEffect(() => {
    getOtherSeriesCategory(category);
  }, []);

  const RenderedCard = useCallback(
    ({ item }: { item: any }) => (
      <SeriesCard
        title={item?.original_name}
        poster_image={item?.poster_path}
        rating={item?.vote_average}
        release_date={item?.first_air_date}
        movieId={item?.id}
        key={item.id}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <DescriptionTab
        title={categoryTitle}
        onPress={() =>
          // @ts-ignore
          navigation.navigate("AllSeriesScreen", { categoryTitle, category })
        }
      />
      <FlatList
        renderItem={RenderedCard}
        data={data?.results}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </View>
  );
};

export default OtherSeriesCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
