import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';

// import { GetAlldependencyType } from '../types/dependencys.types';

type exceptionSliceTypes = {
  exception: any | null;
  exceptions: any[] | [];
};

const initialState: exceptionSliceTypes = {
    exception: null,
    exceptions: [],
};

const exceptionSlice = createSlice({
  name: 'exception',
  initialState,
  reducers: {
    setexception: (state, action) => {
      state.exception = action.payload;
    },

    setexceptions: (state, action:PayloadAction<any[]>) => {
      state.exceptions = action.payload;
    },

    resetexceptions: (state) => {
      return {
        ...state,
        exceptions: [],
      };
    },

    resetexception: (state) => {
      return {
        ...state,
        exception: null,
      };
    },
  },
});

export const { setexceptions, setexception, resetexceptions, resetexception } = exceptionSlice.actions;
export default exceptionSlice.reducer;

