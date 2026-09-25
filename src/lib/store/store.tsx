import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { movieApi } from "../apis/movies-apis";

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
  },

  devTools: process.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          `${movieApi.reducerPath}/executeQuery/fulfilled`,
          `${movieApi.reducerPath}/executeMutation/fulfilled`,
        ],
        ignoredPaths: [
          new RegExp(`^${movieApi.reducerPath}\\.(queries|mutations)\\.[^.]+\\.data`),
        ],
      },
    }).concat(movieApi.middleware),
});

// export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
