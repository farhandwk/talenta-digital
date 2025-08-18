// frontend/src/pages/trainer/TestManagementPage.jsx

import React, { useState, useEffect } from 'react';
import { getAllTestsByTrainer, createTest, updateTest, deleteTest } from '../../services/quiz.service';
import TestFormModal from '../../components/trainer/TestFormModal'; // <-- Impor modal baru

const TestManagementPage = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState(null);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const data = await getAllTestsByTrainer();
      setTests(data);
    } catch (err) {
      setError('Gagal memuat daftar tes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleOpenModal = (test = null) => {
    setEditingTest(test);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTest(null);
  };

  const handleSaveTest = async (testData) => {
    try {
      if (editingTest) {
        await updateTest(editingTest._id, testData);
      } else {
        await createTest(testData);
      }
      handleCloseModal();
      fetchTests(); // Muat ulang daftar tes
    } catch (err) {
      alert('Gagal menyimpan tes.');
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus tes ini beserta semua hasilnya?')) {
        try {
            await deleteTest(id);
            fetchTests();
        } catch (err) {
            alert('Gagal menghapus tes.');
        }
    }
  };

  if (loading) return <div className="p-8 text-center">Memuat tes...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <>
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manajemen Paket Tes</h1>
          <button onClick={() => handleOpenModal()} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
            + Buat Tes Baru
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg">
          {tests.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {tests.map((test) => (
                <li key={test._id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{test.title}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {test.questions.length} Pertanyaan
                    </p>
                  </div>
                  <div className="space-x-4">
                    <button onClick={() => handleOpenModal(test)} className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                    <button onClick={() => handleDelete(test._id)} className="text-red-600 hover:text-red-800 font-semibold">Hapus</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-gray-500">Anda belum membuat paket tes apapun.</p>
          )}
        </div>
      </div>

      <TestFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTest}
        initialData={editingTest}
      />
    </>
  );
};

export default TestManagementPage;