import SearchContextProvider from "@/store/search-context";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { useColorScheme } from "../hooks/use-color-scheme";
import { store } from "../store/store";
import Navigator from "./Navigator";

export default function Index() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="light" translucent={true} />
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Provider store={store}>
          <SearchContextProvider>
            <Navigator />
          </SearchContextProvider>
        </Provider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
