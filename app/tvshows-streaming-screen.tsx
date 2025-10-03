import TvShowStreaming from "@/components/tv-shows/TvShowStreaming";
import { useLocalSearchParams } from "expo-router";

const TvShowStreamingScreen = () => {
  const { tvShowId } = useLocalSearchParams();

  // @ts-ignore
  return <TvShowStreaming tvShowId={tvShowId} />;
};

export default TvShowStreamingScreen;
