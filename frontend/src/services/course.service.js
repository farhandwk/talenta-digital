// frontend/src/services/course.service.js

import axios from 'axios';

// Base URL untuk API kursus kita
const API_URL = '/api/courses';

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

// Mengambil semua kursus (katalog) dengan pagination
export const getAllCourses = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(`${API_URL}?page=${page}&limit=${limit}`);
  return response.data;
};

// Mengambil detail satu kursus
export const getCourseById = async (courseId) => {
  const response = await axiosInstance.get(`${API_URL}/${courseId}`);
  return response.data;
};

// --- API untuk Learner ---

// Mendaftar ke sebuah kursus
export const enrollInCourse = async (courseId) => {
  const response = await axiosInstance.post(`${API_URL}/${courseId}/enroll`);
  return response.data;
};

// Mendapatkan status pendaftaran untuk satu kursus
export const getMyEnrollment = async (courseId) => {
  const response = await axiosInstance.get(`${API_URL}/${courseId}/enrollment`);
  return response.data;
};

// Menandai modul sebagai selesai
export const markModuleAsComplete = async (courseId, moduleId) => {
  const response = await axiosInstance.post(`${API_URL}/${courseId}/modules/${moduleId}/complete`);
  return response.data;
};

// Mengunduh sertifikat
export const downloadCertificate = async (courseId) => {
  const response = await axiosInstance.get(`${API_URL}/${courseId}/certificate`, {
    responseType: 'blob', // Penting: memberitahu axios untuk menangani respons sebagai file
  });
  return response.data;
};

// --- API untuk Trainer ---
export const getCoursesByTrainer = async () => {
  const response = await axiosInstance.get(`${API_URL}/my-courses`)
  return response.data
}

export const createCourse = async (courseData) => {
  const response = await axiosInstance.post(API_URL, courseData)
  return response.data
}

export const updateCourse = async (id, courseData) => {
  const response = await axiosInstance.put(`${API_URL}/${id}`, courseData)
  return response.data
}

export const deleteCourse = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`)
  return response.data
}

export const addModuleToCourse = async (courseId, moduleData) => {
  const response = await axiosInstance.post(`${API_URL}/${courseId}/modules`, moduleData);
  return response.data;
};

export const updateModuleInCourse = async (courseId, moduleId, moduleData) => {
  const response = await axiosInstance.put(`${API_URL}/${courseId}/modules/${moduleId}`, moduleData);
  return response.data;
};

export const deleteModuleFromCourse = async (courseId, moduleId) => {
  const response = await axiosInstance.delete(`${API_URL}/${courseId}/modules/${moduleId}`);
  return response.data;
};

// (Nanti kita akan tambahkan fungsi untuk membuat, mengedit, dan menghapus kursus/modul di sini)