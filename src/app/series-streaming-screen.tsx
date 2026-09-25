import { Stack, useLocalSearchParams } from "expo-router";
import SeriesStreaming from "../components/series/SeriesStreaming";

const SeriesStreamScreen = () => {
  const { seriesId, title } = useLocalSearchParams<{
    seriesId?: string;
    title?: string;
  }>();

  return (
    <>
      <Stack.Screen
        options={{
          title: title || "Series",
          animation: "slide_from_right",
        }}
      />
      <SeriesStreaming seriesId={seriesId || ""} />
    </>
  );
};

export default SeriesStreamScreen;
