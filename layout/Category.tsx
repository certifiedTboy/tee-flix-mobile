import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MoviesScreen from "../screens/MoviesScreen";
import SeriesScreen from "../screens/SeriesScreen";
import TvShowsScreen from "../screens/TvShowsScreen";
import Icons from "../components/ui/Icons";
import { Colors } from "../constants/colors";
import { Size } from "../constants/size";

const Tab = createBottomTabNavigator();

const Category = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Movies") {
            iconName = focused ? "film" : "film-outline";
          } else if (route.name === "Series") {
            iconName = focused ? "camera" : "unlink";
          } else {
            iconName = focused ? "tv" : "tv-outline";
          }

          return <Icons name={iconName} size={Size.icon} color={color} />;
        },

        // headerShown: false,

        headerStyle: {
          backgroundColor: Colors.Primary200,
          height: 30,
        },

        headerTitleStyle: {
          marginTop: -22,
          fontSize: 15,
        },

        headerTintColor: Colors.Secondary100,
        tabBarActiveTintColor: Colors.Primary100, // Active icon color
        tabBarInactiveTintColor: Colors.Secondary100, // Inactive icon color
        // animation: "fade",
        tabBarStyle: {
          backgroundColor: Colors.Primary200,
          height: 70,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 20,
          paddingTop: 15,
        },

        tabBarLabelStyle: {
          fontFamily: "Georgia",
          fontWeight: 300,
          fontSize: 10,
          marginVertical: 2,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerTitle: "Top Rated Movies",
        }}
        component={HomeScreen}
      />

      <Tab.Screen
        name="Movies"
        options={{
          headerTitle: "Top Rated Movies",
        }}
        component={MoviesScreen}
      />
      <Tab.Screen
        name="Series"
        options={{
          headerTitle: "Top Rated Series",
        }}
        component={SeriesScreen}
      />
      <Tab.Screen
        name="Tv Shows"
        options={{
          headerTitle: "Top Rated Tv Shows",
        }}
        component={TvShowsScreen}
      />
    </Tab.Navigator>
  );
};

export default Category;
