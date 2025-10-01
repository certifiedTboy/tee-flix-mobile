import { createDrawerNavigator } from "@react-navigation/drawer";
import MovieSearch from "../components/search/MovieSearch";
import ShowSearch from "../components/search/ShowSearch";
import Icons from "../components/ui/Icons";
import { Colors } from "../constants/colors";

const Drawer = createDrawerNavigator();

const SearchDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.Primary200 },
        headerTintColor: Colors.Primary100,
        drawerActiveTintColor: Colors.Primary200,
        drawerInactiveTintColor: Colors.Secondary100,
        drawerActiveBackgroundColor: Colors.Primary100,
        drawerContentStyle: { backgroundColor: Colors.Primary200 },
      }}
    >
      <Drawer.Screen
        name="Movies"
        component={MovieSearch}
        options={{
          title: "Search Movies",
          drawerIcon: () => (
            <Icons name="film" size={20} color={Colors.Secondary300} />
          ),
        }}
      />
      <Drawer.Screen
        name="Shows"
        component={ShowSearch}
        options={{
          title: "Search Shows",
          drawerIcon: () => (
            <Icons name="tv" size={20} color={Colors.Secondary300} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default SearchDrawer;
