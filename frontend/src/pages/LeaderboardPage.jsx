// frontend/src/pages/LeaderboardPage.jsx

import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/quiz.service';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await getLeaderboard();
        setLeaderboard(data);
      } catch (err) {
        setError('Gagal memuat papan peringkat. Coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Memuat Papan Peringkat...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">🏆 Papan Peringkat 🏆</h1>
      <p className="text-center text-gray-600 mb-8">10 Pengguna dengan Skor Tertinggi</p>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {leaderboard.map((user, index) => (
            <li key={index} className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-lg font-bold text-gray-500 w-10">{index + 1}.</span>
                <span className="text-md font-medium text-gray-900">{user.name}</span>
              </div>
              <span className="text-lg font-bold text-indigo-600">{user.score.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeaderboardPage;