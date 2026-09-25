import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import Skeleton from "./Skeleton";

const HorinzontalMovielist = ({ length }: { length: number }) => {
  const width = Dimensions.get("window").width / 2.4;

  const arrayData = Array.from({ length }, (_, index) => index);

  return (
    <FlatList
      data={arrayData}
      keyExtractor={(item) => item.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      renderItem={() => (
        <View style={styles.container}>
          <Skeleton width={width} height={200} radius={10} />
        </View>
      )}
    />
  );
};

export default HorinzontalMovielist;

const styles = StyleSheet.create({
  container: { marginRight: 25 },
});
