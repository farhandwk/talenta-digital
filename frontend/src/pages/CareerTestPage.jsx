// frontend/src/pages/CareerTestPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/riasecTest';

const CareerTestPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
  const navigate = useNavigate();

  const handleAnswer = (likes) => {
    if (likes) {
      const questionType = questions[currentQuestionIndex].type;
      setScores(prevScores => ({
        ...prevScores,
        [questionType]: prevScores[questionType] + 1
      }));
    }

    // Pindah ke pertanyaan selanjutnya atau ke halaman hasil
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Kirim hasil ke halaman selanjutnya
      navigate('/career/result', { state: { scores } });
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container mx-auto p-8 flex flex-col items-center">
      <div className="w-full max-w-xl">
        <p className="text-sm text-gray-500 mb-2">Pertanyaan {currentQuestionIndex + 1} dari {questions.length}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-6">
            {questions[currentQuestionIndex].text}
          </h2>
          <div className="flex justify-center space-x-4">
            <button onClick={() => handleAnswer(true)} className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600">
              Suka
            </button>
            <button onClick={() => handleAnswer(false)} className="px-8 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600">
              Tidak Suka
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerTestPage;