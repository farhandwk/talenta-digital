// frontend/src/components/trainer/ConsultantFormModal.jsx

import React, { useState, useEffect } from 'react';

const ConsultantFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setPhotoUrl(initialData.photoUrl || '');
      setSpecialization(initialData.specialization?.join(', ') || '');
      setContact(initialData.contact || '');
      setDescription(initialData.description || '');
    } else {
      setName('');
      setPhotoUrl('');
      setSpecialization('');
      setContact('');
      setDescription('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ubah string spesialisasi kembali menjadi array
    const specializationArray = specialization.split(',').map(s => s.trim());
    onSave({ name, photoUrl, specialization: specializationArray, contact, description });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">{initialData ? 'Edit Konsultan' : 'Tambah Konsultan Baru'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">URL Foto</label>
              <input type="url" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Spesialisasi (pisahkan dengan koma)</label>
              <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Kontak (Email/LinkedIn)</label>
              <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Deskripsi Singkat</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="3" required></textarea>
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

export default ConsultantFormModal;