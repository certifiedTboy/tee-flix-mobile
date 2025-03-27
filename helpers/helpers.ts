export const formatRuntime = (runtime: number) => {
  const hours = Math.floor(runtime / 60) + "h";
  const minutes = Math.floor(runtime % 60) + "m";

  return `${hours} ${minutes}`;
};

/**
 * increment the index by 1 to get
 * a valid stagger value, used with
 * the react-native Animated API
 * @param index
 * @returns number
 */
export const formatIndex = (index: number) => index + 1;
