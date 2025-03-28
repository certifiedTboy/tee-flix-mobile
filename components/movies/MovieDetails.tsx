import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icons from "../ui/Icons";
// import ThrillerReelsSwiper from "../reels/ThrillerReelsSwiper";
import { MovieDetailsProps } from "../../interfaces/propsInterfaces";
import { Colors } from "../../constants/colors";
import { formatRuntime } from "../../helpers/helpers";
import ThrillerReels from "../reels/ThrillerReels";

const { height } = Dimensions.get("window");

const MovieDetails: React.FC<MovieDetailsProps> = ({
  movieId,
  release_date,
  overview,
  genres,
  poster_image,
  production_companies,
  title,
  rating,
  runtime,
  episodes,
  seasons,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <Image
        style={styles.movieImage}
        source={{
          uri: `${process.env.EXPO_PUBLIC_API_IMAGE_URL}${poster_image}`,
        }}
      /> */}

      <ThrillerReels movieId={movieId} />

      <View style={styles.details}>
        <Text style={styles.movieTitle}>{title}</Text>
        {genres && genres.length > 0 && (
          <Text style={styles.genres}>
            {genres ? genres.map((genre) => genre?.name).join(", ") : null}
          </Text>
        )}
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.date}>
              <Icons name="calendar" size={12} color={Colors.Primary100} />
              {"  "}
              {release_date}
            </Text>
            <Text style={styles.date}>
              <Icons name="star" size={14} color={Colors.Primary100} />
              {"  "}
              {Number(rating).toFixed(1)}
            </Text>
          </View>

          <View>
            {production_companies && production_companies.length > 0 && (
              <Text style={styles.date}>
                <Icons name="videocam" size={14} color={Colors.Primary100} />
                {"  "}
                {production_companies[0].name}
              </Text>
            )}

            {runtime && (
              <Text style={styles.date}>
                <Icons name="timer" size={14} color={Colors.Primary100} />
                {"  "}
                {formatRuntime(runtime)}
              </Text>
            )}

            {episodes && seasons && (
              <Text style={styles.date}>
                <Icons name="timer" size={14} color={Colors.Primary100} />
                {"  "}
                {episodes} episodes in {seasons}{" "}
                {seasons > 1 ? "seasons" : "season"}
              </Text>
            )}
          </View>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.playButton,
            pressed && styles.pressed,
          ]}
          onPress={() =>
            navigation.navigate("StreamMovie", { movieId, movieTitle: title })
          }
        >
          <Icons name="play" size={30} color={Colors.Primary200} />
        </Pressable>

        {overview && (
          <View style={styles.detailsContainer2}>
            <Text style={styles.overview}>{overview}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  movieImage: {
    width: "100%",
    height: height / 3.5,
  },

  details: {},
  detailsContainer: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsContainer2: {
    marginHorizontal: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  movieTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.Secondary300,
    margin: 10,
  },
  genres: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.Secondary200,
    marginHorizontal: 10,
    marginTop: -10,
    marginBottom: 10,
  },
  date: {
    fontSize: 13,
    color: Colors.Secondary300,
    fontWeight: "bold",
  },

  playButton: {
    backgroundColor: Colors.Secondary300,
    marginVertical: 16,
    paddingVertical: 10,
    alignItems: "center",
  },

  pressed: {
    opacity: 0.9,
  },

  overview: {
    color: Colors.Secondary300,
    fontSize: 13,
  },
});
