// import { useState } from "react";
// import { useWindowDimensions } from "react-native";
// import { TabView, SceneMap, TabBar } from "react-native-tab-view";
// import MovieSearch from "../components/search/MovieSearch";
// import ShowSearch from "../components/search/ShowSearch";
// import { Colors } from "../constants/colors";

// const renderScene = ({ route }: { route: { key: string; title: string } }) => {
//   switch (route.key) {
//     case "first":
//       return <MovieSearch />;
//     case "second":
//       return <ShowSearch />;
//     default:
//       return null;
//   }

//   console.log(route);
// };

// const routes = [
//   { key: "first", title: "Movies" },
//   { key: "second", title: "Tv Shows" },
// ];

// const Search = () => {
//   const layout = useWindowDimensions();
//   const [index, setIndex] = useState(0);

//   return (
//     <TabView
//       lazy
//       navigationState={{ index, routes }}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//       initialLayout={{ width: layout.width }}
//       renderTabBar={(props) => (
//         <TabBar
//           {...props}
//           style={{ backgroundColor: Colors.Primary200 }} // Change TabBar background color
//           indicatorStyle={{ backgroundColor: Colors.Secondary300 }} // Change active tab indicator color
//         />
//       )}
//     />
//   );
// };

// export default Search;

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
