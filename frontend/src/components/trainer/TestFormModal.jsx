// frontend/src/components/trainer/TestFormModal.jsx

import React, { useState, useEffect } from 'react';
import { getAllQuestionsByTrainer } from '../../services/quiz.service';

const TestFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  // State untuk form utama
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState('');
  
  // State untuk bank soal dan pertanyaan yang dipilih
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  // Isi form jika sedang dalam mode edit
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title);
        setDescription(initialData.description);
        setYoutubeEmbedUrl(initialData.youtubeEmbedUrl || '');
        setSelectedQuestions(initialData.questions || []);
      } else {
        // Reset form jika mode tambah
        setTitle('');
        setDescription('');
        setYoutubeEmbedUrl('');
        setSelectedQuestions([]);
      }
      
      // Ambil semua pertanyaan dari bank soal
      const fetchQuestions = async () => {
        setLoadingQuestions(true);
        try {
          const response = await getAllQuestionsByTrainer();
          setAllQuestions(response.data);
        } catch (error) {
          console.error("Gagal memuat bank soal", error);
        } finally {
          setLoadingQuestions(false);
        }
      };
      fetchQuestions();
    }
  }, [initialData, isOpen]);

  const handleQuestionToggle = (questionId) => {
    setSelectedQuestions(prevSelected =>
      prevSelected.includes(questionId)
        ? prevSelected.filter(id => id !== questionId)
        : [...prevSelected, questionId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const testData = { title, description, youtubeEmbedUrl, questions: selectedQuestions };
    onSave(testData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <h2 className="text-2xl font-bold mb-4 flex-shrink-0">{initialData ? 'Edit Paket Tes' : 'Buat Paket Tes Baru'}</h2>
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Judul Tes</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="3" required></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">URL Video Pembahasan (YouTube)</label>
              <input type="url" value={youtubeEmbedUrl} onChange={(e) => setYoutubeEmbedUrl(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pilih Pertanyaan dari Bank Soal</label>
              <div className="mt-2 border rounded-md max-h-60 overflow-y-auto p-2">
                {loadingQuestions ? <p>Memuat pertanyaan...</p> :
                  allQuestions.map(q => (
                    <div key={q._id} className="flex items-center p-1">
                      <input
                        type="checkbox"
                        id={q._id}
                        checked={selectedQuestions.includes(q._id)}
                        onChange={() => handleQuestionToggle(q._id)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor={q._id} className="ml-3 text-sm text-gray-700">{q.questionText}</label>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Batal</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Simpan Tes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestFormModal;