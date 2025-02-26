import SeriesStreaming from "../components/series/SeriesStreaming";
import { RouteProp } from "@react-navigation/native";

type MovieDetailsScreenRouteProp = RouteProp<
  { params: { movieId: string; movieTitle: string } },
  "params"
>;

const SeriesStreamScreen: React.FC<{
  route: MovieDetailsScreenRouteProp;
}> = ({ route }) => {
  const seriesId = route.params.seriesId;

  return <SeriesStreaming seriesId={seriesId} />;
};

export default SeriesStreamScreen;
