// frontend/src/components/trainer/QuestionFormModal.jsx

import React, { useState, useEffect } from 'react';

const QuestionFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setQuestionText(initialData.questionText);
      setOptions(initialData.options);
      setCorrectAnswerIndex(initialData.correctAnswerIndex);
    } else {
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectAnswerIndex(0);
    }
  }, [initialData, isOpen]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!questionText || options.some(opt => opt.trim() === '')) {
      setError('Teks pertanyaan dan semua pilihan harus diisi.');
      return;
    }
    setError('');
    const questionData = { questionText, options, correctAnswerIndex };
    onSave(questionData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">{initialData ? 'Edit Pertanyaan' : 'Tambah Pertanyaan Baru'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Teks Pertanyaan</label>
              <textarea value={questionText} onChange={(e) => setQuestionText(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="3" required></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pilihan Jawaban</label>
              {/* --- TAMBAHAN BARU DI SINI --- */}
              <p className="text-xs text-gray-500 mt-1">Klik pada lingkaran untuk menandai jawaban yang benar.</p>
              {/* --------------------------- */}
              {options.map((option, index) => (
                <div key={index} className="flex items-center mt-2">
                  <input type="radio" name="correctAnswer" checked={correctAnswerIndex === index} onChange={() => setCorrectAnswerIndex(index)} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"/>
                  <input type="text" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} className="ml-2 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
              ))}
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Batal</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionFormModal;