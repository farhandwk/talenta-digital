// frontend/src/pages/trainer/ConsultantManagementPage.jsx

import React, { useState, useEffect } from 'react';
import { getAllConsultants, createConsultant, updateConsultant, deleteConsultant } from '../../services/career.service';
import ConsultantFormModal from '../../components/trainer/ConsultantFormModal';

const ConsultantManagementPage = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConsultant, setEditingConsultant] = useState(null);

  const fetchConsultants = async () => {
    try {
      setLoading(true);
      const data = await getAllConsultants();
      setConsultants(data);
    } catch (err) {
      setError('Gagal memuat daftar konsultan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultants();
  }, []);

  const handleOpenModal = (consultant = null) => {
    setEditingConsultant(consultant);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingConsultant(null);
  };

  const handleSaveConsultant = async (consultantData) => {
    try {
      if (editingConsultant) {
        await updateConsultant(editingConsultant._id, consultantData);
      } else {
        await createConsultant(consultantData);
      }
      handleCloseModal();
      fetchConsultants();
    } catch (err) {
      alert('Gagal menyimpan data konsultan.');
    }
  };

  const handleDeleteConsultant = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus konsultan ini?')) {
      try {
        await deleteConsultant(id);
        fetchConsultants();
      } catch (err) {
        alert('Gagal menghapus konsultan.');
      }
    }
  };

  if (loading) return <div className="p-8 text-center">Memuat data...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <>
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manajemen Konsultan Karier</h1>
          <button onClick={() => handleOpenModal()} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
            + Tambah Konsultan
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg">
          {consultants.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {consultants.map((consultant) => (
                <li key={consultant._id} className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={consultant.photoUrl} alt={consultant.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                    <div>
                      <p className="font-semibold">{consultant.name}</p>
                      <p className="text-sm text-gray-500">{consultant.specialization.join(', ')}</p>
                    </div>
                  </div>
                  <div className="space-x-4">
                    <button onClick={() => handleOpenModal(consultant)} className="text-blue-600 hover:text-blue-800 font-semibold">Edit</button>
                    <button onClick={() => handleDeleteConsultant(consultant._id)} className="text-red-600 hover:text-red-800 font-semibold">Hapus</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-gray-500">Belum ada data konsultan.</p>
          )}
        </div>
      </div>

      <ConsultantFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveConsultant}
        initialData={editingConsultant}
      />
    </>
  );
};

export default ConsultantManagementPage;