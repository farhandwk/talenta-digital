// frontend/src/contexts/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 1. Buat Context
const AuthContext = createContext();

// 2. Buat Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Pastikan URL API adalah path relatif yang akan ditangani oleh proxy Vite
  const API_URL = '/api/auth';

  // Cek localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoading(false);
  }, []);

  // Fungsi untuk login dengan email & password
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/'); // Arahkan ke halaman utama setelah login
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Gagal terhubung ke server.';
      throw new Error(errorMessage);
    }
  };
  
  // Fungsi untuk login dengan Google
  const googleLogin = async (credential) => {
    try {
      const response = await axios.post(`${API_URL}/google`, { credential });
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/'); // Arahkan ke halaman utama setelah login
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login dengan Google gagal.';
      // Kita gunakan alert di sini untuk sementara agar mudah dilihat
      alert(errorMessage);
    }
  };

  // Fungsi untuk registrasi
  const register = async (name, email, password, invitationCode) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password, 
        invitationCode,
      })

      const userData = response.data
      localStorage.setItem('user', JSON.stringify(userData))
      navigate('/')
    }
    catch (error) {
      const errorMessage = error.response?.data?.message || "Gagal Melakukan registrasi"
      throw new Error(errorMessage)
    }
  }

  // Fungsi untuk logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login'); // Arahkan ke halaman login setelah logout
  };

  // 3. Sediakan semua nilai ke komponen anak
  return (
    <AuthContext.Provider value={{ user, login, googleLogin, register, logout, loading }}>
      {/* Jangan render anak-anak sampai loading selesai */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 4. Ekspor Context untuk digunakan oleh komponen lain
export default AuthContext;
