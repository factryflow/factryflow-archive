import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit";

// import { GetAlldependencyType } from '../types/dependencys.types';

type menuSliceTypes = {
  menu: any;
  menuItem: any;
};

const initialState: menuSliceTypes = {
  menu: false,
  menuItem: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
    setMenuItem: (state, action) => {
      state.menuItem = action.payload;
    },
  },
});

export const { setMenu, setMenuItem } = menuSlice.actions;
export default menuSlice.reducer;
