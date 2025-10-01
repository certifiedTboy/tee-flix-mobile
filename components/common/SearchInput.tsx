import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Colors } from "../../constants/colors";

const SearchInput: React.FC<{
  onSearchChange: (enteredText: string) => void;
}> = ({ onSearchChange }) => {
  return (
    <View style={styles.inputContainer}>
      <Searchbar
        onChangeText={onSearchChange}
        style={styles.input}
        placeholder="Search"
        inputStyle={{
          color: Colors.Secondary300,
        }}
        placeholderTextColor={Colors.Secondary300}
        iconColor={Colors.Secondary300}
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
    borderRadius: 6,
    color: Colors.Secondary300,
    fontSize: 18,
  },

  icon: {
    marginRight: -27,
    marginLeft: 4,
    zIndex: 1,
    width: 20,
  },
});
