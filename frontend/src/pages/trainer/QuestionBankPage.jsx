// frontend/src/pages/trainer/QuestionBankPage.jsx

import React, { useState, useEffect } from 'react';
import { getAllQuestionsByTrainer, createQuestion, updateQuestion, deleteQuestion } from '../../services/quiz.service';
import QuestionFormModal from '../../components/trainer/QuestionFormModal';

const QuestionBankPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await getAllQuestionsByTrainer();
      setQuestions(response.data);
    } catch (err) {
      setError('Gagal memuat bank soal.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleOpenModal = (question = null) => {
    setEditingQuestion(question);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  const handleSaveQuestion = async (questionData) => {
    try {
      if (editingQuestion) {
        // Mode Edit
        await updateQuestion(editingQuestion._id, questionData);
      } else {
        // Mode Tambah
        await createQuestion(questionData);
      }
      handleCloseModal();
      fetchQuestions(); // Muat ulang daftar pertanyaan
    } catch (err) {
      alert('Gagal menyimpan pertanyaan.');
    }
  };
  
  const handleDeleteQuestion = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pertanyaan ini?')) {
      try {
        await deleteQuestion(id);
        fetchQuestions(); // Muat ulang daftar pertanyaan
      } catch (err) {
        alert(err.response?.data?.message || 'Gagal menghapus pertanyaan.');
      }
    }
  };

  if (loading) return <div className="p-8 text-center">Memuat pertanyaan...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <>
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manajemen Bank Soal</h1>
          <button onClick={() => handleOpenModal()} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
            + Tambah Pertanyaan Baru
          </button>
        </div>
        
        <div className="bg-white shadow-md rounded-lg">
          {questions.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {questions.map((q, index) => (
                <li key={q._id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{index + 1}. {q.questionText}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Jawaban Benar: {q.options[q.correctAnswerIndex]}
                    </p>
                  </div>
                  <div className="space-x-4">
                    <button onClick={() => handleOpenModal(q)} className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                    <button onClick={() => handleDeleteQuestion(q._id)} className="text-red-600 hover:text-red-800 font-semibold">Hapus</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-gray-500">Anda belum membuat pertanyaan apapun.</p>
          )}
        </div>
      </div>

      <QuestionFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveQuestion}
        initialData={editingQuestion}
      />
    </>
  );
};

export default QuestionBankPage;