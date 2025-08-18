// frontend/src/services/quiz.service.js

import axios from 'axios';

// Base URL untuk API kuis kita
const API_URL = '/api/quiz';

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

// --- API untuk Learner ---

// Mengambil semua paket tes yang tersedia (dengan pagination)
export const getAllTests = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(`${API_URL}/tests?page=${page}&limit=${limit}`);
  return response.data;
};

// Mengambil detail satu tes untuk memulai kuis
export const getTestForTaking = async (testId) => {
  const response = await axiosInstance.get(`${API_URL}/tests/${testId}`);
  return response.data;
};

// Mengirimkan jawaban dari learner
export const submitTest = async (testId, answers) => {
  const response = await axiosInstance.post(`${API_URL}/tests/${testId}/submit`, { answers });
  return response.data;
};

// Mengambil riwayat hasil tes dari learner yang login
export const getMyResults = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(`${API_URL}/results/my-results?page=${page}&limit=${limit}`);
  return response.data;
};

// --- FUNGSI BARU DI SINI ---
// Mengambil satu hasil tes spesifik berdasarkan ID-nya
export const getQuizResultById = async (resultId) => {
  const response = await axiosInstance.get(`${API_URL}/results/${resultId}`);
  return response.data;
};
// ----------------------------


// --- API untuk Trainer ---

export const getAllQuestionsByTrainer = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(`${API_URL}/questions?page=${page}&limit=${limit}`);
  return response.data;
};

export const createQuestion = async (questionData) => {
  const response = await axiosInstance.post(`${API_URL}/questions`, questionData);
  return response.data;
};

// --- FUNGSI BARU DI SINI ---
export const updateQuestion = async (id, questionData) => {
  const response = await axiosInstance.put(`${API_URL}/questions/${id}`, questionData);
  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/questions/${id}`);
  return response.data;
};

// --- FUNGSI BARU UNTUK MANAJEMEN TES OLEH TRAINER ---
// Mengambil semua tes yang dibuat oleh trainer yang sedang login
export const getAllTestsByTrainer = async () => {
  const response = await axiosInstance.get(`${API_URL}/tests/my-tests`);
  return response.data;
};

// Membuat paket tes baru
export const createTest = async (testData) => {
  const response = await axiosInstance.post(`${API_URL}/tests`, testData);
  return response.data;
};

// Memperbarui paket tes
export const updateTest = async (id, testData) => {
  const response = await axiosInstance.put(`${API_URL}/tests/${id}`, testData);
  return response.data;
};

// Menghapus paket tes
export const deleteTest = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/tests/${id}`);
  return response.data;
};
// ---------------------------------------------------

// --- API PUBLIK BARU ---
// Mengambil data leaderboard
export const getLeaderboard = async () => {
  // Kita gunakan axios biasa karena ini adalah endpoint publik
  const response = await axios.get(`${API_URL}/leaderboard`);
  return response.data;
};
// -----------------------