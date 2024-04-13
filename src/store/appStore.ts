import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./features/authenticationSlice";
import postSlice from "./features/postSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice,
    post: postSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
