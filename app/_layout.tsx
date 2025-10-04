import { store } from "@/lib/store/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { Colors } from "../constants/Colors";
import SearchContextProvider from "../lib/context/search-context";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <SearchContextProvider>
        <Stack
          screenOptions={() => ({
            headerStyle: {
              backgroundColor: Colors.Primary200,
            },

            headerTintColor: Colors.Primary100,
          })}
        >
          <Stack.Screen
            name="index"
            options={{ title: "Home", headerShown: false }}
          />
          <Stack.Screen
            name="movie-details-screen"
            options={({ route }) => ({
              // @ts-ignore
              title: route?.params!.title,
              animation: "slide_from_right",
            })}
          />

          <Stack.Screen
            name="series-details-screen"
            options={({ route }) => ({
              // @ts-ignore
              title: route?.params!.title,
              animation: "slide_from_right",
            })}
          />

          <Stack.Screen
            name="tvshows-details-screen"
            options={({ route }) => ({
              // @ts-ignore
              title: route?.params!.title,
              animation: "slide_from_right",
            })}
          />

          <Stack.Screen
            name="explore-movies-screen"
            options={({ route }) => ({
              // @ts-ignore
              title: `${route.params?.title} Movies`,
              animation: "slide_from_right",
            })}
          />
          <Stack.Screen
            name="explore-series-screen"
            options={({ route }) => ({
              animation: "slide_from_right",

              // @ts-ignore
              title: `${route.params?.title} Series`,
            })}
          />
          <Stack.Screen
            name="explore-tvshows-screen"
            options={({ route }) => ({
              headerBackVisible: false,
              // @ts-ignore
              title: `${route.params?.title} TV Shows`,
              animation: "slide_from_right",
            })}
          />

          <Stack.Screen
            name="movie-streaming-screen"
            options={({ route }) => ({
              // @ts-ignore
              title: route?.params!.title,
              animation: "slide_from_right",
            })}
          />
          <Stack.Screen
            name="series-streaming-screen"
            options={({ route }) => ({
              // @ts-ignore
              title: route?.params!.title,
              animation: "slide_from_right",
            })}
          />
          <Stack.Screen
            name="tvshows-streaming-screen"
            options={({ route }) => ({
              // @ts-ignore
              title: route?.params!.title,
              animation: "slide_from_right",
            })}
          />
        </Stack>
      </SearchContextProvider>
    </Provider>
  );
};

export default RootLayout;
