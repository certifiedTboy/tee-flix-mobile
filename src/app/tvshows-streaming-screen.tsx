import TvShowStreaming from "@/components/tv-shows/TvShowStreaming";
import { Stack, useLocalSearchParams } from "expo-router";

const TvShowStreamingScreen = () => {
  const { tvShowId, title } = useLocalSearchParams<{
    tvShowId?: string;
    title?: string;
  }>();

  return (
    <>
      <Stack.Screen
        options={{
          title: title || "TV Show",
          animation: "slide_from_right",
        }}
      />
      <TvShowStreaming tvShowId={tvShowId || ""} />
    </>
  );
};

export default TvShowStreamingScreen;
