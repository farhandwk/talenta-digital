// frontend/src/pages/MyResultsPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyResults } from '../services/quiz.service';

const MyResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await getMyResults(currentPage);
        setResults(response.data);
        setPaginationInfo({
          page: response.page,
          pages: response.pages,
          total: response.total,
        });
        setError(null);
      } catch (err) {
        setError('Gagal memuat riwayat hasil tes.');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [currentPage]);

  if (loading) return <div className="text-center p-8">Memuat riwayat...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Riwayat Hasil Tes</h1>
      
      {results.length === 0 ? (
        <p className="text-gray-600">Anda belum mengerjakan tes apapun.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Tes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percobaan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((result) => (
                <tr key={result._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{result.testId?.title || 'Tes Dihapus'}</div>
                    <div className="text-sm text-gray-500">{result.testId?.description || ''}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-lg font-bold text-indigo-600">{result.score}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ result.attempts > 1 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800' }`}>
                      {result.attempts} kali
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                    <Link to={`/quiz/result/${result._id}`} className="text-gray-600 hover:text-gray-900">
                      Detail
                    </Link>
                    {/* --- PERUBAHAN DI SINI --- */}
                    {result.testId?.youtubeEmbedUrl && (
                        <a href={result.testId.youtubeEmbedUrl} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-900">
                          Video
                        </a>
                    )}
                    {result.testId && (
                        <button onClick={() => navigate(`/quiz/test/${result.testId._id}`)} className="text-indigo-600 hover:text-indigo-900 font-semibold">
                          Kerjakan Ulang
                        </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyResultsPage;