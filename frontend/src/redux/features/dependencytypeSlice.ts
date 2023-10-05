import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';

// import { GetAlldependencytypeType } from '../types/dependencytypes.types';

type dependencytypeSliceTypes = {
  dependencytype: any | null;
  dependenciestype: any[] | [];
};

const initialState: dependencytypeSliceTypes = {
    dependencytype: null,
    dependenciestype: [],
};

const dependencytypeSlice = createSlice({
  name: 'dependencytype',
  initialState,
  reducers: {
    setDependencytype: (state, action) => {
      state.dependencytype = action.payload;
    },

    setDependenciestype: (state, action:PayloadAction<any[]>) => {
      state.dependenciestype = action.payload;
    },

    resetDependenciestype: (state) => {
      return {
        ...state,
        dependenciestype: [],
      };
    },

    resetDependencytype: (state) => {
      return {
        ...state,
        dependencytype: null,
      };
    },
  },
});

export const { setDependenciestype, setDependencytype, resetDependenciestype, resetDependencytype } = dependencytypeSlice.actions;
export default dependencytypeSlice.reducer;

