import { memo } from "react";
import { MovieCardProps } from "../../interfaces/propsInterfaces";
import MediaPosterCard from "../common/MediaPosterCard";

const MovieCard = ({
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
    mediaLabel="MOVIE"
    href={{
      pathname: "/movie-details-screen",
      params: { movieId, title },
    }}
    accessibilityLabel={`${title || "Movie"}${release_date ? `, ${release_date}` : ""}`}
  />
);

export default memo(MovieCard);
