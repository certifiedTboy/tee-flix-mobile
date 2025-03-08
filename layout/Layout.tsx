import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import MovieStreamScreen from "../screens/MovieStreamScreen";
import AllMoviesScreen from "../screens/AllMoviesScreen";
import SeriesScreen from "../screens/SeriesScreen";
import SeriesDetailsScreen from "../screens/SeriesDetailsScreen";
import SeriesStreamScreen from "../screens/SeriesStreamScreen";
import Category from "./Category";
// import Search from "./Search";
import Icons from "../components/ui/Icons";
import SearchDrawer from "./Search";
import { Size } from "../constants/size";
import { Colors } from "../constants/colors";

const Stack = createNativeStackNavigator();

const Layout = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation, route }) => ({
          headerRight: ({ tintColor }) => (
            <Icons
              name="search"
              size={Size.icon}
              color={Colors.Primary100}
              onPress={() => navigation.navigate("Search")}
            />
          ),

          headerStyle: {
            backgroundColor: Colors.Primary200,
          },

          headerTintColor: Colors.Primary100,
        })}
      >
        <Stack.Screen
          name="Home"
          component={Category}
          options={{
            title: "Tee-Flix",
          }}
        />
        <Stack.Screen name="Search" component={SearchDrawer} />

        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={({ route }) => {
            return {
              title: route.params?.title ?? "Movie Details",
            };
          }}
        />
        <Stack.Screen
          name="SeriesDetails"
          component={SeriesDetailsScreen}
          options={({ route }) => {
            return {
              title: route.params?.title ?? "Series Details",
            };
          }}
        />
        <Stack.Screen name="AllMovies" component={AllMoviesScreen} />
        <Stack.Screen
          name="AllSeries"
          component={SeriesScreen}
          options={{ headerTitle: "Tv Shows / Series" }}
        />
        <Stack.Screen
          name="StreamMovie"
          component={MovieStreamScreen}
          options={({ route }) => {
            return {
              title:
                `Now watching ${route.params?.movieTitle}` ??
                "Now streaming...",
            };
          }}
          // options={{ headerShown: false }}
        />

        <Stack.Screen
          name="StreamSeries"
          component={SeriesStreamScreen}
          options={({ route }) => {
            return {
              title:
                `Now watching ${route.params?.seriesTitle}` ??
                "Now streaming...",
            };
          }}
          // options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
