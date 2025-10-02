import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
  onPress: () => void;
}

const Link = ({ color, size, name, onPress }: IconProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
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
