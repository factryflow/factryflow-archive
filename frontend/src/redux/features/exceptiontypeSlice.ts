import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';

// import { GetAlldependencyType } from '../types/dependencys.types';

type exceptionTypeSliceTypes = {
  exceptionType: any | null;
  exceptionTypes: any[] | [];
};

const initialState: exceptionTypeSliceTypes = {
    exceptionType: null,
    exceptionTypes: [],
};

const exceptionTypeSlice = createSlice({
  name: 'exceptionType',
  initialState,
  reducers: {
    setexceptionType: (state, action) => {
      state.exceptionType = action.payload;
    },

    setexceptionTypes: (state, action:PayloadAction<any[]>) => {
      state.exceptionTypes = action.payload;
    },

    resetexceptionTypes: (state) => {
      return {
        ...state,
        exceptionTypes: [],
      };
    },

    resetexceptionType: (state) => {
      return {
        ...state,
        exceptionType: null,
      };
    },
  },
});

export const { setexceptionTypes, setexceptionType, resetexceptionTypes, resetexceptionType } = exceptionTypeSlice.actions;
export default exceptionTypeSlice.reducer;

