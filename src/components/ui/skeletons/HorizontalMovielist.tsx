import { FlatList, useWindowDimensions } from "react-native";
import MediaPosterCardSkeleton from "./MediaPosterCardSkeleton";

const HorinzontalMovielist = ({ length }: { length: number }) => {
  const { width } = useWindowDimensions();
  const cardWidth = width / 2.3;

  const arrayData = Array.from({ length }, (_, index) => index);

  return (
    <FlatList
      data={arrayData}
      keyExtractor={(item) => item.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 6 }}
      renderItem={() => <MediaPosterCardSkeleton width={cardWidth} />}
    />
  );
};

export default HorinzontalMovielist;
