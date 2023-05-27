import { createSlice } from "@reduxjs/toolkit";
import { quiz, settings } from "../types";
import { shuffle } from "../utils";

const initialState = {
  count: 3,
  start: false,
  quizs: [] as quiz[],
  settings: {} as settings,
  points: 0,
  scores: 0,
  step: 0,
  timer: 10,
  pointerEvent: "auto" as "auto" | "none",
  bestScores: 0
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    countDown: state => {
      state.count -= 1;
    },
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
    quizStart: state => {
      state.start = true;
    },
    fetchQuiz: (state, action) => {
      state.quizs = shuffle(action.payload.questions);
      state.settings = action.payload.settings;
    },
    timerStart: state => {
      state.timer -= 1;
    },
    resetTimer: state => {
      state.timer = state.settings.time_duration;
    },
    stepping: state => {
      state.step += 1;
    },
    setPointer: (state, action) => {
      state.pointerEvent = action.payload;
    },
    addPoints: state => {
      state.points += 1;
    },
    addScores: (state, action) => {
      state.scores += action.payload;
    },
    quizEnd: state => {
      state.count = 3;
      state.start = false;
      state.points = 0;
      state.scores = 0;
      state.step = 0;
      state.timer = state.settings.time_duration;
    },
    setBestScores: (state, action) => {
      state.bestScores = action.payload;
    }
  }
});

export const {
  quizStart,
  setTimer,
  quizEnd,
  countDown,
  fetchQuiz,
  timerStart,
  resetTimer,
  setPointer,
  addPoints,
  addScores,
  stepping,
  setBestScores
} = quizSlice.actions;

export default quizSlice.reducer;
