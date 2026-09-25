import React, { memo } from "react";
import { DimensionValue, StyleSheet, View } from "react-native";

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
    <View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius: radius === "round" ? 9999 : (radius ?? 8),
        },
      ]}
    />
  );
};

export default memo(SkeletonText);

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#27272f",
  },
});
