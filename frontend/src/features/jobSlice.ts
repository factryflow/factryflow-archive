import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { JobResponse } from "@/types/api.types";

type JobSliceTypes = {
  job: JobResponse | null;
  jobies: JobResponse[] | [];
};

const initialState: JobSliceTypes = {
  job: null,
  jobies: [],
};

const JobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJob: (state, action) => {
      state.job = action.payload;
    },

    setJobies: (state, action: PayloadAction<JobResponse[]>) => {
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
