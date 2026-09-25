import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { Colors } from "../constants/Colors";
import SearchContextProvider from "../lib/context/search-context";
import { store } from "../lib/store/store";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <SearchContextProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.Primary200,
            },
            headerTintColor: Colors.Primary100,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="movie-details-screen"
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="series-details-screen"
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="tvshows-details-screen"
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="explore-movies-screen"
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="explore-series-screen"
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="explore-tvshows-screen"
            options={{
              headerBackVisible: false,
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="movie-streaming-screen"
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="series-streaming-screen"
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="tvshows-streaming-screen"
            options={{ animation: "slide_from_right" }}
          />
        </Stack>
      </SearchContextProvider>
    </Provider>
  );
};

export default RootLayout;
