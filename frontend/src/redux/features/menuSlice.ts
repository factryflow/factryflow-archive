import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit";

// import { GetAlldependencyType } from '../types/dependencys.types';

interface MenuItem {
  label: string;
  icon: string; // Assuming it's a string path to an icon
  route: string;
  childrenOpen?: boolean;
  children?: MenuItem[];
}

interface MenuState {
  menu: boolean;
  menuItems: MenuItem[];
}

const initialState: MenuState = {
  menu: false,
  menuItems: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.menuItems = action.payload;
    },
    toggleChildrenOpen: (state, action) => {
      const index = action.payload;

      state.menuItems[index].childrenOpen =
        !state.menuItems[index].childrenOpen;
    },
  },
});

export const { setMenu, setMenuItems, toggleChildrenOpen } = menuSlice.actions;
export default menuSlice.reducer;
