import { useGetOtherMovieCategoryMutation } from "@/lib/apis/movieApis";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DescriptionTab from "../common/DescriptionTab";
import OtherMovieCard from "../common/OtherMovieCard";

const OtherMoviesCategories = ({
  category,
  categoryTitle,
}: {
  category: string;
  categoryTitle: string;
}) => {
  const [getOtherMovieCategory, { data, isLoading }] =
    useGetOtherMovieCategoryMutation();

  const navigation = useNavigation();

  useEffect(() => {
    getOtherMovieCategory(category);
  }, []);

  // Render the card
  // useCallback is used to prevent re-rendering of the card
  const RenderedCard = useCallback(
    ({ item }: { item: any }) => (
      <OtherMovieCard
        title={item?.original_title}
        poster_image={item?.poster_path}
        rating={item?.vote_average}
        release_date={item?.release_date}
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
          navigation.navigate("AllMovies", { categoryTitle, category })
        }
      />
      <FlatList
        data={data?.results}
        renderItem={RenderedCard}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </View>
  );
};

export default OtherMoviesCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
