import { useLocalSearchParams } from "expo-router";
import SeriesStreaming from "../components/series/SeriesStreaming";

const SeriesStreamScreen = () => {
  const { seriesId } = useLocalSearchParams();

  // @ts-ignore
  return <SeriesStreaming seriesId={seriesId} />;
};

export default SeriesStreamScreen;
