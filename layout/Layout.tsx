import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import Category from "./Category";
import Search from "./Search";
import Icons from "../components/ui/Icons";
import { Size } from "../constants/size";
import { Colors } from "../constants/colors";
import AllMoviesScreen from "../screens/AllMoviesScreen";

const Stack = createNativeStackNavigator();

const Layout = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
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
        <Stack.Screen name="Search" component={Search} />

        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />

        <Stack.Screen name="AllMovies" component={AllMoviesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
