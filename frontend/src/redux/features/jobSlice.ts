import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { JobResponse } from "@/types/api.types";

type JobSliceTypes = {
  job: JobResponse | null;
  jobies: JobResponse[] | [];
  jobstatus: any;
  jobtype: any;
};

const initialState: JobSliceTypes = {
  job: null,
  jobies: [],
  jobstatus: [],
  jobtype: [],
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
    setJobStatus: (state, action: PayloadAction<any>) => {
      state.jobstatus = action.payload;
    },
    setJobType: (state, action: PayloadAction<any>) => {
      state.jobtype = action.payload;
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

export const {
  setJobies,
  setJob,
  resetJobies,
  setJobType,
  resetJob,
  setJobStatus,
} = JobSlice.actions;
export default JobSlice.reducer;
