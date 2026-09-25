import { memo } from "react";
import { MovieCardProps } from "../../interfaces/propsInterfaces";
import MediaPosterCard from "../common/MediaPosterCard";

const SeriesCard = ({
  poster_image,
  title,
  release_date,
  rating,
  movieId,
}: MovieCardProps) => (
  <MediaPosterCard
    title={title}
    posterImage={poster_image}
    releaseDate={release_date}
    rating={rating}
    mediaLabel="SERIES"
    href={{
      pathname: "/series-details-screen",
      params: { seriesId: movieId, title },
    }}
    accessibilityLabel={`${title || "Series"}${release_date ? `, ${release_date}` : ""}`}
  />
);

export default memo(SeriesCard);
