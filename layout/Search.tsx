import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import MovieSearch from "../components/search/MovieSearch";
import ShowSearch from "../components/search/ShowSearch";
import { Colors } from "../constants/colors";

const renderScene = SceneMap({
  first: MovieSearch,
  second: ShowSearch,
});

const routes = [
  { key: "first", title: "Movies" },
  { key: "second", title: "Tv Shows" },
];

const Search = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{ backgroundColor: Colors.Primary200 }} // Change TabBar background color
          indicatorStyle={{ backgroundColor: Colors.Secondary300 }} // Change active tab indicator color
        />
      )}
    />
  );
};

export default Search;
