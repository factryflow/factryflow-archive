import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GetAllJobType } from '../types/jobs.types';

type JobSliceTypes = {
  job: GetAllJobType | null;
  jobies: GetAllJobType[] | [];
};

const initialState: JobSliceTypes = {
    job: null,
    jobies: [],
};

const JobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJob: (state, action) => {
      state.job = action.payload;
    },

    setJobies: (state, action:PayloadAction<GetAllJobType[]>) => {
      state.jobies = action.payload;
    },

    resetJobies: (state) => {
      return {
        ...state,
        jobies: [],
      };
    },

    resetJob: (state) => {
      return {
        ...state,
        job: null,
      };
    },
  },
});

export const { setJobies, setJob, resetJobies, resetJob } = JobSlice.actions;
export default JobSlice.reducer;

