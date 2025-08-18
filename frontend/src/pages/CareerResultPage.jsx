// frontend/src/pages/CareerResultPage.jsx

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { results } from '../data/riasecTest';

const CareerResultPage = () => {
  const location = useLocation();
  const scores = location.state?.scores;

  if (!scores) {
    return (
      <div className="text-center p-8">
        <p>Hasil tidak ditemukan. Silakan ikuti tes terlebih dahulu.</p>
        <Link to="/career/test" className="text-indigo-600">Kembali ke Tes</Link>
      </div>
    );
  }

  // Cari tipe dengan skor tertinggi
  const topType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  const resultData = results[topType];

  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-2">Hasil Tes Minat Anda</h1>
        <p className="text-lg text-gray-600 mb-6">Tipe kepribadian karier dominan Anda adalah:</p>
        
        <div className="bg-indigo-100 p-6 rounded-lg mb-6">
          <h2 className="text-4xl font-bold text-indigo-700">{resultData.title}</h2>
          <p className="mt-4 text-gray-700">{resultData.description}</p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Rekomendasi Karier</h3>
          <ul className="flex flex-wrap justify-center gap-2">
            {resultData.careers.map((career, index) => (
              <li key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                {career}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-8">
            <Link to="/career/consultants" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                Lihat Konsultan yang Sesuai &rarr;
            </Link>
        </div>
      </div>
    </div>
  );
};

export default CareerResultPage;