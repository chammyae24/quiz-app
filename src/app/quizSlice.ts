import { createSlice } from "@reduxjs/toolkit";
import { quiz, settings } from "../types";

const initialState = {
  count: 3,
  start: false,
  quizs: [] as quiz[],
  settings: {} as settings,
  step: 0,
  timer: 10
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
    timerStart: state => {
      state.timer -= 1;
    },
    resetTimer: state => {
      state.timer = 10;
    },
    stepping: state => {
      state.step += 1;
    },
    quizEnd: state => {
      state.count = 3;
      state.start = false;
      state.step = 0;
      state.timer = 10;
    }
  }
});

export const {
  quizStart,
  quizEnd,
  countDown,
  fetchQuiz,
  timerStart,
  resetTimer,
  stepping
} = quizSlice.actions;

export default quizSlice.reducer;
