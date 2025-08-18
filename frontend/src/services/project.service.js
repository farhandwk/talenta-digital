// frontend/src/services/project.service.js

import axios from 'axios';

const API_URL = '/api/projects';

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

// Membuat/mengajukan proyek baru
export const createProject = async (projectData) => {
  const response = await axiosInstance.post(API_URL, projectData);
  return response.data;
};

// Mendapatkan semua proyek milik learner yang login
export const getMyProjects = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

// Memperbarui proyek (termasuk canvas)
export const updateProject = async (projectId, projectData) => {
  const response = await axiosInstance.put(`${API_URL}/${projectId}`, projectData);
  return response.data;
};

// Meminta mentorship
export const requestMentorship = async (projectId) => {
  const response = await axiosInstance.post(`${API_URL}/${projectId}/request-mentorship`);
  return response.data;
};


// --- API untuk Learner & Trainer ---

// Mendapatkan detail satu proyek
export const getProjectById = async (projectId) => {
  const response = await axiosInstance.get(`${API_URL}/${projectId}`);
  return response.data;
};

// Menambahkan feedback/komentar
export const addFeedback = async (projectId, text) => {
  const response = await axiosInstance.post(`${API_URL}/${projectId}/feedback`, { text });
  return response.data;
};


// --- API untuk Trainer ---

// Melihat antrian proyek yang menunggu mentor
export const getMentorshipQueue = async () => {
  const response = await axiosInstance.get(`${API_URL}/mentorship-queue`);
  return response.data;
};

// Menerima sebuah proyek untuk dibimbing
export const acceptMentorship = async (projectId) => {
  const response = await axiosInstance.post(`${API_URL}/${projectId}/accept-mentorship`);
  return response.data;
};

// --- FUNGSI BARU DI SINI ---
export const getMyMentoredProjects = async () => {
  const response = await axiosInstance.get(`${API_URL}/my-mentored`);
  return response.data;
};

export const completeProject = async (projectId, isPublic) => {
  const response = await axiosInstance.post(`${API_URL}/${projectId}/complete`, { isPublic });
  return response.data;
};

export const getPublicProjects = async () => {
  // Kita gunakan axios biasa karena ini adalah endpoint publik
  const response = await axios.get(`${API_URL}/gallery`);
  return response.data;
};