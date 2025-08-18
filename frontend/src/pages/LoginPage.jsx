// frontend/src/pages/LoginPage.jsx

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State untuk loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Mulai loading
    console.log('Tombol Masuk diklik, memulai proses login...');

    try {
      await login(email, password);
    } catch (err) {
        console.error('Error ditangkap di LoginPage:', err.message);
        setError(err.message);
    } finally {
        console.log('Proses login selesai (blok finally).');
      setLoading(false); // Hentikan loading, baik berhasil maupun gagal
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Masuk ke Akun Anda
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Alamat Email</label>
            <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center p-2 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading} // Nonaktifkan tombol saat loading
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Atau lanjutkan dengan</span></div></div>
          <div className="mt-6 flex justify-center">
             <GoogleLogin
                onSuccess={credentialResponse => { googleLogin(credentialResponse.credential); }}
                onError={() => { console.log('Login Gagal'); }}
              />
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Belum punya akun?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Daftar di sini
          </Link>
        </p>

        {/* --- BAGIAN BARU DI SINI --- */}
        <div className="mt-6 border-t pt-4 text-center text-sm">
          <p className="text-gray-500">Atau jelajahi fitur publik kami:</p>
          <div className="mt-2 space-x-4">
            <Link to="/leaderboard" className="font-medium text-indigo-600 hover:text-indigo-500">Papan Peringkat</Link>
            <Link to="/projects/gallery" className="font-medium text-indigo-600 hover:text-indigo-500">Galeri Proyek</Link>
          </div>
        </div>
        {/* --------------------------- */}
      </div>
      <div className="mt-8 border-t pt-6">
            <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
                <h3 className="font-bold text-center mb-3">Informasi untuk Reviewer</h3>
                <p className="mb-2">Silakan gunakan akun demo di bawah ini untuk mencoba semua fitur:</p>
                <div className="space-y-1 text-xs bg-gray-200 p-2 rounded">
                    <p><strong>Learner:</strong> <span className="font-mono">learner.demo@email.com</span></p>
                    <p><strong>Trainer:</strong> <span className="font-mono">trainer.demo@email.com</span></p>
                    <p><strong>Password:</strong> <span className="font-mono">password123</span></p>
                </div>
                <p className="mt-3 text-center">
                    Untuk panduan lengkap, silakan lihat{' '}
                    <a href="https://drive.google.com/file/d/1pWzwV2NkpoQNHj5FMux4nKYlkviYsLn-/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Dokumentasi Pengguna
                    </a>.
                </p>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;