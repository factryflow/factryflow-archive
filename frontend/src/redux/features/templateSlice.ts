import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';

// import { GetAlldependencyType } from '../types/dependencys.types';

type templateSliceTypes = {
  template: any | null;
  templates: any[] | [];
};

const initialState: templateSliceTypes = {
    template: null,
    templates: [],
};

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setTemplate: (state, action) => {
      state.template = action.payload;
    },

    setTemplates: (state, action:PayloadAction<any[]>) => {
      state.templates = action.payload;
    },

    resetTemplates: (state) => {
      return {
        ...state,
        templates: [],
      };
    },

    resetTemplate: (state) => {
      return {
        ...state,
        template: null,
      };
    },
  },
});

export const { setTemplates, setTemplate, resetTemplates, resetTemplate } = templateSlice.actions;
export default templateSlice.reducer;

