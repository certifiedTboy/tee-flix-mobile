import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import Layout from "./layout/Layout";
import { store } from "./store/store";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync(); // Hide splash screen after some delay
    }, 2000);
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <Layout />
      </Provider>
    </>
  );
};

export default App;
