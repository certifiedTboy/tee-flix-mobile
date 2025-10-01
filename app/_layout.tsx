import SearchContextProvider from "@/store/search-context";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Navigator from "./Navigator";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SearchContextProvider>
        <Navigator />
      </SearchContextProvider>
    </Provider>
  );
}
