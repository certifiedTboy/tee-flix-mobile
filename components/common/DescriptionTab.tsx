import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";
import Link from "../ui/link";
const DescriptionTab: React.FC<{ title: string; onPress: () => void }> = ({
  title,
  onPress,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.descText}>{title}</Text>
      <Link
        name="chevron-forward-outline"
        color={Colors.Primary100}
        size={25}
        onPress={onPress}
      />
    </Pressable>
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
