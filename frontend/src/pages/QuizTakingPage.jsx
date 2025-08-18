// frontend/src/pages/QuizTakingPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTestForTaking, submitTest } from '../services/quiz.service';

const QuizTakingPage = () => {
  const { id: testId } = useParams(); // Mengambil ID tes dari URL
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        setLoading(true);
        const testData = await getTestForTaking(testId);
        setTest(testData);
        // Inisialisasi array jawaban dengan object kosong
        setAnswers(new Array(testData.questions.length).fill(null));
      } catch (err) {
        setError('Gagal memuat tes. Mungkin tes tidak ada atau terjadi kesalahan.');
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [testId]);

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      questionId: test.questions[currentQuestionIndex]._id,
      selectedAnswerIndex: optionIndex,
    };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    // Validasi: pastikan semua pertanyaan sudah dijawab
    if (answers.some(ans => ans === null)) {
        alert('Harap jawab semua pertanyaan sebelum mengirim.');
        return;
    }
    
    try {
        setSubmitting(true);
        const result = await submitTest(testId, answers);
        // Arahkan ke halaman hasil setelah berhasil submit
        // Kita akan buat halaman QuizResultPage sebentar lagi
        navigate(`/quiz/result/${result._id}`, { state: { result } });
    } catch (err) {
        setError('Gagal mengirim jawaban. Coba lagi nanti.');
    } finally {
        setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center p-8">Memuat soal...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!test) return <div className="text-center p-8">Tes tidak ditemukan.</div>;

  const currentQuestion = test.questions[currentQuestionIndex];
  const selectedOption = answers[currentQuestionIndex]?.selectedAnswerIndex;

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">{test.title}</h1>
      <p className="text-gray-600 mb-6">Pertanyaan {currentQuestionIndex + 1} dari {test.questions.length}</p>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{currentQuestion.questionText}</h2>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-3 border rounded-md transition-colors ${
                selectedOption === index
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50">
          Sebelumnya
        </button>
        
        {currentQuestionIndex === test.questions.length - 1 ? (
          <button onClick={handleSubmit} disabled={submitting} className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:bg-green-400">
            {submitting ? 'Mengirim...' : 'Kirim Jawaban'}
          </button>
        ) : (
          <button onClick={handleNext} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
            Selanjutnya
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizTakingPage;