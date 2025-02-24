import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "react-text-to-speech/dist/types";
import { Colors } from "../../constants/colors";

const Link: React.FC<IconProps> = ({ color, size, name, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.linkText}>See All</Text>
      <Ionicons name={name} color={color} size={size} />
    </Pressable>
  );
};

export default Link;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  linkText: {
    color: Colors.Primary100,
  },
});
