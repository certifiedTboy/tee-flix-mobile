import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MovieCardProps } from "../../interfaces/propsInterfaces";
import { Colors } from "../../constants/colors";
import Icons from "../ui/Icons";

const SeriesCard: React.FC<MovieCardProps> = ({
  poster_image,
  title,
  release_date,
  rating,
  movieId,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => [styles.cardContainer, pressed && styles.pressed]}
      onPress={() =>
        navigation.navigate("SeriesDetails", { seriesId: movieId, title })
      }
    >
      <View style={styles.imageContainer}>
        {poster_image && (
          <Image
            style={styles.image}
            source={{
              uri: `${process.env.EXPO_PUBLIC_API_IMAGE_URL}${poster_image}`,
            }}
          />
        )}
      </View>
      <View style={styles.titleContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.movieTitle}>
          {title}
        </Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>
            {" "}
            <Icons name="calendar" size={10} color={Colors.Primary100} />
            {"  "}
            {release_date}
          </Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          <Icons name="star" size={12} color={Colors.Primary100} />{" "}
          {Number(rating).toFixed(1)}
        </Text>
      </View>
    </Pressable>
  );
};

export default SeriesCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: Dimensions.get("window").height / 4,
    width: Dimensions.get("window").width / 2.5,
    borderRadius: 10,
    // justifyContent: "center",
    marginHorizontal: 10,
    marginBottom: 70,
  },
  imageContainer: {
    height: "100%",
    justifyContent: "center",
    // width: Dimensions.get("window").width,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  titleContainer: {
    justifyContent: "center",
    // flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },

  movieTitle: {
    fontSize: 16,
    color: Colors.Secondary100,
    marginTop: 10,
    fontWeight: "bold",
  },

  detailsContainer: {
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  detailsText: {
    color: Colors.Primary100,
    fontSize: 10,
  },

  infoContainer: {
    position: "absolute",
    top: 3,
    left: 2,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  infoText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

  pressed: {
    opacity: 0.7,
  },
});
