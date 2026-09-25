import { memo } from "react";
import { MovieCardProps } from "../../interfaces/propsInterfaces";
import MediaPosterCard from "../common/MediaPosterCard";

const TvShowCard = ({
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
    mediaLabel="TV SHOW"
    href={{
      pathname: "/tvshows-details-screen",
      params: { tvShowId: movieId, title },
    }}
    accessibilityLabel={`${title || "TV show"}${release_date ? `, ${release_date}` : ""}`}
  />
);

export default memo(TvShowCard);
