import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Error = ({ onPress }: { onPress: () => void }) => {
  return (
    <View>
      <Text>Something went wrong</Text>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <Text style={styles.errorText}>Try Again</Text>
      </Pressable>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {},
  errorText: {
    color: Colors.error100,
  },

  pressed: {
    opacity: 0.7,
  },
});
