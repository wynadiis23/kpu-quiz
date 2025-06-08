export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};
export type QuizData = QuizQuestion[];
