// frontend/src/pages/RegisterPage.jsx

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const RegisterPage = () => {
  // State untuk setiap input form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  
  // State untuk UI
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Ambil fungsi register dari Context
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validasi di sisi frontend
    if (!name || !email || !password) {
      setError('Nama, Email, dan Password harus diisi');
      setLoading(false);
      return;
    }

    try {
      // Panggil fungsi register dari context
      await register(name, email, password, invitationCode);
      // Jika berhasil, AuthContext akan mengarahkan ke halaman utama
    } catch (err) {
      // Tangkap dan tampilkan error dari backend
      setError(err.message);
    } finally {
      // Selalu hentikan loading setelah selesai
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Buat Akun Baru
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Alamat Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input id="password" type="password" required minLength="6" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="invitationCode" className="text-sm font-medium text-gray-700">Kode Undangan Trainer (Opsional)</label>
            <input id="invitationCode" type="text" value={invitationCode} onChange={(e) => setInvitationCode(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          
          {error && (
            <div className="text-red-500 text-sm text-center p-2 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          <div>
            <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
              {loading ? 'Memproses...' : 'Daftar'}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Sudah punya akun?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
