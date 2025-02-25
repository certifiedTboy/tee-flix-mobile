import { StatusBar } from "expo-status-bar";
import Layout from "./layout/Layout";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App = () => {
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
