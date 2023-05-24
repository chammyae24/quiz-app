import { createSlice } from "@reduxjs/toolkit";
import { quiz } from "../data/config";

const initialState = {
  count: 3,
  start: false,
  quizs: [] as quiz[]
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    countDown: state => {
      state.count -= 1;
    },
    quizStart: state => {
      state.start = true;
    },
    quizEnd: state => {
      state.count = 3;
      state.start = false;
    }
  }
});

export const { quizStart, quizEnd, countDown } = quizSlice.actions;

export default quizSlice.reducer;
