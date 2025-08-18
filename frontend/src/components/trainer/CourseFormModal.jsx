// frontend/src/components/trainer/CourseFormModal.jsx

import React, { useState, useEffect } from 'react';

const CourseFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setThumbnail(initialData.thumbnail || '');
    } else {
      setTitle('');
      setDescription('');
      setThumbnail('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, thumbnail });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">{initialData ? 'Edit Kursus' : 'Buat Kursus Baru'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Judul Kursus</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="4" required></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">URL Thumbnail (Opsional)</label>
              <input type="url" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Batal</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseFormModal;