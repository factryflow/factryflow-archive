import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';

// import { GetAlltaskType } from '../types/tasks.types';

type taskSliceTypes = {
  task: any | null;
  taskies: any[] | [];
};

const initialState: taskSliceTypes = {
    task: null,
    taskies: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.task = action.payload;
    },

    setTaskies: (state, action:PayloadAction<any[]>) => {
      state.taskies = action.payload;
    },

    resetTaskies: (state) => {
      return {
        ...state,
        taskies: [],
      };
    },

    resetTask: (state) => {
      return {
        ...state,
        task: null,
      };
    },
  },
});

export const { setTaskies, setTask, resetTaskies, resetTask } = taskSlice.actions;
export default taskSlice.reducer;

