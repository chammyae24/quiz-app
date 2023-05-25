import { createSlice } from "@reduxjs/toolkit";
import { quiz } from "../types";

const initialState = {
  count: 3,
  start: false,
  quizs: [] as quiz[],
  settings: {} as { [key: string]: number },
  step: 0
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
    fetchQuiz: (state, action) => {
      state.quizs = action.payload.questions;
      state.settings = action.payload.settings;
    },
    quizEnd: state => {
      state.count = 3;
      state.start = false;
    }
  }
});

export const { quizStart, quizEnd, countDown, fetchQuiz } = quizSlice.actions;

export default quizSlice.reducer;
