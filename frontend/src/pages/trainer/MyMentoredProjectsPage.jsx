// frontend/src/pages/trainer/MyMentoredProjectsPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyMentoredProjects } from '../../services/project.service';

const MyMentoredProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getMyMentoredProjects();
        setProjects(data);
      } catch (err) {
        setError('Gagal memuat proyek bimbingan Anda.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="p-8 text-center">Memuat proyek...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Proyek Bimbingan Saya</h1>
      {projects.length === 0 ? (
        <p>Anda sedang tidak membimbing proyek apapun.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg">
          <ul className="divide-y divide-gray-200">
            {projects.map((project) => (
              <li key={project._id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">{project.projectName}</p>
                  <p className="text-sm text-gray-500 mt-1">Mentee: {project.submittedBy.name}</p>
                </div>
                <Link to={`/projects/${project._id}`} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                  Masuk Ruang Kerja
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyMentoredProjectsPage;