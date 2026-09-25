import { createContext, useState } from "react";

type SearchContextType = {
  movieSearchQuery: string;
  setMovieSearchQuery: (query: string) => void;
  seriesSearchQuery: string;
  setSeriesSearchQuery: (query: string) => void;
  tvShowsSearchQuery: string;
  setTvShowsSearchQuery: (query: string) => void;
};

export const SearchContext = createContext<SearchContextType>({
  movieSearchQuery: "",
  setMovieSearchQuery: (query: string) => {},
  seriesSearchQuery: "",
  setSeriesSearchQuery: (query: string) => {},
  tvShowsSearchQuery: "",
  setTvShowsSearchQuery: (query: string) => {},
});

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [movieSearchQuery, setMovieSearchQuery] = useState("");
  const [seriesSearchQuery, setSeriesSearchQuery] = useState("");
  const [tvShowsSearchQuery, setTvShowsSearchQuery] = useState("");

  const value = {
    movieSearchQuery,
    setMovieSearchQuery,
    seriesSearchQuery,
    setSeriesSearchQuery,
    tvShowsSearchQuery,
    setTvShowsSearchQuery,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchContextProvider;
