// frontend/src/pages/trainer/ModuleManagementPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseById, addModuleToCourse, updateModuleInCourse, deleteModuleFromCourse } from '../../services/course.service';
import ModuleFormModal from '../../components/trainer/ModuleFormModal';

const ModuleManagementPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);

  const fetchCourse = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCourseById(courseId);
      setCourse(data);
    } catch (err) {
      setError('Gagal memuat detail kursus.');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const handleOpenModal = (module = null) => {
    setEditingModule(module);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingModule(null);
  };

  const handleSaveModule = async (moduleData) => {
    try {
      if (editingModule) {
        await updateModuleInCourse(courseId, editingModule._id, moduleData);
      } else {
        await addModuleToCourse(courseId, moduleData);
      }
      handleCloseModal();
      fetchCourse();
    } catch (err) {
      alert('Gagal menyimpan modul.');
    }
  };
  
  const handleDeleteModule = async (moduleId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus modul ini?')) {
      try {
        await deleteModuleFromCourse(courseId, moduleId);
        fetchCourse();
      } catch (err) {
        alert('Gagal menghapus modul.');
      }
    }
  };

  if (loading) return <div className="p-8 text-center">Memuat modul...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <>
      <div className="container mx-auto p-8">
        <Link to="/trainer/courses" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">&larr; Kembali ke Manajemen Kursus</Link>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Kelola Modul: {course?.title}</h1>
          <button onClick={() => handleOpenModal()} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
            + Tambah Modul Baru
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg">
          {course?.modules.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {course.modules.map((module) => (
                <li key={module._id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{module.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{module.duration || 'Durasi tidak diatur'}</p>
                  </div>
                  <div className="space-x-4">
                    <button onClick={() => handleOpenModal(module)} className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                    <button onClick={() => handleDeleteModule(module._id)} className="text-red-600 hover:text-red-800 font-semibold">Hapus</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-gray-500">Kursus ini belum memiliki modul.</p>
          )}
        </div>
      </div>

      <ModuleFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveModule}
        initialData={editingModule}
      />
    </>
  );
};

export default ModuleManagementPage;