// frontend/src/pages/ConsultantListPage.jsx

import React, { useState, useEffect } from 'react';
import { getAllConsultants } from '../services/career.service';

const ConsultantListPage = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        setLoading(true);
        const data = await getAllConsultants();
        setConsultants(data);
      } catch (err) {
        setError('Gagal memuat daftar konsultan. Coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchConsultants();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Memuat daftar konsultan...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Konsultan Karier</h1>
      <p className="text-gray-600 mb-8">Hubungi para ahli kami untuk mendapatkan panduan karier yang lebih personal.</p>
      
      {consultants.length === 0 ? (
        <p>Belum ada konsultan yang tersedia saat ini.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {consultants.map((consultant) => (
            <div key={consultant._id} className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col">
              <img 
                src={consultant.photoUrl} 
                alt={consultant.name} 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h2 className="text-xl font-semibold">{consultant.name}</h2>
              <div className="my-2">
                {consultant.specialization.map((spec, index) => (
                  <span key={index} className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 flex-grow">{consultant.description}</p>
              <a 
                href={`mailto:${consultant.contact}`} 
                className="mt-4 inline-block w-full px-4 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900"
              >
                Hubungi via Email
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConsultantListPage;