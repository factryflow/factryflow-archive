import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';

// import { GetAlldependencyType } from '../types/dependencys.types';

type resourceGroupSliceTypes = {
  resourceGroup: any | null;
  resourceGroups: any[] | [];
};

const initialState: resourceGroupSliceTypes = {
    resourceGroup: null,
    resourceGroups: [],
};

const resourceGroupSlice = createSlice({
  name: 'resourceGroup',
  initialState,
  reducers: {
    setResourceGroup: (state, action) => {
      state.resourceGroup = action.payload;
    },

    setResourceGroups: (state, action:PayloadAction<any[]>) => {
      state.resourceGroups = action.payload;
    },

    resetResourceGroups: (state) => {
      return {
        ...state,
        resourceGroups: [],
      };
    },

    resetResourceGroup: (state) => {
      return {
        ...state,
        resourceGroup: null,
      };
    },
  },
});

export const { setResourceGroups ,setResourceGroup,resetResourceGroups, resetResourceGroup } = resourceGroupSlice.actions;
export default resourceGroupSlice.reducer;

