import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';

// import { GetAlldependencyType } from '../types/dependencys.types';

type menuSliceTypes = {
  menu: any;
};

const initialState: menuSliceTypes = {
    menu: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.menu = action.payload;
    },

  },
});

export const { setMenu} = menuSlice.actions;
export default menuSlice.reducer;

