import SeriesStreaming from "../components/series/SeriesStreaming";

type MovieDetailsScreenRouteProp = {
  params: { seriesId: string; movieTitle: string };
};

const SeriesStreamScreen: React.FC<{
  route: MovieDetailsScreenRouteProp;
}> = ({ route }: { route: MovieDetailsScreenRouteProp }) => {
  const seriesId = route.params.seriesId!;

  return <SeriesStreaming seriesId={seriesId} />;
};

export default SeriesStreamScreen;
