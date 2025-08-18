// frontend/src/pages/QuizResultPage.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
import { getQuizResultById } from '../services/quiz.service';

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
    }
    const videoId = urlObj.searchParams.get('v');
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch (error) {
    return null;
  }
};

const QuizResultPage = () => {
  const { id: resultId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [result, setResult] = useState(location.state?.result || null);
  const [loading, setLoading] = useState(!result);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!result) {
      const fetchResult = async () => {
        try {
          const resultData = await getQuizResultById(resultId);
          setResult(resultData);
        } catch (err) {
          setError('Gagal memuat hasil tes.');
        } finally {
          setLoading(false);
        }
      };
      fetchResult();
    }
  }, [result, resultId]);

  if (loading) return <div className="text-center p-8">Memuat hasil...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!result) return <div className="text-center p-8">Hasil tes tidak ditemukan.</div>;

  const embedUrl = getYouTubeEmbedUrl(result.testId?.youtubeEmbedUrl);
  const canRedo = result.testId && result.testId._id; // Cek apakah tes masih ada

  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-2">Hasil Tes: {result.testId?.title || 'Tes Telah Dihapus'}</h1>
        <p className="text-gray-600 mb-6">
          Selesai pada percobaan ke-{result.attempts}.
        </p>
        <div className="mb-8">
          <p className="text-lg">Skor Akhir Anda:</p>
          <p className="text-6xl font-bold text-indigo-600 my-2">{result.score}</p>
          <p className="text-gray-500">
            ({result.score > 0 ? Math.round(result.score * result.totalQuestions / 100) : 0} / {result.totalQuestions} jawaban benar)
          </p>
        </div>

        {embedUrl && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Video Pembahasan</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={embedUrl}
                title="Video Pembahasan"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => navigate(`/quiz/test/${result.testId._id}`)}
            disabled={!canRedo} // Nonaktifkan tombol jika tes sudah dihapus
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {canRedo ? 'Kerjakan Ulang' : 'Tes Tidak Tersedia'}
          </button>
          <Link 
            to="/quiz/my-results" 
            className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300"
          >
            Kembali ke Riwayat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizResultPage;