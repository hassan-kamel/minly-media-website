import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./features/authenticationSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
