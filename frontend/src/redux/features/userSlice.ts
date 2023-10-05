import { createSlice } from "@reduxjs/toolkit";

type userSliceTypes = {
  profile: any | null;
  users: any[];
};

const initialState: userSliceTypes = {
  profile: null,
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    resetProfile: (state) => {
      return {
        ...state,
        profile: null,
      };
    },
    resetUsers: (state) => {
      return {
        ...state,
        users: [],
      };
    },
  },
});

export const { setProfile, resetProfile } = userSlice.actions;
export default userSlice.reducer;
