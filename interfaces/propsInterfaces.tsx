import { ImageSourcePropType } from "react-native";

export interface IconProps {
  color: string;
  size: number;
  name: string;
  onPress?: () => void;
}

export interface MovieCardProps {
  height?: number | string;
  width?: string;
  title?: string;
  genres?: string;
  rating?: number | string;
  poster_image?: ImageSourcePropType;
  release_date?: string;
  movieId?: number;
}

export interface MovieDetailsProps {
  movieId: number;
  poster_image?: ImageSourcePropType;
  release_date?: string;
  genres?: { id: number; name: string }[];
  title: string;
  overview: string;
  rating: number;
  production_companies?: { id: number; name: string }[];
  tagline?: string;
  runtime?: number;
  episodes?: number;
  seasons?: number;
}
