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
  }),
});

export const {
  useGetLatestMoviesMutation,
  useFetchNowPlayingMoviesMutation,
  useGetUpcomingMoviesMutation,
} = movieApi;
