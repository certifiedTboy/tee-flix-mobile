import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "react-text-to-speech/dist/types";

const Icons: React.FC<IconProps> = ({ color, size, name, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <Ionicons name={name} color={color} size={size} />
    </Pressable>
  );
};

export default Icons;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
