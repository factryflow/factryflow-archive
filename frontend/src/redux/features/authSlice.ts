import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export interface AuthState {
  user: any | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<any>) => {
      localStorage.setItem(
        "token",
        JSON.stringify({
          access: action.payload.access,
          refresh: action.payload.refresh,
        })
      );
    },
    logout: (state) => {
      localStorage.clear();
      // state.name=null;
      state.user = null;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
