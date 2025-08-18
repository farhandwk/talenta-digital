// frontend/src/services/career.service.js

import axios from 'axios';

const API_URL = '/api/career';

// Fungsi helper untuk mendapatkan token dari localStorage
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.token : null;
};

// Membuat instance axios dengan header Authorization default
const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- API untuk Semua User ---

// Mengambil semua data konsultan
export const getAllConsultants = async () => {
  const response = await axiosInstance.get(`${API_URL}/consultants`);
  return response.data;
};

// --- API untuk Trainer ---

// Membuat data konsultan baru
export const createConsultant = async (consultantData) => {
  const response = await axiosInstance.post(`${API_URL}/consultants`, consultantData);
  return response.data;
};

// Memperbarui data konsultan
export const updateConsultant = async (id, consultantData) => {
  const response = await axiosInstance.put(`${API_URL}/consultants/${id}`, consultantData);
  return response.data;
};

// Menghapus data konsultan
export const deleteConsultant = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/consultants/${id}`);
  return response.data;
};