import { Colors } from "@/constants/Colors";
import { useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import Icons from "../components/ui/Icons";
import HomeScreen from "../screens/HomeScreen";
import MoviesScreen from "../screens/MoviesScreen";
import SeriesScreen from "../screens/SeriesScreen";
import TvShowsScreen from "../screens/TvShowsScreen";

const shadowStyle = {
  ...Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
    },
    android: {
      elevation: 2,
    },
  }),
};

const Category = () => {
  const [index, setIndex] = useState(0);

  const renderScene = SceneMap({
    home: HomeScreen,
    movies: MoviesScreen,
    series: SeriesScreen,
    tvShows: TvShowsScreen,
  });

  const [routes] = useState([
    { key: "home", title: "Tee-Flix", icon: "home" },
    { key: "movies", title: "Movies", icon: "film" },
    { key: "series", title: "Series", icon: "logo-youtube" },
    { key: "tvShows", title: "Tv Shows", icon: "tv" },
  ]);

  return (
    <View style={styles.container}>
      {/* Optional header */}
      <View
        style={[styles.header, { backgroundColor: "#000", ...shadowStyle }]}
      >
        <Text
          style={[
            routes[index].key === "home"
              ? styles.mainTitle
              : styles.headerTitle,

            { color: Colors.Primary100 },
          ]}
        >
          {routes[index].title}
        </Text>
      </View>

      {/* Swipeable content */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        swipeEnabled
        renderTabBar={() => null} // we use a custom tab bar
      />

      {/* Custom Bottom Tab Bar */}

      <View style={[styles.tabBar, { backgroundColor: "#000" }]}>
        {routes.map((route, idx) => {
          const isFocused = index === idx;
          return (
            <Pressable
              key={route.key}
              style={styles.tabItem}
              onPress={() => setIndex(idx)}
            >
              <Icons
                // @ts-ignore
                name={
                  isFocused && route.icon !== "logo-youtube"
                    ? route.icon.concat("-outline")
                    : route.icon
                }
                size={25}
                color={isFocused ? Colors.Primary100 : Colors.Secondary300}
                onPress={() => setIndex(idx)}
              />
              <Text
                style={{
                  color: isFocused ? Colors.Primary100 : Colors.Secondary300,
                  fontSize: 12,
                  marginTop: 2,
                }}
              >
                {route.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: {
    height: 60,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  mainTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },

  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
});
