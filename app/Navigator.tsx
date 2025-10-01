import AllSeriesScreen from "@/screens/AllSeriesScreen";
import AllTvShowsScreen from "@/screens/AllTvShowsScreen";
import { SearchContext } from "@/store/search-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import { Colors } from "../constants/colors";
import AllMoviesScreen from "../screens/AllMoviesScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import MovieStreamScreen from "../screens/MovieStreamScreen";
import SeriesDetailsScreen from "../screens/SeriesDetailsScreen";
import SeriesScreen from "../screens/SeriesScreen";
import SeriesStreamScreen from "../screens/SeriesStreamScreen";
import Category from "./Category";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const [searchBarIsFocused, setsearchBarIsFocused] = useState(false);
  const { setMovieSearchQuery, setSeriesSearchQuery, setTvShowsSearchQuery } =
    useContext(SearchContext);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: Colors.Primary200,
        },

        headerTintColor: Colors.Primary100,
      })}
    >
      <Stack.Screen
        name="Home"
        component={Category}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MovieDetails"
        // @ts-ignore
        component={MovieDetailsScreen}
        options={({ route }) => ({
          // @ts-ignore
          title: route.params?.title ?? "Movie Details",
          animation: "slide_from_right",
        })}
      />
      <Stack.Screen
        name="SeriesDetails"
        // @ts-ignore
        component={SeriesDetailsScreen}
        options={({ route }) => ({
          // @ts-ignore
          title: route.params?.title ?? "Series Details",
          animation: "slide_from_right",
        })}
      />

      <Stack.Screen
        name="AllMovies"
        // @ts-ignore
        component={AllMoviesScreen}
        options={({ route }: { route: any }) => ({
          animation: "slide_from_right",
          headerBackVisible: !searchBarIsFocused,
          title: `${route.params?.categoryTitle} Movies`,
          headerSearchBarOptions: {
            placeholder: "Search movies...",
            placeholderTextColor: "#fff", // <-- placeholder color
            textColor: Colors.Secondary200, // <-- input text color
            tintColor: Colors.Primary100, // <-- search icon & cancel button color (iOS)
            headerIconColor: Colors.Primary100, // <-- search icon color (Android specific)
            onChangeText: (event) => {
              setMovieSearchQuery(event.nativeEvent.text);
            },

            onFocus: () => {
              setsearchBarIsFocused(true);
            },
            onBlur: () => {
              setsearchBarIsFocused(false);
            },
          },
        })}
      />

      <Stack.Screen
        name="AllSeriesScreen"
        // @ts-ignore
        component={AllSeriesScreen}
        options={({ route }: { route: any }) => ({
          animation: "slide_from_right",
          headerBackVisible: !searchBarIsFocused,
          title: `${route.params?.categoryTitle} Series`,
          headerSearchBarOptions: {
            placeholder: "Search series...",
            placeholderTextColor: "#fff", // <-- placeholder color
            textColor: Colors.Secondary200, // <-- input text color
            tintColor: Colors.Primary100, // <-- search icon & cancel button color (iOS)
            headerIconColor: Colors.Primary100, // <-- search icon color (Android specific)
            onChangeText: (event) => {
              setSeriesSearchQuery(event.nativeEvent.text);
            },
            hideWhenScrolling: true,
            onFocus: () => {
              setsearchBarIsFocused(true);
            },
            onBlur: () => {
              setsearchBarIsFocused(false);
            },
          },
        })}
      />

      <Stack.Screen
        name="AllTvShowsScreen"
        // @ts-ignore
        component={AllTvShowsScreen}
        options={({ route }: { route: any }) => ({
          animation: "slide_from_right",
          headerBackVisible: !searchBarIsFocused,
          title: `${route.params?.categoryTitle} TV Shows`,
          headerSearchBarOptions: {
            placeholder: "Search tv shows...",
            placeholderTextColor: "#fff", // <-- placeholder color
            textColor: Colors.Secondary200, // <-- input text color
            tintColor: Colors.Primary100, // <-- search icon & cancel button color (iOS)
            headerIconColor: Colors.Primary100, // <-- search icon color (Android specific)
            onChangeText: (event) => {
              setTvShowsSearchQuery(event.nativeEvent.text);
            },
            hideWhenScrolling: true,
            onFocus: () => {
              setsearchBarIsFocused(true);
            },
            onBlur: () => {
              setsearchBarIsFocused(false);
            },
          },
        })}
      />
      <Stack.Screen
        name="AllSeries"
        component={SeriesScreen}
        options={{
          headerTitle: "Tv Shows / Series",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="StreamMovie"
        // @ts-ignore
        component={MovieStreamScreen}
        options={({ route }) => ({
          title:
            // @ts-ignore
            `Now watching ${route.params?.movieTitle}` ?? "Now streaming...",
          animation: "slide_from_right",
        })}
        // options={{ headerShown: false }}
      />

      <Stack.Screen
        name="StreamSeries"
        // @ts-ignore
        component={SeriesStreamScreen}
        options={({ route }) => ({
          title:
            // @ts-ignore
            `Now watching ${route.params?.seriesTitle}` ?? "Now streaming...",
          animation: "slide_from_right",
        })}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
