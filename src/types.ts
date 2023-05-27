export type quiz = {
  id: string;
  question: string;
  choices: {
    id: string;
    value: string;
  }[];
  correct_answer: string;
};

export type settings = {
  minumum_scores: number;
  questions_count: number;
  total_questions: number;
  time_duration: number;
};
