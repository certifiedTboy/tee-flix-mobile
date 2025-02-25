import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import Category from "./Category";
import Search from "./Search";
import Icons from "../components/ui/Icons";
import { Size } from "../constants/size";
import { Colors } from "../constants/colors";

const Stack = createNativeStackNavigator();

const Layout = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Category}
          options={({ navigation }) => ({
            title: "Tee-Flix",
            headerStyle: {
              backgroundColor: Colors.Primary200,
              shadowColor: "transparent",
            },
            headerTintColor: Colors.Primary100,
            headerRight: ({ tintColor }) => (
              <Icons
                name="search"
                size={16}
                color={Colors.Primary100}
                onPress={() => navigation.navigate("Search")}
              />
            ),
          })}
        />
        <Stack.Screen name="Search" component={Search} />

        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
