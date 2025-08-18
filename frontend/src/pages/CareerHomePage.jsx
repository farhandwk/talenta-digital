// frontend/src/pages/CareerHomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const CareerHomePage = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">🧭 Kompas Karier</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Temukan potensi dirimu dan jelajahi jalur karier yang paling sesuai dengan kepribadian dan minatmu. Mulai dengan tes minat singkat atau lihat daftar konsultan karier kami.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Kartu untuk Tes Minat */}
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
          <h2 className="text-2xl font-semibold mb-4">Tes Minat & Bakat</h2>
          <p className="text-gray-600 mb-6">
            Jawab beberapa pertanyaan sederhana untuk mendapatkan rekomendasi jurusan dan karier yang cocok untukmu.
          </p>
          <Link
            to="/career/test" // Kita akan buat halaman ini selanjutnya
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
          >
            Mulai Tes Sekarang
          </Link>
        </div>

        {/* Kartu untuk Daftar Konsultan */}
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
          <h2 className="text-2xl font-semibold mb-4">Konsultan Karier</h2>
          <p className="text-gray-600 mb-6">
            Terhubung dengan para ahli yang siap membantumu merencanakan langkah-langkah karier selanjutnya.
          </p>
          <Link
            to="/career/consultants" // Kita akan buat halaman ini selanjutnya
            className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
          >
            Lihat Daftar Konsultan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CareerHomePage;