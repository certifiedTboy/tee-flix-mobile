import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import Icon from "../ui/Icon";

const DescriptionTab = ({
  title,
  pathname,
  category,
}: {
  title: string;
  pathname: string;
  category: string;
}) => {
  return (
    <Link
      href={{
        pathname: pathname as any,
        params: { title, category },
      }}
      style={{ padding: 10 }}
    >
      <View style={styles.container}>
        <Text style={styles.descText}>{title}</Text>

        <Icon
          name="chevron-forward-outline"
          size={20}
          color={Colors.Primary100}
        />
      </View>
    </Link>
  );
};

export default DescriptionTab;

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    width: "100%",
    // marginHorizontal: 20,
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
