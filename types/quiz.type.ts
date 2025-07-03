export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  answer: string;
  image?: string | null;
};
export type QuizData = QuizQuestion[];
