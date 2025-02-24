import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import MovieSearch from "../components/search/MovieSearch";
import ShowSearch from "../components/search/ShowSearch";

const renderScene = SceneMap({
  first: MovieSearch,
  second: ShowSearch,
});

const routes = [
  { key: "first", title: "First" },
  { key: "second", title: "Second" },
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
    />
  );
};

export default Search;
