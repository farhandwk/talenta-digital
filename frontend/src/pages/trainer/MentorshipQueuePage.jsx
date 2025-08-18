// frontend/src/pages/trainer/MentorshipQueuePage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMentorshipQueue } from '../../services/project.service';

const MentorshipQueuePage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        setLoading(true);
        const data = await getMentorshipQueue();
        setProjects(data);
      } catch (err) {
        setError('Gagal memuat antrian mentorship.');
      } finally {
        setLoading(false);
      }
    };

    fetchQueue();
  }, []);

  if (loading) return <div className="p-8 text-center">Memuat antrian...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Antrian Mentorship</h1>
      <p className="text-gray-600 mb-8">Berikut adalah daftar proyek yang sedang mencari bimbingan. Pilih proyek untuk dilihat detailnya dan mulai membimbing.</p>
      
      {projects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Antrian Kosong!</h2>
          <p className="text-gray-600 mt-2">Saat ini tidak ada proyek yang membutuhkan mentor. Terima kasih!</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg">
          <ul className="divide-y divide-gray-200">
            {projects.map((project) => (
              <li key={project._id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">{project.projectName}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Diajukan oleh: <span className="font-medium">{project.submittedBy.name}</span>
                  </p>
                </div>
                <Link to={`/projects/${project._id}`} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
                  Lihat Detail & Terima
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MentorshipQueuePage;