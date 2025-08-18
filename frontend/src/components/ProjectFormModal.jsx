// frontend/src/components/ProjectFormModal.jsx

import React, { useState } from 'react';

const ProjectFormModal = ({ isOpen, onClose, onSave }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Teknologi');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ projectName, description, category });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Ajukan Ide Proyek Baru</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Proyek</label>
              <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Deskripsi Singkat</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="4" required></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Kategori</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option>Teknologi</option>
                <option>Kuliner</option>
                <option>Jasa</option>
                <option>Kreatif</option>
                <option>Sosial</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Batal</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Simpan & Mulai</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormModal;