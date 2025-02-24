import { View, Text, StyleSheet } from "react-native";
import Link from "../ui/link";
import { Colors } from "../../constants/colors";
const DescriptionTab = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.descText}>AVAILABLE FOR ONLINE STREAMING</Text>
      <Link
        name="arrow-forward"
        color={Colors.Primary100}
        size={20}
        onPress={() => console.log("See More")}
      />
    </View>
  );
};

export default DescriptionTab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Secondary200,
    padding: 10,
    width: "95%",
    marginHorizontal: "auto",
    borderRadius: 6,
    opacity: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  descText: {
    color: Colors.Secondary100,
    fontSize: 12,
    fontWeight: 600,
  },
});
