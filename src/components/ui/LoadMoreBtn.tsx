import * as React from "react";
import { FAB } from "react-native-paper";

const LoadMoreBtn = ({
  onLoadMore,
  iconName,
  style,
  children,
}: {
  onLoadMore: () => void;
  iconName?: string;
  style?: object;
  children?: React.ReactNode;
}) =>
  children ? (
    children
  ) : (
    <FAB
      icon={iconName || ""}
      style={{ ...style }}
      onPress={() => onLoadMore()}
    />
  );

export default LoadMoreBtn;
