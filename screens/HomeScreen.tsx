import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import DescriptionTab from "../components/home/DescriptionTab";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <DescriptionTab />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Primary200,
  },
});
