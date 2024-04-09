import {
  login as loginAPI,
  signup as signupAPI,
} from "@/api/authenticationAPI";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthenticationResponse } from "../../interfaces/authentication/authentication-response";
import { NullIt } from "@/lib/types/null-it";
import { IUser } from "@/interfaces/user/user";

export interface AuthenticationState extends NullIt<IAuthenticationResponse> {
  error: unknown;
  loading: boolean | null;
}

const initialState: AuthenticationState = {
  user: null,
  token: null,
  error: null,
  loading: null,
};

export const loginAsyncThunk = createAsyncThunk("auth/login", loginAPI);
export const signupAsyncThunk = createAsyncThunk("auth/signup", signupAPI);

export const authenticationSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
    setUserAndToken: (
      state,
      { payload }: PayloadAction<{ user: IUser; token: string }>
    ) => {
      state.user = payload.user;
      state.token = payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      //  login reducers
      .addCase(loginAsyncThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(loginAsyncThunk.fulfilled, (state, action) => {
        console.log("action: ", action);
        state.loading = false;
        if (action.payload.data.error) {
          state.error = action.payload.data;
        }
        if (action.payload.data.token) {
          state.user = action.payload.data.user;
          state.token = action.payload.data.token;
        }
      })
      .addCase(loginAsyncThunk.rejected, (state, action) => {
        console.log("action: ", action);
        state.error = action.error;
        state.loading = false;
      })
      //  signup reducers
      .addCase(signupAsyncThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(signupAsyncThunk.fulfilled, (state, action) => {
        if (action.payload.data.error) {
          state.error = action.payload.data;
        }
        if (action.payload.data.token) {
          state.user = action.payload.data.user;
          state.token = action.payload.data.token;
        }
        state.loading = false;
      })
      .addCase(signupAsyncThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.error = action.error;
        state.loading = false;
      });
  },
});

export const { logout, setUserAndToken } = authenticationSlice.actions;

export default authenticationSlice.reducer;
