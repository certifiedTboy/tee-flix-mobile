export const formatRuntime = (runtime: number) => {
  const hours = Math.floor(runtime / 60) + "h";
  const minutes = Math.floor(runtime % 60) + "m";

  return `${hours} ${minutes}`;
};
