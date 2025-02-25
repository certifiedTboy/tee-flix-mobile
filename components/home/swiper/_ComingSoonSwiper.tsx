import { useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DescriptionTab from "../../common/DescriptionTab";
import { useGetUpcomingMoviesMutation } from "../../../lib/apis/movieApis";
import { Colors } from "../../../constants/colors";

const { width, height } = Dimensions.get("window");

const ComingSoonSwiper = () => {
  const scrollRef = useRef(null);
  const [getUpcomingMovies, { data }] = useGetUpcomingMoviesMutation();

  const navigation = useNavigation();

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
  };

  useEffect(() => {
    getUpcomingMovies(null);
  }, []);
  return (
    <View>
      <DescriptionTab title="COMING SOON" />
      <View style={styles.container}>
        {/* ScrollView for Manual Swiper */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {data &&
            data?.results?.length > 0 &&
            data?.results.slice(0, 5).map((item: any) => (
              <Pressable
                style={styles.imageContainer}
                onPress={() => navigation.navigate("MovieDetails" as never)}
                key={item.id}
              >
                <Image
                  source={{
                    uri: `${process.env.EXPO_PUBLIC_API_IMAGE_URL}${item.poster_path}`,
                  }}
                  style={styles.mainImage}
                />

                <View style={styles.overlay} />
              </Pressable>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ComingSoonSwiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  imageContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  mainImage: {
    width: width * 0.7,
    height: height * 0.55,
    borderRadius: 12,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent black overlay
    borderRadius: 15, // Match the image border
  },

  infoContainer: {
    position: "absolute",
    top: 10,
    left: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  infoContainer2: {
    position: "absolute",
    top: 10,
    right: 40,
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
});
