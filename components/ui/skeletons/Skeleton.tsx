import { Skeleton } from "moti/skeleton";
import React, { memo } from "react";
import { DimensionValue } from "react-native";

export type SkeletonTextProps = {
  width?: DimensionValue;
  height: number;
  radius?: number | "round";
};

const SkeletonText = ({
  width = "100%",
  height,
  radius,
}: SkeletonTextProps) => {
  return (
    <Skeleton
      colorMode="dark"
      width={width} // Percentage, number, or 'auto'
      height={height} // Number (e.g., fontSize)
      radius={radius} // Number or 'round'
    />
  );
};

export default memo(SkeletonText);
