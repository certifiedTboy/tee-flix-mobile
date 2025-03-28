import { View, Text, StyleSheet } from "react-native";
import Link from "../ui/link";
import { Colors } from "../../constants/colors";
const DescriptionTab: React.FC<{ title: string; onPress: () => void }> = ({
  title,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.descText}>{title}</Text>
      <Link
        name="chevron-forward-outline"
        color={Colors.Primary100}
        size={16}
        onPress={onPress}
      />
    </View>
  );
};

export default DescriptionTab;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.Secondary200,
    padding: 10,
    width: "95%",
    marginHorizontal: "auto",
    // borderRadius: 8,
    // opacity: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  descText: {
    color: Colors.Secondary100,
    fontSize: 20,
    fontWeight: 600,
  },
});
