export type quiz = {
  id: string;
  question: string;
  choices: {
    id: string;
    value: string;
  }[];
  correct_answer: string;
};
