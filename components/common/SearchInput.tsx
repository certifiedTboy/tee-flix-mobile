import { TextInput, View, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";
import Icons from "../ui/Icons";

const SearchInput: React.FC<{
  onSearchChange: (enteredText: string) => void;
}> = ({ onSearchChange }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.icon}>
        <Icons name="search" size={22} color={Colors.Secondary300} />
      </View>

      <TextInput
        style={styles.input}
        onChangeText={(enteredText: string) => onSearchChange(enteredText)}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: "auto",
    marginVertical: 8,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    backgroundColor: "#1C1C1C",
    paddingTop: 10,
    paddingLeft: 32,
    borderRadius: 6,
    color: Colors.Secondary300,
    fontSize: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  icon: {
    marginRight: -27,
    marginLeft: 4,
    zIndex: 1,
    width: 20,
  },
});
