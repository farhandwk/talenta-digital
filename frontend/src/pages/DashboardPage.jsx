import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const LearnerDashboard = () => (
  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* ... Kartu Zona Asah Otak ... */}
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold text-lg">Zona Asah Otak</h3>
      <Link to="/quiz" className="text-[#0a5c36] hover:text-black block mt-2">Lihat & Kerjakan Tes &rarr;</Link>
      <Link to="/quiz/my-results" className="text-[#0a5c36] hover:text-black block mt-1">Lihat Riwayat Hasil Tes &rarr;</Link>
    </div>
    
    {/* ... Kartu Skill Lab ... */}
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold text-lg">Skill Lab</h3>
      <Link to="/courses" className="text-[#0a5c36] hover:text-black block mt-2">Jelajahi Katalog Kursus &rarr;</Link>
    </div>

    {/* --- KARTU BARU DI SINI --- */}
    <div className="p-4 border rounded-lg md:col-span-2">
      <h3 className="font-semibold text-lg">Kompas Karier</h3>
      <Link to="/career" className="text-[#0a5c36] hover:text-black block mt-2">Temukan Arah Kariermu &rarr;</Link>
    </div>
    {/* ------------------------- */}

    <div className="p-4 border rounded-lg md:col-span-2">
      <h3 className="font-semibold text-lg">Inkubator Wirausaha</h3>
      <Link to="/projects" className="text-[#0a5c36] hover:text-black block mt-2">Kembangkan Idemu &rarr;</Link>
    </div>
  </div>
);

const TrainerDashboard = () => (
  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* ... Kartu Zona Asah Otak ... */}
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold text-lg">Zona Asah Otak</h3>
      <Link to="/trainer/questions" className="text-[#0a5c36] hover:text-black block mt-2">Manajemen Bank Soal &rarr;</Link>
      <Link to="/trainer/tests" className="text-[#0a5c36] hover:text-black block mt-1">Manajemen Paket Tes &rarr;</Link>
    </div>
    {/* ... Kartu Skill Lab ... */}
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold text-lg">Skill Lab</h3>
      <Link to="/courses" className="text-[#0a5c36] hover:text-black block mt-2">Jelajahi Katalog Kursus &rarr;</Link>
      <Link to="/trainer/courses" className="text-[#0a5c36] hover:text-black block mt-1">Manajemen Kursus Saya &rarr;</Link>
    </div>
    {/* --- KARTU BARU DI SINI --- */}
    <div className="p-4 border rounded-lg md:col-span-2">
      <h3 className="font-semibold text-lg">Kompas Karier</h3>
      <Link to="/trainer/consultants" className="text-[#0a5c36] hover:text-black block mt-2">Manajemen Konsultan Karier &rarr;</Link>
    </div>
     {/* ------------------------- */}
     <div className="p-4 border rounded-lg md:col-span-2">
      <h3 className="font-semibold text-lg">Inkubator Wirausaha</h3>
      <Link to="/trainer/projects/queue" className="text-[#0a5c36] hover:text-black block mt-2">Lihat Antrian Mentorship &rarr;</Link>
      <Link to="/trainer/projects/my-mentored" className="text-[#0a5c36] hover:text-black block mt-1">Proyek Bimbingan Saya &rarr;</Link>
    </div>
  </div>
)

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);

  // Tampilkan pesan loading jika data user belum siap
  if (!user) {
    return <div>Loading data pengguna...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Selamat Datang, {user.name}!</h1>
      <p className="mt-2 text-gray-600">Anda login sebagai **{user.role}**.</p>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Menu Navigasi</h2>
        {user.role === 'trainer' ? <TrainerDashboard /> : <LearnerDashboard />}
      </div>
      
      <button
        onClick={logout}
        className="mt-6 inline-block px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;