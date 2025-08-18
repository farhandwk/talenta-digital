// frontend/src/pages/QuizListPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTests } from '../services/quiz.service';
// Kita akan buat komponen Pagination sebentar lagi
// import Pagination from '../components/common/Pagination'; 

const QuizListPage = () => {
  const [tests, setTests] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const response = await getAllTests(currentPage);
        setTests(response.data);
        setPaginationInfo({
          page: response.page,
          pages: response.pages,
          total: response.total,
        });
        setError(null);
      } catch (err) {
        setError('Gagal memuat daftar tes. Coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [currentPage]); // Efek ini akan berjalan lagi setiap kali currentPage berubah

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Zona Asah Otak</h1>
      <p className="text-gray-600 mb-8">Pilih tes yang ingin kamu kerjakan di bawah ini.</p>
      
      {tests.length === 0 ? (
        <p>Belum ada tes yang tersedia saat ini.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div key={test._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{test.title}</h2>
              <p className="text-gray-600 mb-4">{test.description}</p>
              <Link
                to={`/quiz/test/${test._id}`} // Nanti akan kita buat halaman ini
                className="inline-block w-full text-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
              >
                Mulai Tes
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Nanti kita akan tambahkan komponen pagination di sini */}
    </div>
  );
};

export default QuizListPage;