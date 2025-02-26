import { TextInput, View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import Icons from "../ui/Icons";

const SearchInput: React.FC<{
  onSearchChange: (enteredText: string) => void;
}> = ({ onSearchChange }) => {
  return (
    <>
      <View style={styles.icon}>
        <Icons name="search" size={26} color={Colors.Secondary300} />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(enteredText: string) => onSearchChange(enteredText)}
      />
    </>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  input: {
    marginVertical: 20,
    fontSize: 16,
    borderBottomWidth: 2,
    backgroundColor: "#1C1C1C",
    marginHorizontal: 5,
    paddingLeft: 35,
    borderRadius: 9,
    // opacity: 0.2,
    color: Colors.Secondary300,
  },

  icon: {
    position: "absolute",
    top: 27,
    left: 8,
    zIndex: 1,
    opacity: 0.2,
  },
});
