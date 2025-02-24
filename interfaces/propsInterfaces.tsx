export interface IconProps {
  color: string;
  size: number;
  name: string;
  onPress: () => void;
}

export interface MovieCardProps {
  height: number | string;
  width: number | string;
  title: string;
  genres: string;
  rating: number | string;
}
