// frontend/src/pages/trainer/CourseManagementPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCoursesByTrainer, createCourse, updateCourse, deleteCourse } from '../../services/course.service';
import CourseFormModal from '../../components/trainer/CourseFormModal';

const CourseManagementPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // State untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getCoursesByTrainer();
      setCourses(data);
    } catch (err) {
      setError('Gagal memuat daftar kursus Anda.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOpenModal = (course = null) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  const handleSaveCourse = async (courseData) => {
    try {
      if (editingCourse) {
        await updateCourse(editingCourse._id, courseData);
      } else {
        await createCourse(courseData);
      }
      handleCloseModal();
      fetchCourses(); // Muat ulang daftar kursus
    } catch (err) {
      alert('Gagal menyimpan kursus.');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kursus ini beserta semua modulnya?')) {
      try {
        await deleteCourse(id);
        fetchCourses();
      } catch (err) {
        alert('Gagal menghapus kursus.');
      }
    }
  };

  // (Fungsi ini akan kita buat di langkah selanjutnya)
  const handleManageModules = (courseId) => {
    navigate(`/trainer/courses/${courseId}/modules`);
    alert('Fitur Kelola Modul akan kita buat selanjutnya!');
  };

  if (loading) return <div className="p-8 text-center">Memuat kursus Anda...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <>
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manajemen Kursus</h1>
          <button onClick={() => handleOpenModal()} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
            + Buat Kursus Baru
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg">
          {courses.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {courses.map((course) => (
                <li key={course._id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{course.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{course.modules.length} Modul</p>
                  </div>
                  <div className="space-x-4">
                    <button onClick={() => handleManageModules(course._id)} className="text-gray-600 hover:text-gray-900 font-semibold">Kelola Modul</button>
                    <button onClick={() => handleOpenModal(course)} className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                    <button onClick={() => handleDeleteCourse(course._id)} className="text-red-600 hover:text-red-800 font-semibold">Hapus</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-gray-500">Anda belum membuat kursus apapun.</p>
          )}
        </div>
      </div>

      <CourseFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCourse}
        initialData={editingCourse}
      />
    </>
  );
};

export default CourseManagementPage;