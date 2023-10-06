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
      // localStorage.setItem("user",JSON.stringify({
      //     name:action.payload.name,
      //     token:action.payload.token
      // }))
      localStorage.setItem(
        "token",
        JSON.stringify({
          access: action.payload.access,
          refresh: action.payload.refresh,
        })
      );
      state.user = action.payload;
      // state.name= action.payload.name;
      // state.token = action.payload;
    },
    logout: (state) => {
      localStorage.clear();
      // state.name=null;
      state.user = null;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
