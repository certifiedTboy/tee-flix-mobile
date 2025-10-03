import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers, { getState }) => {
      const token = process.env.EXPO_PUBLIC_API_KEY;

      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getLatestMovies: builder.mutation({
      query: (payload) => ({
        url: "/movie/popular",
        method: "GET",
      }),
    }),

    getOtherMovieCategory: builder.mutation({
      query: (category) => ({
        url: `/movie/${category}`,
        method: "GET",
      }),
    }),

    getOtherSeriesCategory: builder.mutation({
      query: (category) => ({
        url: `/tv/${category}`,
        method: "GET",
      }),
    }),

    getOtherTvShowsCategory: builder.mutation({
      query: (category) => ({
        url: `/tv/${category}?language=en-US&page=2`,
        method: "GET",
      }),
    }),

    fetchNowPlayingMovies: builder.mutation({
      query: (payload) => ({
        url: "/movie/now_playing",
        method: "GET",
      }),
    }),

    getUpcomingMovies: builder.mutation({
      query: (payload) => ({
        url: "/movie/upcoming",
        method: "GET",
      }),
    }),

    getMovieDetails: builder.mutation({
      query: (movieId) => ({
        url: `/movie/${movieId}?api_key=${process.env.EXPO_PUBLIC_API_KEY_2}&append_to_response=recommendations`,
        method: "GET",
      }),
    }),

    getAllSeries: builder.mutation({
      query: () => ({
        url: "/tv/popular?language=en-US&page=1",
        method: "GET",
      }),
    }),

    getTvShows: builder.mutation({
      query: () => ({
        url: "/tv/popular?language=en-US&page=2",
        method: "GET",
      }),
    }),

    getSeriesDetails: builder.mutation({
      query: (seriesId) => ({
        url: `/tv/${seriesId}?language=en-US`,
        method: "GET",
      }),
    }),

    getSeriesRecommendations: builder.mutation({
      query: (seriesId) => ({
        url: `/tv/${seriesId}/recommendations?language=en-US`,
        method: "GET",
      }),
    }),

    getMovieThrillers: builder.mutation({
      query: (movieId) => ({
        url: `/movie/${movieId}/videos`,
        method: "GET",
      }),
    }),

    getSeriesThrillers: builder.mutation({
      query: (seriesId) => ({
        url: `/tv/${seriesId}/videos`,
        method: "GET",
      }),
    }),

    getShowingTodayShows: builder.mutation({
      query: () => ({
        url: `/tv/airing_today?language=en-US&page=1`,
        method: "GET",
      }),
    }),

    getOnTheAirShows: builder.mutation({
      query: () => ({
        url: `/tv/on_the_air?language=en-US&page=1`,
        method: "GET",
      }),
    }),

    getTopRatedShows: builder.mutation({
      query: () => ({
        url: `/tv/top_rated?language=en-US&page=1`,
        method: "GET",
      }),
    }),

    searchMovies: builder.mutation({
      query: ({ searchQuery, currentPage }) => ({
        url: `/search/movie?api_key=${process.env.EXPO_PUBLIC_API_KEY_2}&query=${searchQuery}&page=${currentPage}`,
        method: "GET",
      }),
    }),

    searchShows: builder.mutation({
      query: ({ searchQuery, currentPage }) => ({
        url: `/search/tv?include_adult=true&language=en-US&query=${searchQuery}&page=${currentPage}`,
        method: "GET",
      }),
    }),

    getTopRatedMovies: builder.mutation({
      query: () => ({
        url: "/movie/top_rated",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetLatestMoviesMutation,
  useFetchNowPlayingMoviesMutation,
  useGetUpcomingMoviesMutation,
  useGetMovieDetailsMutation,
  useGetAllSeriesMutation,
  useGetSeriesDetailsMutation,
  useGetSeriesRecommendationsMutation,
  useGetTvShowsMutation,
  useGetMovieThrillersMutation,
  useGetSeriesThrillersMutation,
  useSearchMoviesMutation,
  useSearchShowsMutation,
  useGetShowingTodayShowsMutation,
  useGetOnTheAirShowsMutation,
  useGetTopRatedShowsMutation,
  useGetTopRatedMoviesMutation,
  useGetOtherMovieCategoryMutation,
  useGetOtherSeriesCategoryMutation,
  useGetOtherTvShowsCategoryMutation,
} = movieApi;
