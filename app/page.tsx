'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import quizData from '../data/quiz.json';
import sotkData from '../data/sotk.json';
import { useRouter } from 'next/navigation';
import { generateRandomUsername } from '../utils/generateName';
import { QuizData } from '../types/quiz.type';

const QUESTION_TIME_LIMIT = 15;

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Home() {
  const [username, setUsername] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizData>([]);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [timer, setTimer] = useState(QUESTION_TIME_LIMIT);
  const router = useRouter();

  const [quizType, setQuizType] = useState<'default' | 'sotk'>('default');

  useEffect(() => {
    // Load quiz data based on selected type
    if (quizType === 'default') {
      setQuestions(shuffle(quizData));
    } else if (quizType === 'sotk') {
      setQuestions(shuffle(sotkData));
    }
  }, [quizType]);

  useEffect(() => {
    if (questions.length > 0) {
      setShuffledOptions(shuffle(questions[currentQuestion].options));
    }
  }, [questions, currentQuestion]);

  useEffect(() => {
    if (!hasStarted) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    if (timer === 0) handleAnswerClick(null);
    return () => clearInterval(interval);
  }, [timer, hasStarted]);

  useEffect(() => {
    setTimer(QUESTION_TIME_LIMIT);
  }, [currentQuestion]);

  useEffect(() => {
    // Suggest random name on mount
    setUsername(generateRandomUsername())
  }, []);

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);


  const handleAnswerClick = (option: string | null) => {
    const updatedAnswers = [...selectedAnswers, option ?? ''];
    console.log('Selected Answers:', updatedAnswers);
    setSelectedAnswers(updatedAnswers);

    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      const correct = updatedAnswers.filter((ans, i) => ans.toLowerCase() === questions[i].answer.toLowerCase()).length;
      console.log('Final Score:', correct);

      // Submit score to leaderboard
      fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, score: correct }),
      });

      router.push(`/result?score=${correct}`);
    }
  };

  if (questions.length === 0) return <p className="text-center mt-10">Loading quiz...</p>;

  const current = questions[currentQuestion];

  if (!hasStarted) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Quiz!</h1>
          <div className="mb-4 flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Select Quiz:</span>
            <div className="flex gap-2 justify-center">
              <button
                className={`px-4 py-2 rounded-lg border ${quizType === 'default' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                onClick={() => setQuizType('default')}
              >
                Default
              </button>
              <button
                className={`px-4 py-2 rounded-lg border ${quizType === 'sotk' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                onClick={() => setQuizType('sotk')}
              >
                SOTK
              </button>
              {/* Add more buttons for other quiz types if needed */}
            </div>
          </div>
          <label className="block mb-4 text-left">
            <span className="text-sm font-medium text-gray-700">Enter your name:</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            />
          </label>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            onClick={() => setHasStarted(true)}
            disabled={!username.trim()}
          >
            Start Quiz
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl text-center">
        <h1 className="text-2xl font-bold mb-2">Quiz App</h1>
        <p className="text-red-500 font-semibold mb-4">⏳ {timer}s</p>
        {current?.image && (
          <div className="mx-auto mb-4 max-h-48 rounded-lg shadow relative" style={{ width: '100%', height: '192px' }}>
            <Image
              src={current.image}
              alt="Question Illustration"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
              priority
            />
          </div>
        )}

        <h2 className="text-lg font-medium mb-6">
          Q{currentQuestion + 1}: {current.question}
        </h2>
        <div className="flex flex-col gap-4 mb-4">
          {shuffledOptions.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswerClick(option)}
              className="bg-gray-100 hover:bg-blue-500 hover:text-white transition-colors px-4 py-2 rounded-lg border"
            >
              {option}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>
    </main>
  );
}
