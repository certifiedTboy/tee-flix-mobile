import { Link } from "expo-router";
import { memo } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { MovieCardProps } from "../../interfaces/propsInterfaces";
import Icon from "../ui/Icon";

const TvShowsCard = ({
  poster_image,
  title,
  release_date,
  rating,
  movieId,
}: MovieCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        {poster_image && (
          <Link
            href={{
              pathname: "/tvshows-details-screen",
              params: { tvShowId: movieId, title },
            }}
          >
            <Image
              style={styles.image}
              source={{
                uri: `${process.env.EXPO_PUBLIC_API_IMAGE_URL}${poster_image}`,
              }}
            />
          </Link>
        )}
      </View>
      <View style={styles.titleContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.movieTitle}>
          {title}
        </Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>
            {" "}
            <Icon name="calendar" size={10} color={Colors.Primary100} />
            {"  "}
            {release_date}
          </Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          <Icon name="star" size={12} color={Colors.Primary100} />{" "}
          {Number(rating).toFixed(1)}
        </Text>
      </View>
    </View>
  );
};

export default memo(TvShowsCard);

const styles = StyleSheet.create({
  cardContainer: {
    height: Dimensions.get("window").height / 4,
    width: Dimensions.get("window").width / 2.5,
    borderRadius: 10,
    // justifyContent: "center",
    marginHorizontal: 10,
    marginBottom: 40,
  },
  imageContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
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
    top: 15,
    left: 12,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    paddingHorizontal: 5,
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  infoText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  pressed: {
    opacity: 0.7,
  },
});
