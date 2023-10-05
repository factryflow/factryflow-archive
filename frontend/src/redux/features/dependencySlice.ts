import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';

// import { GetAlldependencyType } from '../types/dependencys.types';

type dependencySliceTypes = {
  dependency: any | null;
  dependencies: any[] | [];
};

const initialState: dependencySliceTypes = {
    dependency: null,
    dependencies: [],
};

const dependencySlice = createSlice({
  name: 'dependency',
  initialState,
  reducers: {
    setDependency: (state, action) => {
      state.dependency = action.payload;
    },

    setDependencies: (state, action:PayloadAction<any[]>) => {
      state.dependencies = action.payload;
    },

    resetDependencies: (state) => {
      return {
        ...state,
        dependencies: [],
      };
    },

    resetDependency: (state) => {
      return {
        ...state,
        dependency: null,
      };
    },
  },
});

export const { setDependencies, setDependency, resetDependencies, resetDependency } = dependencySlice.actions;
export default dependencySlice.reducer;

