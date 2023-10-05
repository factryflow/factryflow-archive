import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';

// import { GetAlldependencyType } from '../types/dependencys.types';

type resourceSliceTypes = {
  resource: any | null;
  resourcesies: any[] | [];
};

const initialState: resourceSliceTypes = {
    resource: null,
    resourcesies: [],
};

const resourceSlice = createSlice({
  name: 'resource',
  initialState,
  reducers: {
    setResource: (state, action) => {
      state.resource = action.payload;
    },

    setResourcesies: (state, action:PayloadAction<any[]>) => {
      state.resourcesies = action.payload;
    },

    resetResourcesies: (state) => {
      return {
        ...state,
        resourcesies: [],
      };
    },

    resetResource: (state) => {
      return {
        ...state,
        resource: null,
      };
    },
  },
});

export const { setResourcesies, setResource, resetResourcesies, resetResource } = resourceSlice.actions;
export default resourceSlice.reducer;

