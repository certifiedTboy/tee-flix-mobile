import { useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import AllMovies from "../components/movies/AllMovies";
import { RouteProp } from "@react-navigation/native";

import { Colors } from "../constants/colors";

type MovieDetailsScreenRouteProp = RouteProp<
  { params: { movieId: string; type: string }; navigation: any },
  "params"
>;

const AllMoviesScreen = ({
  route,
  navigation,
}: {
  route: MovieDetailsScreenRouteProp;
  navigation: any;
}) => {
  const { type } = route.params;

  useEffect(() => {
    if (type) {
      navigation.setOptions({
        title: type === "now_playing" ? "Now Playing" : "Coming Soon",
      });
    }
  }, [type]);

  return (
    <ScrollView style={styles.container}>
      <AllMovies type={type} />
    </ScrollView>
  );
};

export default AllMoviesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary200,
  },
});
