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
} = movieApi;
