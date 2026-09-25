import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router/js-tabs";
import { Colors } from "../../constants/Colors";

const TabLayout = () => (
  <Tabs
    screenOptions={{
      headerStyle: { backgroundColor: "#000" },
      headerTintColor: Colors.Primary100,
      headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
      tabBarActiveTintColor: Colors.Primary100,
      tabBarInactiveTintColor: Colors.Secondary300,
      tabBarStyle: {
        backgroundColor: "#000",
        borderTopColor: "#333",
      },
      tabBarLabelStyle: { fontSize: 12 },
    }}
  >
    <Tabs.Screen
      name="index"
      options={{
        title: "Tee-Flix",
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? "home" : "home-outline"}
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="movies"
      options={{
        title: "Movies",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="film-outline" color={color} size={size} />
        ),
      }}
    />
    <Tabs.Screen
      name="series"
      options={{
        title: "Series",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="logo-youtube" color={color} size={size} />
        ),
      }}
    />
    <Tabs.Screen
      name="tv-shows"
      options={{
        title: "TV Shows",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="tv-outline" color={color} size={size} />
        ),
      }}
    />
  </Tabs>
);

export default TabLayout;
