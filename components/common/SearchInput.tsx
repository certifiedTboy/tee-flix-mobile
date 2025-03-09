import { TextInput, View, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";
import Icons from "../ui/Icons";

const SearchInput: React.FC<{
  onSearchChange: (enteredText: string) => void;
}> = ({ onSearchChange }) => {
  return (
    <View style={styles.inputContainer}>
      {/* <Icons name="search" size={26} color={Colors.Secondary300} /> */}

      <TextInput
        style={styles.input}
        onChangeText={(enteredText: string) => onSearchChange(enteredText)}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  // inputContainer: {
  //   // flexDirection: "row",
  //   // justifyContent: "center",
  //   // alignItems: "center",
  // },
  // input: {
  //   marginVertical: 20,
  //   fontSize: 16,
  //   borderBottomWidth: 2,
  //   backgroundColor: "#1C1C1C",
  //   marginHorizontal: 5,
  //   paddingLeft: 35,
  //   borderRadius: 9,
  //   // opacity: 0.2,
  //   color: Colors.Secondary300,
  // },

  // icon: {
  //   position: "absolute",
  //   top: 27,
  //   left: 8,
  //   zIndex: 1,
  //   opacity: 0.2,
  // },

  inputContainer: {
    marginHorizontal: "auto",
    marginVertical: 8,
    width: "90%",
  },
  // label: {
  //   fontSize: 12,
  //   color:Colors.Secondary300,
  // },

  input: {
    backgroundColor: "#1C1C1C",
    padding: 6,
    borderRadius: 6,
    color: Colors.Secondary300,
    fontSize: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
