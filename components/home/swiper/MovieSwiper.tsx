import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors";
import { useFetchNowPlayingMoviesMutation } from "../../../lib/apis/movieApis";
import DescriptionTab from "../../common/DescriptionTab";
import Icons from "../../ui/Icons";

const { width, height } = Dimensions.get("window");

const CustomSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const scrollRef = useRef(null);

  const [fetchNowPlayingMovies, { data, error }] =
    useFetchNowPlayingMoviesMutation();

  const navigation = useNavigation();

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setActiveIndex(index);
  };

  useEffect(() => {
    fetchNowPlayingMovies(null);
  }, []);

  // console.log(error);

  return (
    <>
      <DescriptionTab
        title="Now Playing"
        onPress={() =>
          // @ts-ignore
          navigation.navigate("AllMovies", {
            category: "now_playing",
            categoryTitle: "Now Playing",
          })
        }
      />

      {/* <NowplayingLoader /> */}
      <View style={styles.container}>
        {activeIndex > 0 && (
          <ImageBackground
            source={{
              uri: `${process.env.EXPO_PUBLIC_API_IMAGE_URL}${
                data?.results.slice(0, 5)[activeIndex - 1]?.poster_path
              }`,
            }}
            style={[styles.sideImage, { left: 20 }]}
            blurRadius={15}
          />
        )}

        {/* Right (Next) Image - Blurred */}
        {activeIndex < data?.results?.slice(0, 5).length - 1 && (
          <ImageBackground
            source={{
              uri: `${process.env.EXPO_PUBLIC_API_IMAGE_URL}${
                data?.results.slice(0, 5)[activeIndex + 1]?.poster_path
              }`,
            }}
            style={[styles.sideImage, { right: 20 }]}
            blurRadius={15}
          />
        )}

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
                onPress={() =>
                  // @ts-ignore
                  navigation.navigate("MovieDetails", {
                    movieId: item.id,
                    title: item.title,
                  })
                }
                key={item.id}
              >
                <Image
                  source={{
                    uri: `${process.env.EXPO_PUBLIC_API_IMAGE_URL}${item.poster_path}`,
                  }}
                  style={styles.mainImage}
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    <Icons name="star" size={12} color={Colors.Primary100} />{" "}
                    {Number(item.vote_average).toFixed(1)}
                  </Text>
                </View>
                <View style={styles.infoContainer2}>
                  <Text style={styles.infoText}>
                    <Icons
                      name="calendar"
                      size={12}
                      color={Colors.Primary100}
                    />{" "}
                    {item?.release_date}
                  </Text>
                </View>
                <View style={styles.overlay} />
              </Pressable>
            ))}
        </ScrollView>

        <View style={styles.pagination}>
          {data &&
            data?.results?.length > 0 &&
            data?.results.slice(0, 5).map((_: any, index: number) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      activeIndex === index
                        ? Colors.Primary100
                        : Colors.Secondary100,
                  },
                ]}
              />
            ))}
        </View>
      </View>
    </>
  );
};

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
    width: width * 0.8,
    height: height * 0.55,
    borderRadius: 12,
  },
  sideImage: {
    position: "absolute",
    width: width * 0.3, // Smaller size
    height: height * 0.45,
    borderRadius: 15,
    opacity: 0.4, // Faint effect
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Semi-transparent black overlay
    borderRadius: 15, // Match the image border
  },

  pagination: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
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

export default CustomSwiper;
