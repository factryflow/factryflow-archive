import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit";

// import { GetAlldependencyType } from '../types/dependencys.types';

type templateDetailSliceTypes = {
  templateDetail: any | null;
  templateDetails: any[] | [];
};

const initialState: templateDetailSliceTypes = {
  templateDetail: null,
  templateDetails: [],
};

const templateDetailSlice = createSlice({
  name: "templateDetail",
  initialState,
  reducers: {
    setTemplateDetail: (state, action) => {
      state.templateDetail = action.payload;
    },

    setTemplateDetails: (state, action: PayloadAction<any[]>) => {
      state.templateDetails = action.payload;
    },

    resetTemplateDetails: (state) => {
      return {
        ...state,
        templateDetails: [],
      };
    },

    resetTemplateDetail: (state) => {
      return {
        ...state,
        templateDetail: null,
      };
    },
  },
});

export const {
  setTemplateDetails,
  setTemplateDetail,
  resetTemplateDetails,
  resetTemplateDetail,
} = templateDetailSlice.actions;
export default templateDetailSlice.reducer;
