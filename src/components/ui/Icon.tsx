import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { IconProps } from "../../interfaces/propsInterfaces";

const Icon = ({ color, size, name, onPress }: IconProps) => {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <Ionicons name={name} color={color} size={size} />
    </Pressable>
  );
};

export default Icon;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
